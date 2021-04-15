const express = require('express');
const app = express();
const cors = require('cors');

const readDir = require('../backend/ReadDirectory/readDirectory.js');
const mailService = require('./mailService');

const PORT = 4000;

const getTheFileList = express.Router();
const downloadFile = express.Router();

app.use("/getTheFileList", getTheFileList);
app.use("/downloadFile", downloadFile)

app.use(cors());
app.use(express.json());

getTheFileList.route('/rcpsp').get((req, res) => {
    res.status(200).json(readDir.readDir("../../fileStore/rcpsp"));
});

downloadFile.route('/').get((req, res) => {
    let { fileName } = req.query;
    res.setHeader('Content-disposition', `'attachment; filename=${fileName}`);
    res.download("../../fileStore/" + fileName);
});

// mailService.sendTheMail("Sasank", "sasank.kothe@tum.de", "you passed the test", "congratulations");

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});