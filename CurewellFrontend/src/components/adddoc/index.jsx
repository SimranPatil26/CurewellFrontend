import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Alert } from "react-bootstrap";
import axios from "axios";

const AddDoc = () => {
  const navigate = useNavigate();
  const [doctorName, setDoctorName] = useState("");
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpec, setSelectedSpec] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const token = localStorage.getItem("token"); // Getting the token from localStorage

  useEffect(() => {
    // Fetch specializations if token exists
    const fetchSpecializations = async () => {
      try {
        const response = await axios.get("http://localhost:8080/specialisations", {
          headers: { Authorization: `Bearer ${token}` }, // Adding the token for authorization
        });
        setSpecializations(response.data); // Storing the fetched specializations
      } catch (err) {
        setError("Failed to fetch specializations"); // Handling error if fetching fails
      }
    };

    if (token) {
      fetchSpecializations();
    } else {
      setError("Unauthorized! Please log in.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doctorName || !selectedSpec) {
      setError("Please enter doctor name and select a specialization.");
      return;
    }

    try {
      // Step 1: Add doctor
      const doctorResponse = await axios.post(
        "http://localhost:8080/doctors",
        { doctorName: doctorName },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      const doctorId = doctorResponse.data.doctorId; // Using doctorId returned by the API

      // Step 2: Add doctor-specialization relationship
      await axios.post(
        "http://localhost:8080/doctor-specializations",
        {
          doctorId: doctorId,
          specializationId: selectedSpec,
          specializationDate: new Date().toISOString().split("T")[0], // Assuming you want the current date for specialization date
        },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      setSuccess("Doctor added successfully!");
      setDoctorName("");
      setSelectedSpec("");
      setError(null);

      // Redirect to View Doctors page after success
      setTimeout(() => navigate("/viewdoc"), 1500);
    } catch (err) {
      setError("Failed to add doctor. Please try again.");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Add Doctor</h2>
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

        <Form.Group className="mb-3">
          <Form.Label>Specialization</Form.Label>
          <Form.Select value={selectedSpec} onChange={(e) => setSelectedSpec(e.target.value)} required>
            <option value="">Select Specialization</option>
            {specializations.map((spec) => (
              <option key={spec.specCode} value={spec.specCode}>
                {spec.specName} {/* Adjusted to match the API response */}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          Add Doctor
        </Button>
      </Form>
    </Container>
  );
};

export default AddDoc;
