import backend from "./backendConfig";
import axios from "axios";

let uploadSolutionURL = `http://${backend.URL}:${backend.PORT}/upload`;

export const upload = data => {
    return axios.post(uploadSolutionURL, data, {})
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                console.log(res.status);
                alert("The files are uploaded successfully. Please check your email for the report");
                return res.status;
            }
            else return false;
        }).catch(err => alert(err));
}
