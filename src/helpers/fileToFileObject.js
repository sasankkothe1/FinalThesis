export const createFileObject = fileListString => {
    const fileObject = {};
    const fileArray = [];
    fileListString = fileListString.split(",");
    fileListString.map((file) => {
        file = file.replace(/[\[\]"]+/g, "");
        file = file.replace(/ /g, "");
        fileArray.push(file);
        return 0
    });

    fileArray.map(file => {
        if (file !== ".DS_Store") {
            console.log(file)
            let n_jobs = file.split(".")[0].match(/\d+/)[0] + "";
            if (fileObject.hasOwnProperty(n_jobs)) {
                if (!fileObject[n_jobs].includes(file)) {
                    fileObject[n_jobs].push(file);
                }
            }
            else fileObject[n_jobs] = [file];
        }
        return 0;
    })
    return fileObject;
}