import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { getFiles, downloadFile } from "../../../services/getFiles";
import { getAccessToken } from "../../../services/login";
import { createFileObject } from "../../../helpers/fileToFileObject";

export default function MRCPSP() {
  const [rcpspFileObject, setrcpspFileObject] = useState();
  const history = useHistory();

  useEffect(() => {
    let accessToken = getAccessToken();
    if (!accessToken) history.push("/login");

    getFiles("?problemType=rcpsp&mode=mm").then((rcpspFiles) => {
      setrcpspFileObject(createFileObject(rcpspFiles));
    });
  }, [history]);
  const getFileFromServer = (e) => {
    const fileName = e.target.innerHTML;
    const fileObject = {
      problemType: "rcpsp",
      mode: "mm",
      fileName: fileName,
    };
    downloadFile(fileObject);
  };

  return (
    <div>
      <NavLink exact to={"/ProblemSets"}>
        <FontAwesomeIcon icon={faAngleLeft} />
        Go back to problem sets
      </NavLink>
      <ListGroup>
        {rcpspFileObject &&
          Object.keys(rcpspFileObject).map((n_jobs) => {
            let arrayToBeRendered = [];
            arrayToBeRendered.push(n_jobs);
            arrayToBeRendered.push(rcpspFileObject[n_jobs]);
            const listItem = arrayToBeRendered.map((el, index) => {
              if (index === 0)
                return (
                  <ListGroup.Item
                    key={index}
                    variant="dark"
                    className="job-heading"
                  >{`${el} job files`}</ListGroup.Item>
                );
              else {
                return arrayToBeRendered[index].map((fileName) => {
                  return (
                    <ListGroup.Item
                      className="file-name"
                      key={fileName}
                      onClick={getFileFromServer}
                    >
                      {fileName}
                    </ListGroup.Item>
                  );
                });
              }
            });
            return listItem;
          })}
      </ListGroup>
    </div>
  );
}
