import React, { useState, useEffect } from "react";
import { Table } from "./Table";
import { getBestResultsFromServer } from "../../services/admin";
import { BESTRESULTS_COLUMNS } from "./columns";

export default function BestResultsTable() {
  const [bestResults, setBestResults] = useState([]);

  useEffect(() => {
    getBestResultsFromServer().then((data) => {
      setBestResults(data);
    });
  }, []);

  return (
    <div>
      <Table
        submissions={bestResults}
        columnNames={BESTRESULTS_COLUMNS}
      ></Table>
    </div>
  );
}
