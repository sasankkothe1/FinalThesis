const express = require('express');
const app = express();
const cors = require('cors');
const expressFileUpload = require('express-fileupload');
const fs = require('fs');
const axios = require('axios')

// captcha keys of server
const { CaptchaKeys } = require('./CaptchaKeys');


// location and the configurations of the fileStore
const { fileStore } = require('./fileStoreConfig.js');

// function to read the directory
const readDir = require('../backend/ReadDirectory/readDirectory.js');

const mailService = require('./mailService');

// backend port
const PORT = 4000;
const date = new Date();


app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(expressFileUpload());

// setting routers
const getTheFileList = express.Router();
const downloadFile = express.Router();
const upload = express.Router();

app.use("/getTheFileList", getTheFileList);
app.use("/downloadFile", downloadFile);
app.use("/upload", upload);


getTheFileList.route('/rcpsp').get((req, res) => {
    res.status(200).json(readDir.readDir(`${fileStore.LOCATION}/rcpsp`));
});

// sending the file to the frontend for user to download it
downloadFile.route('/').get((req, res) => {
    let { fileName } = req.query;
    res.setHeader('Content-disposition', `'attachment; filename=${fileName}`);
    res.download(`${fileStore.LOCATION}/${fileName}`);
});

// upload function that saves the data sent by the user to the backend
upload.route('/').post((req, res) => {

    const uploadDateTime = `${date.getDate()}_${date.getMonth()}_${date.getFullYear()}/${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
    const uploaderName = req.body.name;
    const uploaderEmail = req.body.email;
    var pathForFileSaving = `../../fileStore/UploadedSolutions/${uploaderName.replace(" ", "_")}/${uploadDateTime}/`;
    if (!fs.existsSync(pathForFileSaving)) fs.mkdirSync(pathForFileSaving, { recursive: true }, err => { console.log(err) });
    const fileArray = req.files;
    let successfullyUploaded = true;
    var uploadingError = null;
    if ((fileArray.files).length === undefined) {
        var temp = fileArray.files;
        temp.mv(pathForFileSaving + temp.name, err => {
            if (!err) {
                successfullyUploaded = true;
                uploadingError = err
                res.status(200);
            } else {
                successfullyUploaded = false
                uploadingError = true
                res.status(500).send(err);
            }
        })
    } else {
        for (var i = 0; i < (fileArray.files).length; i++) {
            var tempFile = (fileArray.files)[i];
            console.log(tempFile)
            tempFile.mv(pathForFileSaving + tempFile.name, err => {
                if (err) res.status(500).send(err);
                else res.status(200)
            })
        }
    }
    if (fs.existsSync(pathForFileSaving)) console.log(evaluateSolution(pathForFileSaving, uploaderName, uploaderEmail));
    if (successfullyUploaded && !uploadingError) {
        mailService.sendTheMail(uploaderName, uploaderEmail, "upload successful", "Congratulations. We have recieved your files. You will further be notified with results and status");
        res.status(200).send("Uploaded Successfully");
    }
    else res.status(500).send(uploadingError);
});

const evaluateSolution = (pathForFileSaving, uploaderName, uploaderEmail) => {
    let isError, error

    axios.post("http://localhost:5000/", { pathForFileSaving }).then(res => {
        isError = res.data[0]
        error = res.data[1]
        if (isError) mailService.sendTheMail(uploaderName, uploaderEmail, "Status of the solution", "Following are are errors of the solution :\n" + error);
        else mailService.sendTheMail(uploaderName, uploaderEmail, "Status of your solution", "There are no errors in the solution. You will be updated if you solution is better solution or not from the existing solutions");
    })

}

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});