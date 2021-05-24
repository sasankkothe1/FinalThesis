import backend from "./backendConfig";
import axios from "axios";

let uploadSolutionURL = `http://${backend.URL}:${backend.PORT}/upload`;

export const upload = data => {
    return axios.post(uploadSolutionURL, data, {})
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                console.log(res.status);
                return true;
            }
            else return false;
        }).catch(err => console.log(err));
}
