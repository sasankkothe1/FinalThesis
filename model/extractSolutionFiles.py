import os
import zipfile
import shutil

from checkSolution import checkSolution

# open every solution file, reads the header and creates the problem instance name
# return the path specific problem instance for the specific solution submitted by the user

problemInstanceDirPath = "../../fileStore/extractedProblemInstances/rcpsp/"


# returns tuple (solutionFileName, instanceFile and solutionFile)
def getProblemInstance(solutionFilePath):

    if zipfile.is_zipfile(solutionFilePath):
        # paths [] is list that stores the instances paths of the files in the zip files
        paths = []

        # create a tempDir to extract all the zip files
        tempDirpath = os.getcwd() + "/temp"
        os.mkdir(tempDirpath)

        # unzip and extract all the files to the tempDir
        zipfile.ZipFile(solutionFilePath, 'r').extractall(tempDirpath)

        for dir in os.listdir(tempDirpath):
            if not dir.startswith("__MAC") and not ".DS" in dir:
                for file in os.listdir(tempDirpath+"/"+dir):
                    with open(tempDirpath+"/"+dir+"/"+file) as temp:
                        temp = list(temp)[:4]
                        temp = [_.replace(" ", "").split(":")[-1].rstrip("\n")
                                for _ in temp]
                        # instance set/job number like "j120"
                        inst_set = temp[0]
                        inst_type = temp[1]   # instance type
                        inst_param = temp[2]  # instance parameter
                        inst_num = temp[3]    # instance number
                        # the final instance file name extracted from the header of the solution file
                        inst_file = inst_set + inst_param + "_" + inst_num + "." + inst_type
                        paths.append((file, inst_set, inst_param, inst_num,
                                      problemInstanceDirPath+inst_file, tempDirpath+"/"+dir+"/"+file))
        return paths

    else:
        with open(solutionFilePath, 'r') as file:
            fileName = solutionFilePath.split("/")[-1]
            file = list(file)[:4]
            file = [_.replace(" ", "").split(":")[-1].rstrip("\n")
                    for _ in file]
            inst_set = file[0]    # instance set/job number like "j120"
            inst_type = file[1]   # instance type
            inst_param = file[2]  # instance parameter
            inst_num = file[3]    # instance number
            # the final instance file name extracted from the header of the solution file
            inst_file = inst_set + inst_param + "_" + inst_num + "." + inst_type
            path = (fileName, inst_set, inst_param, inst_num, problemInstanceDirPath +
                    inst_file, solutionFilePath)
        return path


# extract all the solutions from the path where the solutions of the user are stored.
def extractSolutionFiles(solutionFilesPath, typeOfInstance):
    solutionTupleList = []
    extractedProblemInstancesPaths = []
    for solution in os.listdir(solutionFilesPath):
        solutionFilePath = solutionFilesPath + solution
        problemInstancePath = getProblemInstance(solutionFilePath)
        if isinstance(problemInstancePath, list):
            extractedProblemInstancesPaths += problemInstancePath
        else:
            extractedProblemInstancesPaths.append(problemInstancePath)
    for el in extractedProblemInstancesPaths:
        # solutionFileName el[0]
        fileName = el[0]
        # number of jobs (inst_set) el[1]
        inst_set = el[1]
        # instance parameter (inst_param) el[2]
        inst_param = el[2]
        # instance number (inst_num) el[3]
        inst_num = el[3]
        # instance file is present at the 1st position of the tuple
        instanceFile = el[4]
        # solution file is present at the 2nd position of the tuple
        solutionFile = el[5]
        solutionStatus = checkSolution(
            instanceFile, solutionFile, typeOfInstance)

        # now add the solution status tuple to the respective el:tuple
        solutionTupleList.append(
            (fileName, inst_set, inst_param, inst_num, solutionFilesPath) + solutionStatus)

    # remove the temporary directory before returning
    if os.path.exists(os.getcwd() + "/temp"):
        shutil.rmtree(os.getcwd() + "/temp")

    # return the final solutionTupleList => (fileName, instanceFile, SolutionFile, makespan, isError, error)
    return solutionTupleList
