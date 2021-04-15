import React from "react";
import { NavLink, Route } from "react-router-dom";

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
          <NavLink className="problem-link" exact to={"/ProblemSets/mrcpspmax"}>
            Multi-Mode Resource Constrained Project scheduling Problem with
            minimal and maximal time lags (MRCPSP/Max)
          </NavLink>
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
