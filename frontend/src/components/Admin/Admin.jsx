import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminView from "./AdminView";
import SubmissionTable from "./SubmissionTable";
import BestResultsTable from "./BestResultsTable";

export default function Admin() {
  return (
    <div className="admin-container">
      <BrowserRouter>
        <Switch>
          <Route exact path={"/Admin"} component={AdminView} />
          <Route
            exact
            path={"/Admin/submissionTable"}
            component={SubmissionTable}
          />
          <Route
            exact
            path={"/Admin/bestResultsTable"}
            component={BestResultsTable}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
