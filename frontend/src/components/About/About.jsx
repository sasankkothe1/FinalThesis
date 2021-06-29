import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAccessToken } from "../../services/login";
import "./about.css";

export default function About() {
  const history = useHistory();

  useEffect(() => {
    let accessToken = getAccessToken();
    if (!accessToken) history.push("/login");
  });

  //TODO: Implement the research papers links

  return (
    <div className="about-container">
      <h4>PROJECT SCHEDULING PROBLEM LIBRARY - PSPLIB</h4>
      <h5>What is PSPLIB?</h5>
      <p className="about-paragraph">
        PSPLIB is also called as Project Scheduling Problem Library. It is a
        collection of different project scheduling problems. This is developed
        by Chair of Operations Management of Technical University of Munich in
        an attempt to provide an online service to check the solutions of the
        researchers for a specific problem. Any researcher can donwload the
        project scheduling problems and upload their solutions to the sytem.
        Later user receives a mail with the report that mentions the status
        about the uploaded solutions.{" "}
      </p>
      <h5>Types of problems provided in the website</h5>
      <ul>
        <li className="type-of-problem-list-item">
          Single Mode Resource-Constrained Project Scheduling Problem
        </li>
        <li className="type-of-problem-list-item">
          Single Mode Resource-Constrained Project Scheduling Problem with
          minimal and maximal time lags
        </li>
        <li className="type-of-problem-list-item">
          Mulit-Mode Resource-Constrained Project Scheduling Problem
        </li>
        <li className="type-of-problem-list-item">
          Mulit-Mode Resource-Constrained Project Scheduling Problem with
          minimal and maximal time lags
        </li>
        <li className="type-of-problem-list-item">
          Resource Investment Problem with minimal and maximal time lags
        </li>
      </ul>
      <p className="about-paragraph">
        User can download the above problem sets by navigating to the "Problem
        Sets" option from above.
      </p>
      <h5>Relavant research papers</h5>
      <ul>
        <li className="research-list-item">
          Nunc ut porttitor nulla. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia curae.
        </li>
        <li className="research-list-item">
          Curabitur ultricies sapien lectus, ac consequat tortor vestibulum
          eget.
        </li>
        <li className="research-list-item">
          Mauris viverra, felis vitae efficitur volutpat, justo justo
          pellentesque ante
        </li>
      </ul>
    </div>
  );
}
