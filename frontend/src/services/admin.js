import backend from "./backendConfig";
import axios from "axios";

let getSubmissionsURL = `http://${backend.URL}:${backend.PORT}/getSubmissions`
let getBestSubmissionsURL = `http://${backend.URL}:${backend.PORT}/getBestResults`
let getJobOptionsURL = `http://${backend.URL}:${backend.PORT}/getJobOptions`
let getReportURL = `http://${backend.URL}:${backend.PORT}/getReport`


export const getSubmissionsFromServer = () => {
    return axios.get(getSubmissionsURL).then(({ data }) => {
        return data;
    })
        .catch(err => console.log(err));
}

export const getBestResultsFromServer = () => {
    return axios.get(getBestSubmissionsURL).then(({ data }) => {
        return data;
    })
        .catch(err => console.log(err));
}

export const getJobNumbers = () => {
    return axios.get(getJobOptionsURL).then(({ data }) => {
        return data;
    })
        .catch(err => { console.log(err) })
}

export const getReport = (report) => {
    return axios.get(getReportURL, { params: report }).then((res) => {
        console.log(res)
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', "report_" + today + ".txt");
        document.body.appendChild(link);
        link.click();
    })
}