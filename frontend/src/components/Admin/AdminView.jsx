import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal } from "react-bootstrap";
import ReactSelect from "react-select";
import { getJobNumbers, getReport } from "../../services/admin";

import "./adminView.css";
import { NavLink } from "react-router-dom";

export default function AdminView() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const { handleSubmit, control } = useForm();

  const [optionsJobs, setOptionsJobs] = useState([]);

  useEffect(() => {
    getJobNumbers().then((data) => {
      setOptionsJobs(data);
    });
  }, []);

  const submit = (data) => {
    let reportParam = {
      jobs: data["jobsNumber"]["value"],
      mode: data["mode"]["value"],
      type: data["type"]["value"],
    };
    console.log(reportParam);
    getReport(reportParam);
  };

  return (
    <div>
      <div className="adminview-buttons">
        <Button
          className="adminview-button"
          variant="secondary"
          onClick={handleShow}
        >
          Download Report
        </Button>
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
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Download Reports</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(submit)}>
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
      </div>
    </div>
  );
}
