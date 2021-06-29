import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { upload } from "../../services/uploadFile";
import "bootstrap/dist/css/bootstrap.css";
import "./uploadSoluitons.css";
import { getAccessToken } from "../../services/login";

export default function UploadSolutions() {
  const { register, handleSubmit } = useForm();

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [titleOfPaperError, setTitleOfPaperError] = useState(false);
  const [solutionListError, setSolutionListError] = useState(false);
  let history = useHistory();

  useEffect(() => {
    let accessToken = getAccessToken();
    if (!accessToken) history.push("/login");
  });

  const checkformValidity = (data) => {
    if (data.name === "") setNameError(true);
    else setNameError(false);
    if (
      data.email === undefined ||
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        data.email
      )
    )
      setEmailError(true);
    else setEmailError(false);
    if (data.solutions.length === 0) setSolutionListError(true);
    else setSolutionListError(false);
    if (data.typeOfSolution === "Lower Bound") {
      if (data.titleOfPaper === "") setTitleOfPaperError(true);
      else setTitleOfPaperError(false);
    } else setTitleOfPaperError(false);
  };

  const onSubmit = (data) => {
    const isFormValid = checkformValidity(data);
    if (isFormValid) {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("titleOfPaper", data.titleOfPaper);
      formData.append("contributors", data.contributors);
      for (var i = 0; i < data.solutions.length; i++) {
        // console.log(data.solutions[i]);
        formData.append("files", data.solutions[i]);
      }
      formData.append("typeOfInstance", data.typeOfInstance);
      formData.append("typeOfSolution", data.typeOfSolution);
      upload(formData);
    }
  };

  return (
    <div className="uploadSolutions-container">
      <h4 className="form-heading">
        Please fill in the following details and upload your solutions
      </h4>
      <div className="uploadSolutions-form-container">
        <Form
          encType="multipart/form-data"
          id="upload-form"
          className="uploadSolutions-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h5 className="form-inner-headings">Contact Details</h5>
          <Row className="form-inner-row">
            <Col>
              <Form.Group controlId="firstname">
                <Form.Text className="text-muted flags">[Mandatory]</Form.Text>
                <Form.Control
                  {...register("name")}
                  type="text"
                  placeholder="First Name, Last Name"
                />
                {nameError && (
                  <Form.Text className="text-muted flags error-msgs">
                    Please fill the name
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="lastname">
                <Form.Text className="text-muted flags">[Mandatory]</Form.Text>
                <Form.Control
                  {...register("email", {
                    pattern:
                      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  })}
                  type="text"
                  placeholder="Email ID"
                />
                {emailError && (
                  <Form.Text className="text-muted flags error-msgs">
                    Please check the email address
                  </Form.Text>
                )}
                <Form.Text className="text-muted flags">
                  [Solution status will be sent to this email address]
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <h5 className="form-inner-headings">About Research Paper</h5>
          <Row className="form-inner-row">
            <Col>
              <Form.Group controlId="titleOfPaper">
                <Form.Control
                  {...register("titleOfPaper")}
                  type="text"
                  placeholder="Title of the paper (optional)"
                />
                {titleOfPaperError && (
                  <Form.Text className="text-muted flags error-msgs">
                    Title of the research paper should be mentioned is you are
                    submitting Lower Bound solution.
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row className="form-inner-row">
            <Col>
              <Form.Group controlId="doi">
                <Form.Control
                  {...register("doi")}
                  type="text"
                  placeholder="DOI (optional)"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="form-inner-row">
            <Col>
              <Form.Group controlId="contributors">
                <Form.Control
                  {...register("contributors")}
                  type="text"
                  placeholder="contributors (optional)"
                />
              </Form.Group>
            </Col>
          </Row>
          <h5 className="form-inner-headings">Solutions</h5>
          <Row className="form-inner-row">
            <Col>
              <Form.Group controlId="typeOfInstance">
                <Form.Text className="text">Select type of instance</Form.Text>
                <Form.Control {...register("typeOfInstance")} as="select">
                  <option>rcpsp_sm</option>
                  <option>rcpsp_mm</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="form-inner-row">
            <Col>
              <Form.Group controlId="typeOfSolution">
                <Form.Text className="text">Select type of solution</Form.Text>
                <Form.Control {...register("typeOfSolution")} as="select">
                  <option>Lower Bound</option>
                  <option>Upper Bound</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="form-inner-row">
            <Col>
              <Form.Group controlId="solutions">
                <Form.Control
                  {...register("solutions")}
                  type="file"
                  placeholder="Drag and drop/browse from the computer and upload *.txt files, zip files"
                  multiple
                />
                {solutionListError && (
                  <Form.Text className="text-muted flags error-msgs">
                    You can not submit empty solutions
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row className="form-inner-row submit-button">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
}
