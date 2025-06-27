// // import React, { useState } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import { Container, Form, Button } from "react-bootstrap";
// // import axios from "axios";

// // const LoginPage = ({ setIsLoggedIn, setUsername }) => {
// //   const [formData, setFormData] = useState({ email: "", password: "" });
// //   const [message, setMessage] = useState("");
// //   const navigate = useNavigate();

// //   // Input change handler
// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   // Login submit handler
// //   const handleLogin = async (e) => {
// //     e.preventDefault();

// //     // Validate input
// //     if (!formData.email || !formData.password) {
// //       setMessage("All fields are required.");
// //       return;
// //     }

// //     try {
// //       const response = await axios.post(
// //         `${process.env.REACT_APP_API_URL}users.php`,
// //         {
// //           action: "login",
// //           email: formData.email,
// //           password: formData.password,
// //         },
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       // Debug: log response
// //       console.log("Login Response:", response.data);

// //       if (response.data.success) {
// //         setIsLoggedIn(true);
// //         setUsername(response.data.name);

// //         // Save to localStorage
// //         localStorage.setItem("username", response.data.name);
// //         localStorage.setItem("email", formData.email);

// //         alert(`Welcome, ${response.data.name}!`);
// //         navigate("/project");
// //       } else {
// //         setMessage(response.data.message || "Invalid email or password.");
// //       }
// //     } catch (error) {
// //       console.error("Login Error:", error.response?.data || error.message);
// //       setMessage(
// //         error.response?.data?.message || "Server error. Please try again."
// //       );
// //     }
// //   };

// //   return (
// //     <Container className="mt-4">
// //       <h2 className="text-center">Your Company Name</h2>

// //       {message && <p className="text-danger text-center">{message}</p>}

// //       <Form
// //         onSubmit={handleLogin}
// //         className="mx-auto"
// //         style={{ maxWidth: "400px" }}
// //       >
// //         <Form.Group className="mb-3">
// //           <Form.Label>Email</Form.Label>
// //           <Form.Control
// //             type="email"
// //             name="email"
// //             placeholder="Enter email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             required
// //           />
// //         </Form.Group>

// //         <Form.Group className="mb-3">
// //           <Form.Label>Password</Form.Label>
// //           <Form.Control
// //             type="password"
// //             name="password"
// //             placeholder="Enter password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             required
// //           />
// //         </Form.Group>

// //         <Button variant="primary" type="submit" className="w-100">
// //           Login
// //         </Button>
// //       </Form>

// //       <div className="text-center mt-3">
// //         <p>
// //           New User Registration?{" "}
// //           <Link to="/register" className="text-primary fw-bold">
// //             Register Here
// //           </Link>
// //         </p>
// //         <p>
// //           <Link to="/forgot-password" className="text-secondary">
// //             Forgot Password?
// //           </Link>
// //         </p>
// //       </div>
// //     </Container>
// //   );
// // };

// // export default LoginPage;
 
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Form, Button } from "react-bootstrap";
// import axios from "axios";
// import "./LoginPage.css";
// import bgImage from "../assets/image4.jpeg"; // ✅ React way to import image

// const LoginPage = ({ setIsLoggedIn, setUsername }) => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!formData.email || !formData.password) {
//       setMessage("All fields are required.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}users.php`,
//         {
//           action: "login",
//           email: formData.email,
//           password: formData.password,
//         },
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       if (response.data.success) {
//         setIsLoggedIn(true);
//         setUsername(response.data.name);
//         localStorage.setItem("username", response.data.name);
//         localStorage.setItem("email", formData.email);
//         alert(`Welcome, ${response.data.name}!`);
//         navigate("/project");
//       } else {
//         setMessage(response.data.message || "Invalid email or password.");
//       }
//     } catch (error) {
//       setMessage(
//         error.response?.data?.message || "Server error. Please try again."
//       );
//     }
//   };

//   return (
//     <div
//       className="login-page"
//       style={{
//         background: `url(${bgImage}) no-repeat center center fixed`,
//         backgroundSize: "cover",
//       }}
//     >
//       <div className="login-form-box">
//         <h2>Your Company Name</h2>

//         {message && <p className="text-danger text-center">{message}</p>}

//         <Form onSubmit={handleLogin}>
//           <Form.Group className="mb-3">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               name="email"
//               placeholder="Enter email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               name="password"
//               placeholder="Enter password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Button variant="primary" type="submit" className="w-100">
//             Login
//           </Button>
//         </Form>

//         <div className="text-center mt-3">
//           <p>
//             New User Registration?{" "}
//             <Link to="/register" className="text-primary fw-bold">
//               Register Here
//             </Link>
//           </p>
//           <p>
//             <Link to="/forgot-password" className="text-secondary">
//               Forgot Password?
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import FooterComponent from "../components/FooterComponent"; // ✅ Import footer
import "./LoginPage.css";
import bgImage from "../assets/image4.jpeg"; // ✅ Background image import

const LoginPage = ({ setIsLoggedIn, setUsername }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}users.php`,
        {
          action: "login",
          email: formData.email,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        setIsLoggedIn(true);
        setUsername(response.data.name);
        localStorage.setItem("username", response.data.name);
        localStorage.setItem("email", formData.email);
        alert(`Welcome, ${response.data.name}!`);
        navigate("/project");
      } else {
        setMessage(response.data.message || "Invalid email or password.");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Server error. Please try again."
      );
    }
  };

  return (
    <div>
      {/* Background wrapper with inline style */}
      <div className="login-footer-separator"></div>
      
      <div
        className="login-page"
        style={{
          background: `url(${bgImage}) no-repeat center center fixed`,
          backgroundSize: "cover",
        }}
      >
        <div className="login-form-box">
          <h2>Your Company Name</h2>

          {message && <p className="text-danger text-center">{message}</p>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>

          <div className="text-center mt-3">
            <p>
              New User Registration?{" "}
              <Link to="/register" className="text-primary fw-bold">
                Register Here
              </Link>
            </p>
            <p>
              <Link to="/forgot-password" className="text-secondary">
                Forgot Password?
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Footer below form */}
      <FooterComponent />
    </div>
  );
};

export default LoginPage;


