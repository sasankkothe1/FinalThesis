import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { getFiles, downloadFile } from "../../../services/getFiles";
import { createFileObject } from "../../../helpers/fileToFileObject";
import { NavLink } from "react-router-dom";

export default function RCPSP() {
  const [rcpspFileObject, setrcpspFileObject] = useState();

  useEffect(() => {
    getFiles("rcpsp/sm").then((rcpspFiles) => {
      setrcpspFileObject(createFileObject(rcpspFiles));
    });
  }, []);

  const getFileFromServer = (e) => {
    const fileName = e.target.innerHTML;
    downloadFile("rcpsp/sm/" + fileName);
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
