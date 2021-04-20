const express = require('express');
const app = express();
const cors = require('cors');

// location and the configurations of the fileStore
const { fileStore } = require('./fileStoreConfig.js');

// function to read the directory
const readDir = require('../backend/ReadDirectory/readDirectory.js');

const mailService = require('./mailService');

// backend port
const PORT = 4000;

// setting routers
const getTheFileList = express.Router();
const downloadFile = express.Router();

app.use("/getTheFileList", getTheFileList);
app.use("/downloadFile", downloadFile)

app.use(cors());
app.use(express.json());


getTheFileList.route('/rcpsp').get((req, res) => {
    res.status(200).json(readDir.readDir(`${fileStore.LOCATION}/rcpsp`));
});

// sending the file to the frontend for user to download it
downloadFile.route('/').get((req, res) => {
    let { fileName } = req.query;
    res.setHeader('Content-disposition', `'attachment; filename=${fileName}`);
    res.download(`${fileStore.LOCATION}/${fileName}`);
});

// mailService.sendTheMail("Sasank", "sasank.kothe@tum.de", "you passed the test", "congratulations");

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});