// import React, { useState, useEffect } from "react";

// const Profile = () => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     // Get email and name from localStorage
//     const storedEmail = localStorage.getItem("email") || "";
//     const storedName = localStorage.getItem("username") || "";
//     setEmail(storedEmail);
//     setName(storedName);
//   }, []);

//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleSave = () => {
//     localStorage.setItem("username", name); // Save updated name to localStorage
//     setIsEditing(false);
//     alert("Profile updated!");
//   };

//   return (
//     <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px", background: "#fff" }}>
//       <h2>Profile</h2>

//       <div style={{ marginBottom: "15px" }}>
//         <label>Email:</label>
//         <input
//           type="email"
//           value={email}
//           readOnly
//           style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
//         />
//       </div>

//       <div style={{ marginBottom: "15px" }}>
//         <label>Name:</label>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           readOnly={!isEditing}
//           style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
//         />
//       </div>

//       <button
//         onClick={isEditing ? handleSave : handleEditToggle}
//         style={{
//           padding: "10px 20px",
//           backgroundColor: isEditing ? "#28a745" : "#007bff",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//       >
//         {isEditing ? "Save" : "Edit & Change"}
//       </button>
//     </div>
//   );
// };

// export default Profile;

// import React, { useState, useEffect } from "react";
// import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
// import { Link } from "react-router-dom";

// const NavbarComponent = ({ isLoggedIn, username, handleLogout }) => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     const storedEmail = localStorage.getItem("email") || "";
//     const storedName = localStorage.getItem("username") || "";
//     setEmail(storedEmail);
//     setName(storedName);
//   }, []);

//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleSave = () => {
//     localStorage.setItem("username", name);
//     setIsEditing(false);
//     alert("Profile updated!");
//   };

//   return (
//     <Navbar
//       expand="lg"
//       style={{
//         background: "linear-gradient(90deg, #1E1E2F, #3A3D98)",
//         color: "#fff",
//         padding: "10px 20px",
//       }}
//     >
//       <Container>
//         <Navbar.Brand
//           as={Link}
//           to="/"
//           style={{
//             color: "#00D4FF",
//             fontWeight: "bold",
//             fontSize: "20px",
//             letterSpacing: "1px",
//           }}
//         >
//           Zieers Business Proposal
//         </Navbar.Brand>

//         <Navbar.Toggle
//           aria-controls="basic-navbar-nav"
//           style={{ borderColor: "#00D4FF" }}
//         />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
//             <Nav.Link as={Link} to="/" style={navLinkStyle}>Home</Nav.Link>

//             {isLoggedIn && (
//               <Nav.Link as={Link} to="/projects" style={navLinkStyle}>
//                 Projects 📁
//               </Nav.Link>
//             )}

//             {isLoggedIn ? (
//               <Dropdown align="end">
//                 <Dropdown.Toggle variant="secondary" style={dropdownStyle}>
//                   👤 {name || username}
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu style={{ padding: "20px", width: "300px" }}>
//                   <h5>Profile</h5>

//                   <label style={{ fontSize: "14px" }}>Email:</label>
//                   <input
//                     type="email"
//                     value={email}
//                     readOnly
//                     className="form-control mb-2"
//                   />

//                   <label style={{ fontSize: "14px" }}>Name:</label>
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     readOnly={!isEditing}
//                     className="form-control mb-3"
//                   />

//                   <button
//                     onClick={isEditing ? handleSave : handleEditToggle}
//                     className={`btn ${isEditing ? "btn-success" : "btn-primary"} w-100`}
//                   >
//                     {isEditing ? "Save" : "Edit & Change"}
//                   </button>

//                   <hr />
//                   <Dropdown.Item as={Link} to="/logout">
//                     Logout
//                   </Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown>
//             ) : (
//               <Nav.Link as={Link} to="/login" style={navLinkStyle}>
//                 Login 🔑
//               </Nav.Link>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// const navLinkStyle = {
//   color: "#FFF",
//   fontSize: "16px",
//   fontWeight: "500",
//   padding: "8px 15px",
//   borderRadius: "5px",
//   transition: "0.3s",
//   textDecoration: "none",
// };

// const dropdownStyle = {
//   backgroundColor: "transparent",
//   border: "none",
//   color: "#FFF",
//   fontSize: "16px",
//   fontWeight: "500",
//   padding: "8px 15px",
// };

// export default NavbarComponent;
//  import React, { useState, useEffect } from "react";
// import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
// import { Link } from "react-router-dom";

// const NavbarComponent = ({ isLoggedIn, username, handleLogout }) => {
//   const [name, setName] = useState("");

//   useEffect(() => {
//     const storedName = localStorage.getItem("username") || "";
//     setName(storedName);
//   }, []);

//   return (
//     <Navbar
//       expand="lg"
//       style={{
//         background: "linear-gradient(90deg, #1E1E2F, #3A3D98)",
//         color: "#fff",
//         padding: "10px 20px",
//       }}
//     >
//       <Container>
//         <Navbar.Brand
//           as={Link}
//           to="/"
//           style={{
//             color: "#00D4FF",
//             fontWeight: "bold",
//             fontSize: "20px",
//             letterSpacing: "1px",
//           }}
//         >
//           Zieers Business Proposal
//         </Navbar.Brand>

//         <Navbar.Toggle
//           aria-controls="basic-navbar-nav"
//           style={{ borderColor: "#00D4FF" }}
//         />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav
//             className="ms-auto"
//             style={{ display: "flex", alignItems: "center", gap: "15px" }}
//           >
//             <Nav.Link as={Link} to="/" style={navLinkStyle}>
//               Home
//             </Nav.Link>

//             {isLoggedIn && (
//               <Nav.Link as={Link} to="/projects" style={navLinkStyle}>
//                 Projects 📁
//               </Nav.Link>
//             )}

//             {isLoggedIn ? (
//               <Dropdown align="end">
//                 <Dropdown.Toggle variant="secondary" style={dropdownStyle}>
//                   👤 {name || username}
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu>
//                   <Dropdown.Item as={Link} to="/profile">
//                     Profile
//                   </Dropdown.Item>
//                   <Dropdown.Item as={Link} to="/logout">
//                     Logout
//                   </Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown>
//             ) : (
//               <Nav.Link as={Link} to="/login" style={navLinkStyle}>
//                 Login 🔑
//               </Nav.Link>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// const navLinkStyle = {
//   color: "#FFF",
//   fontSize: "16px",
//   fontWeight: "500",
//   padding: "8px 15px",
//   borderRadius: "5px",
//   transition: "0.3s",
//   textDecoration: "none",
// };

// const dropdownStyle = {
//   backgroundColor: "transparent",
//   border: "none",
//   color: "#FFF",
//   fontSize: "16px",
//   fontWeight: "500",
//   padding: "8px 15px",
// };

// export default NavbarComponent;

import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarComponent = ({ isLoggedIn, username, handleLogout }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("username") || "";
    setName(storedName);
  }, []);

  return (
    <Navbar
      expand="lg"
      style={{
        background: "#000",
        padding: "20px 30px",
      }}
    >
      <Container fluid>
        {/* LEFT CORNER TITLE */}
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            color: "#f2f2f2",
            fontWeight: "bold",
            fontSize: "36px",
            letterSpacing: "1px",
          }}
        >
          Zieers Business Proposal
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ borderColor: "#000" }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="ms-auto"
            style={{ display: "flex", alignItems: "center", gap: "15px" }}
          >
            <Nav.Link as={Link} to="/" style={navLinkStyle}>
              Home
            </Nav.Link>

            {isLoggedIn && (
              <Nav.Link as={Link} to="/projects" style={navLinkStyle}>
                Projects 
              </Nav.Link>
            )}

            {isLoggedIn ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" style={dropdownStyle}>
                  👤 {name || username}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile" style={{ fontWeight: "bold", color: "#000" }}>
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/logout" style={{ fontWeight: "bold", color: "#000" }}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link as={Link} to="/login" style={navLinkStyle}>
                Login 🔑
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// All links: bold + black
const navLinkStyle = {
  color: "#f2f2f2",
  fontSize: "25px",
  fontWeight: "bold",
  padding: "8px 15px",
  borderRadius: "5px",
  transition: "0.3s",
  textDecoration: "none",
};

// Dropdown button: bold + black
const dropdownStyle = {
  backgroundColor: "transparent",
  border: "1px solid #000",
  color: "#f2f2f2",
  fontSize: "25px",
  fontWeight: "bold",
  padding: "8px 15px",
};

export default NavbarComponent;
