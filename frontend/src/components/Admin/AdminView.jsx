import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Modal, Col, Form, Row } from "react-bootstrap";
import ReactSelect from "react-select";
import { Table } from "./Table";
import {
  getJobNumbers,
  getReport,
  getSubmissionsFromServer,
} from "../../services/admin";

import "./adminView.css";

export default function AdminView() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const { handleSubmit, reset, setValue, control } = useForm();

  const [submissions, setSubmissions] = useState([]);
  const [optionsJobs, setOptionsJobs] = useState([]);

  useEffect(() => {
    getSubmissionsFromServer().then((data) => {
      setSubmissions(data);
    });
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
      <Button variant="primary" onClick={handleShow}>
        Download Report
      </Button>
      <Modal show={showModal} onHide={handleClose}>
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

      {/* Rendering the submission board here */}
      <Table submissions={submissions}></Table>
    </div>
  );
}
