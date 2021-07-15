import React, { useState, useEffect } from "react";
import moment from "moment";
import { DateRangePicker } from "react-date-range";

import { Table } from "./Table";
import { getSubmissionsFromServer } from "../../services/admin";
import { SUBMISSION_COLUMNS } from "./columns";
import { Button } from "react-bootstrap";

export default function SubmissionTable() {
  const [submissions, setSubmissions] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  useEffect(() => {
    getSubmissionsFromServer().then((data) => {
      setSubmissions(data);
      setTableData(data);
    });
  }, []);

  const handleDateSelector = (range) => {
    setDateRange([range.selection]);
    let start = new Date(range.selection.startDate);
    let end = new Date(range.selection.endDate);
    // add 2 to the date so as to get the date correctly from the end of the current date.
    // if the current date is 4th, then start = 3rd, 00.00.00
    // so if we add 2, then it will become start = 5th. 00.00.00
    start.setDate(start.getDate() + 2);
    end.setDate(end.getDate() + 2);
    const filteredSubmissions = submissions.filter((submission) => {
      const submissionDate = moment(submission["submissionDate"], "DD/MM/YYYY");
      return submissionDate >= start && submissionDate <= end;
    });

    setTableData(filteredSubmissions);
  };

  const handleShowDateRangePicker = () =>
    setShowDateRangePicker(!showDateRangePicker);

  return (
    <div>
      <Button variant={"secondary"} onClick={handleShowDateRangePicker}>
        Filter by date
      </Button>
      {showDateRangePicker && (
        <div className="date-range-picker-container">
          <DateRangePicker
            className="date-range-picker"
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            onChange={handleDateSelector}
          />
        </div>
      )}
      <Table submissions={tableData} columnNames={SUBMISSION_COLUMNS}></Table>
    </div>
  );
}
