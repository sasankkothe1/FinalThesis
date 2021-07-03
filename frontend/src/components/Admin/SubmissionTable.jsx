import React, { useState, useEffect } from "react";
import { Table } from "./Table";
import { getSubmissionsFromServer } from "../../services/admin";
import { SUBMISSION_COLUMNS } from "./columns";

export default function SubmissionTable() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    getSubmissionsFromServer().then((data) => {
      setSubmissions(data);
    });
  }, []);

  return (
    <div>
      <Table submissions={submissions} columnNames={SUBMISSION_COLUMNS}></Table>
    </div>
  );
}
