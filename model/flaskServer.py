import os
from pathlib import Path
from datetime import datetime
from flask import Flask, json, request, jsonify
from flask_cors import CORS
from flask.helpers import send_from_directory,  send_file
from flask_mail import Mail, Message

from pymongo import MongoClient
from openpyxl import Workbook
from bson.json_util import dumps

# for creating secret token for the user authentication
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager


from extractSolutionFiles import extractSolutionFiles

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app, resources={r"/*": {"origins": "*"}})

# mail configs
app.config['MAIL_SERVER'] = 'smtp-mail.outlook.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'pspliboperationsmanagement@outlook.com'
app.config['MAIL_PASSWORD'] = 'psplib123$'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_ASCII_ATTACHMENTS'] = True

# adding the secret key for the JWT token
app.config["JWT_SECRET_KEY"] = "secretsuperpsplibthesissasanktum"
jwt = JWTManager(app)

mail = Mail(app)

client = MongoClient(
    "mongodb+srv://testpsplib:testpsplib@cluster0.trtwg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client['psplibtest']

ProblemSetsLocation = "../../fileStore/problemSets"
uploadedFilesLocation = "../../fileStore/UploadedSolutions"
ubBestSolutionsLocation = "../../fileStore/bestSolutions/rcpsp/hrs"
lbBestSolutionsLocation = "../../fileStore/bestSolutions/rcpsp/lb"
rcpspOPTBestSolutionsLocation = "../../fileStore/bestSolutions/rcpsp/opt"


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/getSubmissions', methods=['GET'])
def getSubmissions():
    submissionCollection = db['submissions']
    result = submissionCollection.find()
    return dumps(list(result))


@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    if username == "psplib-admin" and password == "psplib-admin-password":
        return "/Admin", 200

    elif username != "psplib-secret-username" or password != "psplib-secret-password":
        return "wrong username and password", 404
    accessToken = create_access_token(identity=username)
    return jsonify(accessToken=accessToken)


@app.route('/getTheFileList', methods=['GET'])
def getTheFileList():
    problemType = request.args.get('problemType')
    mode = request.args.get('mode')
    pathToDirectory = ProblemSetsLocation + "/" + problemType + "/" + mode
    print(pathToDirectory)
    return jsonify(os.listdir(pathToDirectory))


@app.route('/downloadFile', methods=['GET'])
def downloadFile():
    problemType = request.args.get('problemType')
    mode = request.args.get('mode')
    fileName = request.args.get('fileName')
    pathToDirectory = ProblemSetsLocation + "/" + problemType + "/" + mode
    try:
        return send_from_directory(pathToDirectory, fileName, as_attachment=True, attachment_filename=fileName)
    except FileNotFoundError:
        print("fileNotFound")


@app.route('/upload', methods=['POST'])
def uploadFile():
    fileArray = request.files.getlist('files')
    name = request.form['name']
    uploadTime = str(datetime.now())
    typeOfInstance = request.form['typeOfInstance']

    deniedFileExtensions = ['mp4', 'mp3', 'py', 'java',
                            'class', 'php', 'png', 'jpg', 'jpeg', 'gif']

    pathToBeStoredAt = uploadedFilesLocation + "/" + name + "/" + uploadTime

    for file in fileArray:
        fileExtension = file.filename.split('.')[-1].lower()
        if fileExtension in deniedFileExtensions:
            emailID = request.form['email']
            msg = Message("Error in the files Uploaded",
                          sender="pspliboperationsmanagement@outlook.com", recipients=[emailID])
            msg.body = "You have uploaded files with wrong extensions. Please " + \
                file.filename+" before uploading"
            mail.send(msg)
            return "your files have unsupported format. Please upload only text, pdf, or zip files", 422
        else:
            Path(pathToBeStoredAt).mkdir(
                mode=0o777, parents=True, exist_ok=True)
            file.save(os.path.join(pathToBeStoredAt, file.filename))

    userData = {'name': request.form['name'], 'email': request.form['email'], 'titleOfPaper': request.form['titleOfPaper'],
                'contributors': request.form['contributors'], 'typeOfInstance': request.form['typeOfInstance']}

    processSolution(userData, pathToBeStoredAt + "/")
    return 'upload successful', 200


# ImmutableMultiDict([('name', 'Sasank Kothe'), ('email', 'sasankkothe@gmail.com'),
# ('titleOfPaper', ''), ('contributors', ''), ('typeOfInstance', 'rcpsp_sm')])

def processSolution(userData, solutionFilesPath):
    # extracting individual data from dictionary
    typeOfInstance = userData['typeOfInstance']

    print("typeOfInstance ", typeOfInstance)

    answer = extractSolutionFiles(solutionFilesPath, typeOfInstance)

    # store the submission into the MondoDB client collection = submissions
    storeSubmission(userData, answer)

    for el in answer:
        isSubmissionBest(userData, el)

    # to check if every solution is best or not and create report
    reportList = []

    for el in answer:
        reportList.append(isSubmissionBest(userData, el))

    # for report in reportList:
    #     print("------>", report)

    # create the report.xlsx
    reportCreated = createReport(reportList)

    # TODO: Remove this comment
    if reportCreated:
        sendEmail(userData)
        reportCreated = False
        reportList = []

    # # convert the answer to json and send the answer
    # return jsonify(answer)


# TODO: consider including the lower bound
def storeSubmission(userData, answer):

    # username = "psplib-test-user"
    # password = "psplib-test-password"

    # access_token = create_access_token(identity=username)

    name = userData['name']
    email = userData['email']
    titleOfPaper = userData['titleOfPaper']
    contributors = userData['contributors']
    typeOfInstance = userData['typeOfInstance']

    submissionCollection = db['submissions']

    # ('e._goncharov,_v._leonov_16-07-2015_00-05-14_j12011_10.sm', 'j120', '11',
    # '10', '../../fileStore/UploadedSolutions/Sasank_Kothe/15_4_2021/18_41_24/', 180, False, None)
    for el in answer:
        post = {
            "name": name,
            "email": email,
            "titleOfPaper": titleOfPaper,
            "contributors": contributors,
            "typeOfInstance": typeOfInstance,
            "submissionDate": datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
            "fileName": el[0],
            "jobs": el[1],
            "par": el[2],
            "inst": el[3],
            "ub": el[5],
            "lb": 1,
            "fileLocation": el[4],
            "isError": el[6],
            "error": el[7]
        }

        submissionCollection.insert_one(post)

# 'el' is a tuple of (0: instanceFileName, 1: jobNumber, 2: par number, 3: inst number, 4: locationOfTheFileStore, 5: ub, 6: isError, 7: error)


def isSubmissionBest(userData, el):

    # get the location where the file is originally stored in "originalFileLocation" variable
    fileName = el[0]
    originalLocationStoredDirectory = el[4]
    originalFileLocation = originalLocationStoredDirectory + fileName

    # store the originalFileobject in "originalFile" variable
    # print(originalFileLocation)
    originalFile = open(originalFileLocation)

    bestResultsCollection = db['bestresults']

    ubSwap = False
    lbSwap = False
    ubDeviationPercentage = 0
    lbDeviationPercentage = 0
    docUB = 0
    docLB = 0
    objectiveFunc = el[5]
    feasible = False

    instance = el[1]+el[2]+"_"+el[3]

    if el[6] == False:
        feasible = True

    query = {"jobs": el[1], "par": el[2], "inst": el[3]}

    foundResult = bestResultsCollection.find(
        query)   # a mongo cursor is returned

    # check if particular solution is present in the bestSolutions table. if not, insert
    if foundResult.count() == 0:
        if feasible:
            post = {
                "instanceType": userData['typeOfInstance'],
                "jobs": el[1],
                "par": el[2],
                "inst": el[3],
                "ub": el[5],
                "lb": 1,
                "AuthorUB": userData['name'],
                "AuthorLB": userData['name']
            }
            bestResultsCollection.insert_one(post)
        else:
            return ((instance, userData['typeOfInstance'], feasible, objectiveFunc, 0, 0, 0, 0, ubSwap, lbSwap))
    # if the solution is already present in the best solution
    else:
        for result in foundResult:
            docUB = result['ub']
            userUB = el[5]

            docLB = result['lb']
            userLB = 0

            if userUB < docUB:
                bestResultsCollection.update(
                    query, {"$set": {"ub": userUB, "AuthorUB": userData['name']}})
                ubSwap = True
                ubDeviationPercentage = ((userUB - docUB) / docUB) * 100

                # store the file in the best files directory --> UB
                # check if the file is already present and remove it
                if os.path.exists(ubBestSolutionsLocation + "/" + fileName):
                    os.remove(ubBestSolutionsLocation + "/" + fileName)

                # save the best UB file in the hrs folder of the best solution
                # create new file and copy the contents of the originalFile into the new file
                with open(ubBestSolutionsLocation + "/" + fileName, 'a') as newBestfile:
                    for line in originalFile:
                        newBestfile.write(line)
                    newBestfile.close()

            if userLB > docLB:
                bestResultsCollection.update(
                    query, {"$set": {"lb": userLB, "AuthorLB": userData['name']}})
                lbSwap = True
                lbDeviationPercentage = ((userLB - docLB) / docLB) * 100

                # store the file in the best files directory --> UB
                # check if the file is already present and remove it
                if os.path.exists(lbBestSolutionsLocation + "/" + fileName):
                    os.remove(lbBestSolutionsLocation + "/" + fileName)

                # save the best UB file in the hrs folder of the best solution
                # create new file and copy the contents of the originalFile into the new file
                with open(lbBestSolutionsLocation + "/" + fileName, 'a') as newBestfile:
                    for line in originalFile:
                        newBestfile.write(line)
                    newBestfile.close()

        return ((instance, userData['typeOfInstance'], feasible, objectiveFunc, docLB, docUB, lbDeviationPercentage, ubDeviationPercentage, ubSwap, lbSwap))


def createReport(reportList):

    # reportList: (instance, userData['typeOfInstance'], feasible, objectiveFunc, docLB, docUB, lbDeviationPercentage, ubDeviationPercentage, ubSwap, lbSwap)
    workbook = Workbook()
    sheet = workbook.active

    sheet.merge_cells('C1:D1')
    sheet.merge_cells('E1:F1')
    sheet.merge_cells('G1:I1')

    sheet['C1'] = "Submitted Solution"
    sheet['E1'] = "PSPLIB Solution"
    sheet['G1'] = "Results of Solution Check"

    row = 2
    col = 1
    columnHeaders = ['Instance', 'Problem Type', 'Feasible', 'Objective Function',
                     'CP-based LB', 'Best Known UB', 'Deviation from LB', 'Deviation from UB', 'Improved UB']

    for header in columnHeaders:
        sheet.cell(column=col, row=row, value=header)
        col += 1
    col = 1

    for el in reportList:
        row += 1
        for i in range(0, len(el)):
            if i == 3:
                print("from report ---> ", el[i])
            sheet.cell(column=col, row=row, value=str(el[i]))
            col += 1
        col = 1

    workbook.save(filename="report.xlsx")

    return True


def sendEmail(userData):
    # application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    msg = Message('Report from PSPLIB', sender="pspliboperationsmanagement@outlook.com",
                  recipients=[userData['email']])
    msg.body = "Please find the attachment as the status report of the submission"

    with app.open_resource("report.xlsx") as fp:
        msg.attach(
            "report.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fp.read())

    mail.send(msg)

    os.remove("report.xlsx")


if __name__ == "__main__":
    # debug, when set to true, automatically reloads the server on file change and saved
    app.run(debug=True)
