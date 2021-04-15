const fs = require("fs");

const readDir = dirPath => {
    return fs.readdirSync(dirPath);
}

module.exports = { readDir }