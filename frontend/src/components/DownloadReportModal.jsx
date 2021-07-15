import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal } from "react-bootstrap";
import { DateRangePicker } from "react-date-range";
import moment from "moment";
import ReactSelect from "react-select";

import { getJobNumbers, getReport } from "../services/admin";
import "./DownloadReportModal.css";

export default function DownloadReportModal(props) {
  const [showModal, setShowModal] = useState(false);
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const { handleSubmit, control } = useForm();

  const [optionsJobs, setOptionsJobs] = useState([]);

  useEffect(() => {
    getJobNumbers().then((data) => {
      setOptionsJobs(data);
    });
  }, []);

  const handleShowDateRangePicker = () =>
    setShowDateRangePicker(!showDateRangePicker);

  const submit = (data) => {
    if (data["dateRange"] !== undefined) {
      const startDate = moment(
        data["dateRange"]["selection"]["startDate"],
        "DD/MM/YYYY"
      );
      const endDate = moment(
        data["dateRange"]["selection"]["endDate"],
        "DD/MM/YYYY"
      );
      let reportParam = {
        jobs: data["jobsNumber"]["value"],
        mode: data["mode"]["value"],
        type: data["type"]["value"],
        startDate: startDate.format("DD-MM-YYYY"),
        endDate: endDate.format("DD-MM-YYYY"),
        reportType: props.type,
      };
      getReport(reportParam);
    } else {
      let reportParam = {
        jobs: data["jobsNumber"]["value"],
        mode: data["mode"]["value"],
        type: data["type"]["value"],
        reportType: props.type,
      };

      getReport(reportParam);
    }
  };

  return (
    <>
      <Button
        className={props.className}
        variant="secondary"
        onClick={handleShow}
      >
        {props.displayTitle}
      </Button>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.modalHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.type === "summaryFiles" && (
            <h5 className="modal-description">
              You can download the best submissions using the below form. Please
              select the number of jobs and the type of the solution and the
              mode.
              <h6 className="modal-description">
                <strong>
                  Note that if the combination is incorrect, empty file will be
                  downloaded
                </strong>
              </h6>
            </h5>
          )}
          <form onSubmit={handleSubmit(submit)}>
            {props.type === "reportFiles" && (
              <Button variant={"secondary"} onClick={handleShowDateRangePicker}>
                Filter by date
              </Button>
            )}
            {props.type === "reportFiles" && showDateRangePicker && (
              <div className="date-range-picker-container">
                <Controller
                  control={control}
                  name="dateRange"
                  render={({ field }) => (
                    <DateRangePicker
                      className="date-range-picker"
                      editableDateInputs={true}
                      moveRangeOnFirstSelection={false}
                      ranges={dateRange}
                      onChange={(date) => {
                        field.onChange(date);
                        setDateRange([date.selection]);
                      }}
                      selected={field.value}
                    />
                  )}
                ></Controller>
              </div>
            )}
            <Controller
              name="jobsNumber"
              isClearable
              control={control}
              render={({ field }) => (
                <ReactSelect
                  placeholder="Select number of jobs"
                  className="downloadModalSelect"
                  {...field}
                  options={optionsJobs}
                />
              )}
            />
            <Controller
              name="type"
              isClearable
              control={control}
              render={({ field }) => (
                <ReactSelect
                  placeholder="Select type"
                  className="downloadModalSelect"
                  {...field}
                  options={[
                    { value: "hrs", label: "Heuristic" },
                    { value: "lb", label: "Lower Bound" },
                    { value: "opt", label: "Optimal" },
                  ]}
                />
              )}
            />
            <Controller
              name="mode"
              isClearable
              control={control}
              render={({ field }) => (
                <ReactSelect
                  placeholder="Select Mode"
                  className="downloadModalSelect"
                  {...field}
                  options={[
                    { value: "sm", label: "Single Mode" },
                    { value: "mm", label: "Multi Mode" },
                  ]}
                />
              )}
            />
            <div className="downloadModalSubmitButton-container">
              <Button
                className="downloadModalSubmitButton"
                variant="success"
                type="submit"
                size="sm"
              >
                Download
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
