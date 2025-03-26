import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams to get ID from URL
import { Button, Form, Container, Alert } from "react-bootstrap";
import axios from "axios";

const UpdateDoc = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get doctor ID from URL
  const [doctorName, setDoctorName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const token = localStorage.getItem("token"); // Get token from localStorage

  useEffect(() => {
    if (!token) {
      setError("Unauthorized! Please log in.");
      return;
    }

    // Fetch doctor details if token exists
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/doctors/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setDoctorName(response.data.docname); // Assuming the API returns { docid, docname }
      } catch (err) {
        setError("Failed to fetch doctor details.");
      }
    };

    fetchDoctorDetails();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!doctorName.trim()) {
      setError("Please enter a doctor name.");
      return;
    }

    const doctorUpdatePayload = {
      doctorName: doctorName, // Send only the updated name
    };

    try {
      await axios.put(
        `http://localhost:8080/doctors/${id}`, // Use `id` from URL
        doctorUpdatePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Doctor updated successfully!");
      setError(null);
      setTimeout(() => navigate("/viewdoc"), 1500); // Redirect after success
    } catch (err) {
      setError("Failed to update doctor. Please try again.");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Update Doctor</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Doctor Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter doctor's name"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          Update Doctor
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateDoc;
