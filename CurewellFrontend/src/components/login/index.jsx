import React from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Define validation schema using Yup
const validationSchema = Yup.object({
  usernameOrEmail: Yup.string()
    .min(3, "Username or Email must be at least 3 characters")
    .required("Username or Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { usernameOrEmail: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log("Submitting values:", values);

        const response = await axios.post(
          "http://localhost:8080/api/auth/login",
          values,
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("Full Response:", response);
        console.log("Response Data:", response.data); // This is the token string
        console.log("Received Token:", response.data); // Should no longer be undefined

        if (response.data) { // Since data itself is the token
          localStorage.setItem("token", response.data);
          console.log("JWT Token Stored:", response.data);
          navigate("/viewdoc");
        } else {
          alert("Login failed! No token received.");
        }
      } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Login failed! Please try again.");
      }
    },
  });

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card style={{ width: "400px", padding: "20px" }} className="shadow">
        <Card.Body>
          <h3 className="text-center mb-4">Login</h3>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email or Username</Form.Label>
              <Form.Control
                type="text"
                name="usernameOrEmail"
                value={formik.values.usernameOrEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.usernameOrEmail && !!formik.errors.usernameOrEmail}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.usernameOrEmail}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && !!formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              variant="success"
              type="submit"
              className="w-100"
              disabled={!formik.isValid || !formik.dirty}
            >
              Login
            </Button>
          </Form>
          <p className="mt-3">
            Return Home? <Link to="/">Click Here</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
