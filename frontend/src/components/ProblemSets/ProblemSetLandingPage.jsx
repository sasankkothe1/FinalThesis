import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

export default function ProblemSetLandingPage() {
  return (
    <div>
      <h5>Different types of Project Scheduling problems</h5>
      <ol>
        <li>
          <NavLink className="problem-link" exact to={"/ProblemSets/rcpsp"}>
            Single Mode Resource-Constrained Project Scheduling Problem (RCPSP)
          </NavLink>
        </li>
        <li>
          <a
            target="_blank"
            className="problem-link"
            href="https://www.wiwi.tu-clausthal.de/en/ueber-uns/abteilungen/betriebswirtschaftslehre-insbesondere-produktion-und-logistik/research/research-areas/project-generator-progen/max-and-psp/max-library/single-mode-project-duration-problem-rcpsp/max"
            rel="noreferrer"
          >
            Single mode project duration problem RCPSP/max
          </a>
          &nbsp;
          <FontAwesomeIcon
            className="new-window-icon"
            icon={faExternalLinkAlt}
          />
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
            Multi mode project duration problem MRCPSP/max
          </a>
          &nbsp;
          <FontAwesomeIcon
            className="new-window-icon"
            icon={faExternalLinkAlt}
          />
        </li>
        <li>
          <a
            target="_blank"
            className="problem-link"
            href="https://www.wiwi.tu-clausthal.de/en/ueber-uns/abteilungen/betriebswirtschaftslehre-insbesondere-produktion-und-logistik/research/research-areas/project-generator-progen/max-and-psp/max-library/single-mode-resource-investment-problem-rip/max"
            rel="noreferrer"
          >
            Single mode resource investment problem RIP/max
          </a>
          &nbsp;
          <FontAwesomeIcon
            className="new-window-icon"
            icon={faExternalLinkAlt}
          />
        </li>
        <li>
          <a
            target="_blank"
            className="problem-link"
            href="https://www.wiwi.tu-clausthal.de/en/ueber-uns/abteilungen/betriebswirtschaftslehre-insbesondere-produktion-und-logistik/research/research-areas/project-generator-progen/max-and-psp/max-library/single-mode-resource-levelling-problem-rlp/max"
            rel="noreferrer"
          >
            Single mode resource levelling problem RLP/max
          </a>
          &nbsp;
          <FontAwesomeIcon
            className="new-window-icon"
            icon={faExternalLinkAlt}
          />
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
