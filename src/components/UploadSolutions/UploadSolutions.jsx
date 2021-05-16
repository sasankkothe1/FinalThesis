import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Row } from "react-bootstrap";
import { upload } from "../../services/uploadFile";
import "bootstrap/dist/css/bootstrap.css";
import "./uploadSoluitons.css";

export default function UploadSolutions() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [emailError, setEmailError] = useState(false);

  const checkformValidity = (data) => {
    if (data.name === undefined) {
      return false;
    } else if (
      data.email === undefined ||
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        data.email
      )
    ) {
      setEmailError(true);
      return false;
    } else {
      return true;
    }
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
      upload(formData);
    } else console.log("form not valid");
  };

  return (
    <div className="uploadSolutions-container">
      <h4 className="form-heading">
        Please fill in the following details and upload your solutions
      </h4>
      <div className="uploadSolutions-form-container">
        <Form
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
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="First Name, Last Name"
                />
                {errors?.name?.type === "required" && (
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
                    required: true,
                    pattern: !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
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
              <Form.Group controlId="solutions">
                <Form.Control
                  {...register("solutions")}
                  type="file"
                  placeholder="Drag and drop/browse from the computer and upload *.txt files, zip files"
                  multiple
                />
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
