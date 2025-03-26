import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Alert } from "react-bootstrap";
import axios from "axios";

const AddSurgery = () => {
  const navigate = useNavigate();
  const [doctorId, setDoctorId] = useState("");
  const [surgeryName, setSurgeryName] = useState("");
  const [specCode, setSpecCode] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [surgeryDate, setSurgeryDate] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const token = localStorage.getItem("token"); // Get token from localStorage

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!doctorId || !surgeryName || !specCode || !startTime || !endTime || !surgeryDate) {
      setError("Please fill in all fields.");
      return;
    }

    const surgeryPayload = {
      doctorId,
      surgeryName,
      specCode,
      startTime,
      endTime,
      surgeryDate,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/surgeries",
        surgeryPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess("Surgery added successfully!");
      setError(null);
      setTimeout(() => navigate("/viewsurgery"), 1500); // Redirect to surgery list after success
    } catch (err) {
      setError("Failed to add surgery. Please try again.");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Add Surgery</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Doctor ID</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter doctor's ID"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Surgery Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter surgery name"
            value={surgeryName}
            onChange={(e) => setSurgeryName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Specialization Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter specialization code"
            value={specCode}
            onChange={(e) => setSpecCode(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>End Time</Form.Label>
          <Form.Control
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Surgery Date</Form.Label>
          <Form.Control
            type="date"
            value={surgeryDate}
            onChange={(e) => setSurgeryDate(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          Add Surgery
        </Button>
      </Form>
    </Container>
  );
};

export default AddSurgery;
