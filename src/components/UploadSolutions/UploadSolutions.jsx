import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./uploadSoluitons.css";

export default function UploadSolutions() {
  const { register, handleSubmit, control } = useForm();
  const onSubmit = (data) => console.log(data);
  const [files, setFiles] = useState();

  return (
    <div className="uploadSolutions-container">
      <h4 className="form-heading">
        Please fill in the following details and upload your solutions
      </h4>
      <div className="uploadSolutions-form-container">
        <Form class="uploadSolutions-form" onSubmit={handleSubmit(onSubmit)}>
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
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="lastname">
                <Form.Text className="text-muted flags">[Mandatory]</Form.Text>
                <Form.Control
                  {...register("email")}
                  type="text"
                  placeholder="Email ID"
                />
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
