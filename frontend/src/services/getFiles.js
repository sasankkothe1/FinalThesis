import backend from "./backendConfig";
import axios from "axios";

let getTheFileListURL = `http://${backend.URL}:${backend.PORT}/getTheFileList`
let downloadFileURL = `http://${backend.URL}:${backend.PORT}/downloadFile`

export const getFiles = typeOfProblem => {
    return axios.get(getTheFileListURL + typeOfProblem).then(({ data }) => {
        return JSON.stringify(data);
    })
        .catch(err => console.log(err));
}

export const downloadFile = fileName => {
    return axios.get(downloadFileURL + fileName).then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    })
}