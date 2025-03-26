import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";

const AddSpecialisation = () => {
  const [specName, setSpecName] = useState("");
  const [specCode, setSpecCode] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        "http://localhost:8080/specialisations",
        { specName, specCode },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess("Specialisation added successfully!");
      setTimeout(() => navigate("/viewspecialisation"), 2000);
    } catch (err) {
      setError("Failed to add specialisation. Please try again.");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Add Specialisation</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Specialisation Name</Form.Label>
          <Form.Control
            type="text"
            value={specName}
            onChange={(e) => setSpecName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Specialisation Code</Form.Label>
          <Form.Control
            type="text"
            value={specCode}
            onChange={(e) => setSpecCode(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Specialisation
        </Button>
      </Form>
    </Container>
  );
};

export default AddSpecialisation;
