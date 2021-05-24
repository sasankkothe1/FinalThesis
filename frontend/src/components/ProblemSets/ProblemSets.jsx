import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import FRCPSP from "./IndividualProblemSetPages/FRCPSP";
import MRCPSP from "./IndividualProblemSetPages/MRCPSP";
import MRCPSPMax from "./IndividualProblemSetPages/MRCPSPMax";
import RCPSP from "./IndividualProblemSetPages/RCPSP";
import RCPSPMax from "./IndividualProblemSetPages/RCPSPMax";
import RIPMax from "./IndividualProblemSetPages/RIPMax";
import ProblemSetLandingPage from "./ProblemSetLandingPage";

export default function ProblemSets() {
  return (
    <div className="problemSet-container">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={"/ProblemSets"}
            component={ProblemSetLandingPage}
          />
          <Route exact path={"/ProblemSets/rcpsp"} component={RCPSP} />
          <Route exact path={"/ProblemSets/rcpspmax"} component={RCPSPMax} />
          <Route exact path={"/ProblemSets/mrcpsp"} component={MRCPSP} />
          <Route exact path={"/ProblemSets/mrcpspmax"} component={MRCPSPMax} />
          <Route exact path={"/ProblemSets/ripmax"} component={RIPMax} />
          <Route exact path={"/ProblemSets/frcpsp"} component={FRCPSP} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
