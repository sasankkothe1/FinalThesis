import backend from "./backendConfig";
import axios from "axios";

let getSubmissionsURL = `http://${backend.URL}:${backend.PORT}/getSubmissions`

let allSubmissions = null

export const getSubmissionsFromServer = () => {
    return axios.get(getSubmissionsURL).then(({ data }) => {
        setAllSubmission(data)
        return data;
    })
        .catch(err => console.log(err));
}

const setAllSubmission = (data) => {
    allSubmissions = data
}

export const getAllSubmissions = () => {
    console.log(allSubmissions)
    return allSubmissions;
}