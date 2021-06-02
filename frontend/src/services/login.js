import backend from "./backendConfig";
import axios from "axios";

let loginURL = `http://${backend.URL}:${backend.PORT}/login`;

let accessToken = null

export const login = data => {
    return axios.post(loginURL, data, {})
        .then(res => {
            if (res.status === 200) {
                setAccessToken(res.data)
                return res.status;
            }
            else return false;
        }).catch(err => console.log(err));
}

export const setAccessToken = accessTokenObj => {
    accessToken = accessTokenObj['accessToken']
}

export const getAccessToken = () => {
    return accessToken
}

export const removeAccessToken = () => {
    accessToken = null
}