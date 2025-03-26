import React from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const validate = (values) => {
    let errors = {};

    if (!values.name.trim()) {
      errors.name = "Full name is required";
    }

    if (!values.username.trim()) {
      errors.username = "Username is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.number) {
      errors.number = "Number is required";
    } else if (!/^\d{10}$/.test(values.number)) {
      errors.number = "Invalid phone number (must be 10 digits)";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!values.role) {
      errors.role = "Role is required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      number: "",
      email: "",
      password: "",
      role: "",
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/register",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Registration Successful:", response.data);
        alert("Signup Successful! Redirecting to login...");
        navigate("/Login");
      } catch (error) {
        console.error("Registration Error:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Signup Failed! Try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card style={{ width: "350px", padding: "15px" }} className="shadow">
        <Card.Body>
          <h3 className="text-center mb-4">Sign Up</h3>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <small className="text-danger">{formik.errors.name}</small>
              )}
            </Form.Group>

            <Form.Group className="mb-1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username && (
                <small className="text-danger">{formik.errors.username}</small>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="number"
                value={formik.values.number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.number && formik.errors.number && (
                <small className="text-danger">{formik.errors.number}</small>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <small className="text-danger">{formik.errors.email}</small>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <small className="text-danger">{formik.errors.password}</small>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Role</option>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </Form.Control>
              {formik.touched.role && formik.errors.role && (
                <small className="text-danger">{formik.errors.role}</small>
              )}
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>
          </Form>
          <br />
          <p>
            Already signed up? <Link to='/login'>Click Here</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
