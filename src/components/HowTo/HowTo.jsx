import React from "react";
import { Accordion, Button, Card } from "react-bootstrap";

import "./howTo.css";

export default function HowTo() {
  return (
    <div className="howTo-container">
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle
              className="accordian-titles"
              as={Button}
              variant="link"
              eventKey="0"
            >
              Find the problem sets
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="accordian-description">
              <ul>
                <li>Click on "problem sets" options in the navigation bar</li>
                <li>
                  Click on the desired problem set. You will be redirected to a
                  new page with list of problem sets
                </li>
                <li>
                  Please note that
                  <ul>
                    <li>
                      You may download data sets (*.sm.tgz), optimal (*opt.sm)
                      or heuristic (*hrs.sm) solutions and, in the case that no
                      optimal solutions are known, a file with lower and upper
                      bounds for Single Mode problems (*lb.sm).
                    </li>
                  </ul>
                </li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle
              className="accordian-titles"
              as={Button}
              variant="link"
              eventKey="1"
            >
              Upload the solution
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <ul>
                <li>
                  Click on "Upload Solutions" button in the navigation bar
                </li>
                <li>
                  Fill in the form.
                  <ul>
                    <li>
                      Make sure you filled the form correctly.
                      <ul>
                        <li>Name and email are mandatory</li>
                        <li>
                          We will not share your email with anyone. The same
                          email is used in future for further communication
                        </li>
                      </ul>
                    </li>
                    <li>
                      Upload only files with formats .zip, .tar.gz, *.txt files
                    </li>
                    <li>
                      Please make sure solution file format is according to this{" "}
                      <a href="./sampleSolution_mm_j30.txt" download>
                        format(mm_j30)
                      </a>
                      . Other wise, the system will reject the files
                    </li>
                  </ul>
                </li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle
              className="accordian-titles"
              as={Button}
              variant="link"
              eventKey="2"
            >
              Contact US
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <ul>
                <li>
                  Please send email to sample@tum.de for any questions.
                  <ul>
                    <li>
                      Make sure to mention the name of the person who solved or
                      submitted the solution
                    </li>
                  </ul>
                </li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}
