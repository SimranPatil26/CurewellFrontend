// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Table, Button, Container, Alert } from "react-bootstrap";
// import axios from "axios";

// const ViewSurgery = () => {
//   const [surgeries, setSurgeries] = useState([]);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem("token"); // Fetch the token
//   const navigate = useNavigate();

//   // Fetch all surgeries
//   useEffect(() => {
//     const fetchSurgeries = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/surgeries", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSurgeries(response.data);
//       } catch (err) {
//         setError("Failed to fetch surgeries.");
//       }
//     };

//     if (token) {
//       fetchSurgeries();
//     } else {
//       setError("Unauthorized! Please log in.");
//     }
//   }, [token]);

//   return (
//     <Container className="mt-4">
//       <h2 className="text-center mb-4">Surgery List</h2>

//       {error && <Alert variant="danger">{error}</Alert>}

//       <Button
//         variant="success"
//         className="mb-3"
//         onClick={() => navigate("/addsurgery")} // Navigate to Add Surgery page
//       >
//         Add Surgery
//       </Button>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Specialization</th>
//             <th>Start Time</th>
//             <th>End Time</th>
//             <th>Date</th>
//             <th>Doctor ID</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {surgeries.map((surgery) => (
//             <tr key={surgery.surgId}>
//               <td>{surgery.surgId}</td>
//               <td>{surgery.surgeryName}</td>
//               <td>{surgery.specCode}</td>
//               <td>{surgery.startTime}</td>
//               <td>{surgery.endTime}</td>
//               <td>{surgery.surgeryDate}</td>
//               <td>{surgery.doctor?.doctorId}</td>
//               <td>
//                 <Button
//                   variant="warning"
//                   className="me-2"
//                   onClick={() => navigate(`/updatesurgery/${surgery.surgId}`)}
//                 >
//                   Edit
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default ViewSurgery;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";

const ViewSurgery = () => {
  const [surgeries, setSurgeries] = useState([]);
  const [error, setError] = useState(null);
  const [isToday, setIsToday] = useState(false);  // To track whether we're showing today's surgeries
  const token = localStorage.getItem("token");  // Fetch the token
  const navigate = useNavigate();

  // Fetch all surgeries (initially) or today's surgeries (on button click)
  const fetchSurgeries = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSurgeries(response.data);
    } catch (err) {
      setError("Failed to fetch surgeries.");
    }
  };

  useEffect(() => {
    const url = isToday ? "http://localhost:8080/surgeries/today" : "http://localhost:8080/surgeries";
    if (token) {
      fetchSurgeries(url);
    } else {
      setError("Unauthorized! Please log in.");
    }
  }, [token, isToday]);  // Trigger when token or isToday changes

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Surgery List</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button
        variant="info"
        className="mb-3 me-2"
        onClick={() => setIsToday(false)} // Show all surgeries
      >
        All Surgeries
      </Button>

      <Button
        variant="success"
        className="mb-3"
        onClick={() => setIsToday(true)} // Show today's surgeries only
      >
        Today's Surgeries
      </Button>

      <Button
        variant="success"
        className="mb-3"
        onClick={() => navigate("/addsurgery")} // Navigate to Add Surgery page
      >
        Add Surgery
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialization</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Date</th>
            <th>Doctor ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {surgeries.map((surgery) => (
            <tr key={surgery.surgId}>
              <td>{surgery.surgId}</td>
              <td>{surgery.surgeryName}</td>
              <td>{surgery.specCode}</td>
              <td>{surgery.startTime}</td>
              <td>{surgery.endTime}</td>
              <td>{surgery.surgeryDate}</td>
              <td>{surgery.doctor?.doctorId}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => navigate(`/updatesurgery/${surgery.surgId}`)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ViewSurgery;
