import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faCoffee } from "@fortawesome/free-solid-svg-icons";

export default function ProblemSetLandingPage() {
  return (
    <div>
      <h5>Different types of Project Scheduling problems</h5>
      <ol>
        <li>
          <NavLink className="problem-link" exact to={"/ProblemSets/rcpsp"}>
            Resource-Constrained Project Scheduling Problem (RCPSP)
          </NavLink>
        </li>
        <li>
          <NavLink className="problem-link" exact to={"/ProblemSets/rcpspmax"}>
            Resource-Constrained Project Scheduling Problem with minimal and
            maximal time lags(RCPSP/Max)
          </NavLink>
        </li>
        <li>
          <NavLink className="problem-link" exact to={"/ProblemSets/mrcpsp"}>
            Multi-Mode Resource Constrained Project scheduling Problem (MRCPSP)
          </NavLink>
        </li>
        <li>
          <a
            target="_blank"
            className="problem-link"
            href="https://www.wiwi.tu-clausthal.de/en/ueber-uns/abteilungen/operations-management-group/research-and-knowledge-transfer/research-areas/project-generator-progen/max-and-psp/max-library"
            rel="noreferrer"
          >
            Multi-Mode Resource Constrained Project scheduling Problem with
            minimal and maximal time lags (MRCPSP/Max)
          </a>
          &nbsp;
          <FontAwesomeIcon
            className="new-window-icon"
            icon={faExternalLinkAlt}
          />
        </li>
        <li>
          <NavLink className="problem-link" exact to={"/ProblemSets/ripmax"}>
            Resource Investment Problem with minimal and maximal time lags
            (RIP/max)
          </NavLink>
        </li>
        <li>
          <NavLink className="problem-link" exact to={"/ProblemSets/frcpsp"}>
            FRCPSP instances and user solutions
          </NavLink>
        </li>
      </ol>
    </div>
  );
}
