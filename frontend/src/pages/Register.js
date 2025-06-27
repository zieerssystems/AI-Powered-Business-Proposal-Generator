// import React, { useState } from "react";
// import { Form, Button, Container, Card, Alert } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import FooterComponent from '../components/FooterComponent'; // Adjust path if needed

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     reEnterPassword: "",
//   });
//   const [message, setMessage] = useState("");
//   const [variant, setVariant] = useState("danger");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     // Basic validation
//     if (!formData.fullName || !formData.email || !formData.password || !formData.reEnterPassword) {
//       setVariant("danger");
//       setMessage("All fields are required.");
//       return;
//     }
//     if (formData.password !== formData.reEnterPassword) {
//       setVariant("danger");
//       setMessage("Passwords do not match.");
//       return;
//     }

//     const url = "http://localhost/Bussinessproposal/api/users.php"
// ;
//     console.log("Registering via:", url, "payload:", {
//       action: "register",
//       fullName: formData.fullName,
//       email: formData.email,
//       password: formData.password,
//     });

//     try {
//       const response = await axios.post(
//         url,
//         {
//           action: "register",
//           fullName: formData.fullName,
//           email: formData.email,
//           password: formData.password,
//         },
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       console.log("Response from users.php:", response.data);

//       if (response.data.success) {
//         setVariant("success");
//         setMessage("Registration successful! Redirecting to login...");
//         setTimeout(() => navigate("/login"), 2000);
//       } else {
//         setVariant("danger");
//         setMessage(response.data.message || "Registration failed.");
//       }
//     } catch (error) {
//       console.error("Axios error:", error.response || error.message);
//       setVariant("danger");
//       // If backend returned JSON error message:
//       if (error.response?.data?.message) {
//         setMessage(error.response.data.message);
//       } else {
//         setMessage("Error connecting to the server.");
//       }
//     }
//   };

//   return (
//     <Container className="my-5">
//       <div className="d-flex justify-content-center">
//         <Card className="p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
//           <h2 className="text-center mb-4 text-success fw-bold">Register</h2>

//           {message && <Alert variant={variant}>{message}</Alert>}

//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3">
//               <Form.Label>Full Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 placeholder="Enter full name"
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Email Address</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter email"
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Enter password"
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Re-enter Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 name="reEnterPassword"
//                 value={formData.reEnterPassword}
//                 onChange={handleChange}
//                 placeholder="Re-enter password"
//               />
//             </Form.Group>

//             <Button variant="success" type="submit" className="w-100">
//               Register
//             </Button>
//           </Form>
//           return (
//   <div>
//     {/* ... Your form and content */}
//     <FooterComponent />
//   </div>
// );


//           <div className="text-center mt-3">
//             <p>
//               Already have an account? <Link to="/login">Login here</Link>
//             </p>
//           </div>
//         </Card>
//       </div>
//     </Container>
    
//   );
// };

// export default Register;

import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FooterComponent from '../components/FooterComponent'; // ✅ Import

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("danger");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!formData.fullName || !formData.email || !formData.password || !formData.reEnterPassword) {
      setVariant("danger");
      setMessage("All fields are required.");
      return;
    }
    if (formData.password !== formData.reEnterPassword) {
      setVariant("danger");
      setMessage("Passwords do not match.");
      return;
    }

    const url = "http://localhost/Bussinessproposal/api/users.php";

    try {
      const response = await axios.post(
        url,
        {
          action: "register",
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        setVariant("success");
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setVariant("danger");
        setMessage(response.data.message || "Registration failed.");
      }
    } catch (error) {
      setVariant("danger");
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error connecting to the server.");
      }
    }
  };

  return (
    <>
      <Container className="my-5">
        <div className="d-flex justify-content-center">
          <Card className="p-4 shadow" style={{ maxWidth: "450px", width: "100%" }}>
            <h2 className="text-center mb-4 text-success fw-bold">Register</h2>

            {message && <Alert variant={variant}>{message}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Re-enter Password</Form.Label>
                <Form.Control
                  type="password"
                  name="reEnterPassword"
                  value={formData.reEnterPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100">
                Register
              </Button>
            </Form>

            <div className="text-center mt-3">
              <p>
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </div>
          </Card>
        </div>
      </Container>

      {/* ✅ Add footer at the bottom */}
      <FooterComponent />
    </>
  );
};

export default Register;
