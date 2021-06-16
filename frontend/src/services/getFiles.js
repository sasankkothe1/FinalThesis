import backend from "./backendConfig";
import axios from "axios";

let getTheFileListURL = `http://${backend.URL}:${backend.PORT}/getTheFileList`
let downloadFileURL = "http://localhost:4000/downloadFile"

export const getFiles = typeOfProblem => {
    return axios.get(getTheFileListURL + typeOfProblem).then(({ data }) => {
        return JSON.stringify(data);
    })
        .catch(err => console.log(err));
}

export const downloadFile = fileParam => {
    console.log(fileParam)
    //  mode: "sm", fileName: "j60.sm.zip"
    console.log(fileParam['mode'] + "/" + fileParam['fileName'])
    return axios.get(downloadFileURL + "/?fileName=" + fileParam['problemType'] + "/" + fileParam['mode'] + "/" + fileParam['fileName']).then((res) => {
        console.log(res)
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileParam['fileName']);
        document.body.appendChild(link);
        link.click();
    })
}