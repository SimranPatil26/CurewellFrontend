import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        background: "linear-gradient(145deg, rgb(204, 227, 228), #a2c1c2, rgb(192, 220, 238))",
        minHeight: "15vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // Aligns links to the right
        padding: "0 20px",
        boxShadow: "4px 4px 10px rgba(255, 255, 255, 0.5)",
        borderBottom: "3px solid white",
        borderTop: "3px solid white",
      }}
    >
      <h1 style={{ color: "white", margin: "0" }}>Curewell</h1>
      <ul style={{ listStyle: "none", display: "flex", gap: "20px", margin: "0", padding: "0" }}>
        <li>
          <Link style={{ textDecoration: "none", color: "white", fontWeight: "bold" }} to="/viewdoc">
            View Doctor
          </Link>
        </li>
        <li>
          <Link style={{ textDecoration: "none", color: "white", fontWeight: "bold" }} to="/viewspec">
            View Specialisation
          </Link>
        </li>
        <li>
          <Link style={{ textDecoration: "none", color: "white", fontWeight: "bold" }} to="/viewsurgery">
            View Surgeries Today
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
