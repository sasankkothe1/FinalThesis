import React from "react";

import { Button } from "react-bootstrap";

import "./adminView.css";
import { NavLink } from "react-router-dom";
import DownloadReportModal from "../DownloadReportModal";

export default function AdminView() {
  return (
    <div>
      <div className="adminview-buttons">
        <DownloadReportModal
          type="summaryFiles"
          className="adminview-button"
          displayTitle="Download Summary Files"
          modalHeader="Download Summary Files"
        />
        <DownloadReportModal
          type="reportFiles"
          displayTitle="Download Reports"
          modalHeader="Download Report Files"
          className="adminview-button"
        />
        <NavLink exact to={"Admin/submissionTable"}>
          <Button className="adminview-button" variant="secondary">
            All Submissions
          </Button>
        </NavLink>
        <NavLink exact to={"Admin/bestResultsTable"}>
          <Button className="adminview-button" variant="secondary">
            Best Results
          </Button>
        </NavLink>
      </div>
    </div>
  );
}
