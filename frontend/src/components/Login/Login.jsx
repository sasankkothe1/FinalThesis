import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { login } from "../../services/login";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("username", data.userName);
    formData.append("password", data.password);
    const status = await login(formData);
    if (status === 200) history.push("/");
  };

  return (
    <div className="login-container">
      <Form
        encType="multipart/form-data"
        id="login-form"
        className="loginForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Group controlId="userName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            {...register("userName", { requred: true })}
            type="text"
            placeholder="Username"
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...register("password", { requred: true })}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
