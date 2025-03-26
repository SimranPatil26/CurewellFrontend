// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Table, Button, Container, Alert } from "react-bootstrap";
// import axios from "axios";

// const ViewSpecialisation = () => {
//   const [specialisations, setSpecialisations] = useState([]);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSpecialisations = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/specialisations", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSpecialisations(response.data);
//       } catch (err) {
//         setError("Failed to fetch specialisations.");
//       }
//     };

//     fetchSpecialisations();
//   }, [token]);

//   return (
//     <Container className="mt-4">
//       <h2 className="text-center mb-4">Specialisation List</h2>

//       {error && <Alert variant="danger">{error}</Alert>}

//       <Button variant="success" className="mb-3" onClick={() => navigate("/addspecialisation")}>
//         Add Specialisation
//       </Button>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Code</th>
//             <th>Name</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {specialisations.map((spec) => (
//             <tr key={spec.specCode}>
//               <td>{spec.specCode}</td>
//               <td>{spec.specName}</td>
//               <td>
//                 <Button
//                   variant="warning"
//                   className="me-2"
//                   onClick={() => navigate(`/updatespecialisation/${spec.specCode}`)}
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   variant="danger"
//                   onClick={async () => {
//                     try {
//                       await axios.delete(`http://localhost:8080/specialisations/${spec.specCode}`, {
//                         headers: { Authorization: `Bearer ${token}` },
//                       });
//                       setSpecialisations((prev) =>
//                         prev.filter((item) => item.specCode !== spec.specCode)
//                       );
//                     } catch {
//                       setError("Failed to delete specialisation.");
//                     }
//                   }}
//                 >
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default ViewSpecialisation;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Container, Alert, Modal } from "react-bootstrap";
import axios from "axios";

const ViewSpecialisation = () => {
  const [specialisations, setSpecialisations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSpecCode, setSelectedSpecCode] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecialisations = async () => {
      try {
        const response = await axios.get("http://localhost:8080/specialisations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSpecialisations(response.data);
      } catch (err) {
        setError("Failed to fetch specialisations.");
      }
    };

    fetchSpecialisations();
  }, [token]);

  // Fetch doctor-specializations and filter based on specCode
  const fetchDoctorsBySpecialization = async (specCode) => {
    try {
      const response = await axios.get("http://localhost:8080/doctor-specializations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Filter doctors based on the selected specialization specCode
      const filteredDoctors = response.data
        .filter(item => item.specialisation.specCode === specCode)
        .map(item => item.doctor.doctorName);
      
      setDoctors(filteredDoctors);
      setSelectedSpecCode(specCode); // store the specCode to show in modal title
      setShowModal(true);
    } catch (err) {
      setError("Failed to fetch doctors for this specialization.");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Specialisation List</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="success" className="mb-3" onClick={() => navigate("/addspecialisation")}>
        Add Specialisation
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {specialisations.map((spec) => (
            <tr key={spec.specCode}>
              <td>{spec.specCode}</td>
              <td>{spec.specName}</td>
              <td>
                <Button
                  variant="info"
                  className="me-2"
                  onClick={() => fetchDoctorsBySpecialization(spec.specCode)}
                >
                  View Doctors
                </Button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Doctors for Specialisation ({selectedSpecCode})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {doctors.length === 0 ? (
            <p>No doctors found for this specialization.</p>
          ) : (
            <ul>
              {doctors.map((doctor, index) => (
                <li key={index}>{doctor}</li>
              ))}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ViewSpecialisation;
