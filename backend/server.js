const express = require('express');
const app = express();
const cors = require('cors');
const expressFileUpload = require('express-fileupload');
const fs = require('fs');

// spawn is used to run python files -- the python file is called at the end of the file
var spawn = require('child_process').spawn;

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
    const dirExists = true;
    var pathForFileSaving = `../../fileStore/UploadedSolutions/${uploaderName.replace(" ", "_")}/${uploadDateTime}/`;
    console.log(pathForFileSaving);
    console.log(fs.existsSync(pathForFileSaving));
    if (!fs.existsSync(pathForFileSaving)) fs.mkdirSync(pathForFileSaving, { recursive: true }, err => { console.log(err) });
    const fileArray = req.files;
    var successfullyUploaded = true;
    var uploadingError = null;
    for (var i = 0; i < (fileArray.files).length; i++) {
        var sampleFile = (fileArray.files)[i];
        sampleFile.mv(pathForFileSaving + sampleFile.name, err => {
            res.status(500).send(err);
        })
    }
    if (successfullyUploaded && !uploadingError) res.status(200).send("Uploaded Successfully");
    else res.status(500).send(uploadingError);
});

// mailService.sendTheMail("Sasank", "sasank.kothe@tum.de", "you passed the test", "congratulations");

let py = spawn('python', ['./logics/helloworld.py']);
let dataString = "";

py.stdout.on('data', data => {
    dataString = data.toString();
});

py.stdout.on('end', () => {
    // console.log(dataString);
})

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});