import React, { useState, useEffect } from "react";
import { getFiles, downloadFile } from "../../../services/getFiles";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function RCPSP() {
  const [rcpspFiles, setrcpspFiles] = useState([]);

  useEffect(() => {
    getFiles("rcpsp").then((rcpspFiles) => {
      setrcpspFiles(rcpspFiles.split(","));
    });
  }, []);

  const getFileFromServer = (e) => {
    const fileName = e.target.innerHTML;
    const output = downloadFile("rcpsp/" + fileName);
  };

  return (
    <div>
      <NavLink exact to={"/ProblemSets"}></NavLink>
      {rcpspFiles.length > 0
        ? rcpspFiles.map((file) => {
            file = file.replace(/[\[\]"]+/g, "");
            // console.log(file, file.length);
            return (
              <li key={file} onClick={getFileFromServer}>
                {file.replace(/ /g, "")}
              </li>
            );
          })
        : null}
    </div>
  );
}
