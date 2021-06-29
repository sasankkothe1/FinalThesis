import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { getAccessToken } from "../../services/login";
import FRCPSP from "./IndividualProblemSetPages/FRCPSP";
import MRCPSP from "./IndividualProblemSetPages/MRCPSP";
import RCPSP from "./IndividualProblemSetPages/RCPSP";
import RCPSPMax from "./IndividualProblemSetPages/RCPSPMax";
import RIPMax from "./IndividualProblemSetPages/RIPMax";
import ProblemSetLandingPage from "./ProblemSetLandingPage";

export default function ProblemSets() {
  const history = useHistory();

  useEffect(() => {
    let accessToken = getAccessToken();
    if (!accessToken) history.push("/login");
  }, [history]);

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
          <Route exact path={"/ProblemSets/ripmax"} component={RIPMax} />
          <Route exact path={"/ProblemSets/frcpsp"} component={FRCPSP} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
