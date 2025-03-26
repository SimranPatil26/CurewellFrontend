import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Container } from "react-bootstrap";
import axios from "axios";

const Viewdoctor = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [doctorSpec, setDoctorSpec] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  console.log("Token:", token);

  useEffect(() => {
    if (!token) {
      setError("Unauthorized! Please log in first.");
      return;
    }

    const fetchAllData = async () => {
      try {
        const [doctorRes, specRes, docSpecRes] = await Promise.all([
          axios.get("http://localhost:8080/doctors", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("http://localhost:8080/specialisations", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("http://localhost:8080/doctor-specializations", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setDoctors(doctorRes.data);
        setSpecializations(specRes.data);
        setDoctorSpec(docSpecRes.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchAllData();
  }, [token]);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const combinedDoctors = doctors.map((doctor) => {
    const docSpec = doctorSpec.filter((ds) => ds.doctor.doctorId === doctor.doctorId);

    const doctorSpecializations = docSpec.map((ds) => {
      const spec = specializations.find((spec) => spec.specCode === ds.specialisation.specCode);
      return spec ? spec.specName : "Unknown";
    });

    return {
      ...doctor,
      specializations: doctorSpecializations.length > 0 ? doctorSpecializations : ["No Specialization"],
    };
  });

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Doctors List</h2>
      <Table bordered striped hover className="text-center">
        <thead className="table-dark">
          <tr>
            <th>Doctor ID</th>
            <th>Name</th>
            <th>Specialization</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {combinedDoctors.length > 0 ? (
            combinedDoctors.map((doctor) => (
              <tr key={doctor.doctorId}>
                <td>{doctor.doctorId}</td>
                <td>{doctor.doctorName}</td>
                <td>{doctor.specializations.join(", ")}</td>
                <td>
                  <Button variant="primary" onClick={() => navigate(`/update-doctor/${doctor.doctorId}`)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No doctors found</td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className="text-center">
        <Button variant="success" onClick={() => navigate("/add-doctor")}>Add Doctor</Button>
      </div>
    </Container>
  );
};

export default Viewdoctor;
