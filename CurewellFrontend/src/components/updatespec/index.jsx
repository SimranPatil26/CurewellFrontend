import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";

const UpdateSpecialisation = () => {
  const { id } = useParams();
  const [specName, setSpecName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSpecialisation = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/specialisations/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSpecName(response.data.specName);
      } catch {
        setError("Failed to fetch specialisation details.");
      }
    };

    fetchSpecialisation();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await axios.put(
        `http://localhost:8080/specialisations/${id}`,
        { specName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess("Specialisation updated successfully!");
      setTimeout(() => navigate("/viewspecialisation"), 2000);
    } catch {
      setError("Failed to update specialisation.");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Update Specialisation</h2>

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

        <Button variant="primary" type="submit">
          Update Specialisation
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateSpecialisation;
