import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Container, Alert } from "react-bootstrap";
import axios from "axios";

const UpdateSurgery = () => {
  const { surgId } = useParams(); // Get the surgery ID from the URL
  const navigate = useNavigate();
  const [doctorId, setDoctorId] = useState("");
  const [surgeryName, setSurgeryName] = useState("");
  const [specCode, setSpecCode] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [surgeryDate, setSurgeryDate] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const token = localStorage.getItem("token"); // Fetch the token from localStorage

  // Fetch the surgery details to populate the form
  useEffect(() => {
    const fetchSurgeryDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/surgeries/${surgId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token here for authorization
          },
        });
        const surgery = response.data;
        setDoctorId(surgery.doctor?.doctorId);
        setSurgeryName(surgery.surgeryName);
        setSpecCode(surgery.specCode);
        setStartTime(surgery.startTime);
        setEndTime(surgery.endTime);
        setSurgeryDate(surgery.surgeryDate);
      } catch (err) {
        setError("Failed to fetch surgery details. Unauthorized access or other error.");
      }
    };

    if (surgId && token) {
      fetchSurgeryDetails();
    } else {
      setError("Unauthorized! Please log in again.");
    }
  }, [surgId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!doctorId || !surgeryName || !specCode || !startTime || !endTime || !surgeryDate) {
      setError("Please fill in all fields.");
      return;
    }

    const surgeryPayload = {
      doctor: { doctorId }, // Adjusting the payload format to match what the backend expects
      surgeryName,
      specCode,
      startTime,
      endTime,
      surgeryDate,
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/surgeries/${surgId}`,
        surgeryPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess("Surgery updated successfully!");
      setError(null);
      setTimeout(() => navigate("/viewsurgery"), 1500); // Redirect to surgery list after success
    } catch (err) {
      setError("Failed to update surgery. Please try again.");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Update Surgery</h2>
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
          Update Surgery
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateSurgery;
