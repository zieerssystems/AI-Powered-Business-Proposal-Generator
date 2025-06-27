// // import React, { useState, useEffect } from "react";
// // import {
// //   BrowserRouter as Router,
// //   Routes,
// //   Route,
// //   Navigate,
// //   useLocation,
// // } from "react-router-dom";

// // import NavbarComponent from "./components/NavbarComponent";
// // import FooterComponent from "./components/FooterComponent";

// // import HomePage from "./HomePage";
// // import LoginPage from "./pages/LoginPage";
// // import Register from "./pages/Register";
// // import LogoutPage from "./pages/LogoutPage";
// // import ProjectManager from "./pages/ProjectManager";
// // import Profile from "./pages/Profile";
// // import ForgotPassword from "./pages/forgot-password"; // ✅ Added this import

// // // Inner app wrapper to use location
// // const AppWrapper = () => {
// //   const location = useLocation(); // to detect the current path

// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [username, setUsername] = useState("");

// //   useEffect(() => {
// //     const storedUsername = localStorage.getItem("username");
// //     if (storedUsername) {
// //       setIsLoggedIn(true);
// //       setUsername(storedUsername);
// //     }
// //   }, []);

// //   const handleLogout = () => {
// //     setIsLoggedIn(false);
// //     setUsername("");
// //     localStorage.removeItem("username");
// //   };

// //   return (
// //     <>
// //       <NavbarComponent
// //         isLoggedIn={isLoggedIn}
// //         username={username}
// //         handleLogout={handleLogout}
// //       />

// //       <Routes>
// //         <Route
// //           path="/"
// //           element={isLoggedIn ? <Navigate to="/projects" /> : <HomePage />}
// //         />
// //         <Route
// //           path="/login"
// //           element={
// //             isLoggedIn ? (
// //               <Navigate to="/projects" />
// //             ) : (
// //               <LoginPage
// //                 setIsLoggedIn={setIsLoggedIn}
// //                 setUsername={setUsername}
// //               />
// //             )
// //           }
// //         />
// //         <Route
// //           path="/register"
// //           element={isLoggedIn ? <Navigate to="/projects" /> : <Register />}
// //         />
// //         <Route path="/logout" element={<LogoutPage handleLogout={handleLogout} />} />
// //         <Route path="/projects" element={isLoggedIn ? <ProjectManager /> : <Navigate to="/login" />} />
// //         <Route path="/profile" element={<Profile />} />
// //         <Route path="/forgot-password" element={<ForgotPassword />} /> {/* ✅ NEW route */}
// //       </Routes>

// //       {/* ✅ Footer only if not on login or register pages */}
// //       {!["/login", "/register"].includes(location.pathname) && <FooterComponent />}
// //     </>
// //   );
// // };

// // // Main app with Router
// // const App = () => (
// //   <Router>
// //     <AppWrapper />
// //   </Router>
// // );

// // export default App;



// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
// } from "react-router-dom";

// import NavbarComponent from "./components/NavbarComponent";
// import FooterComponent from "./components/FooterComponent";

// import HomePage from "./HomePage";
// import LoginPage from "./pages/LoginPage";
// import Register from "./pages/Register";
// import LogoutPage from "./pages/LogoutPage";
// import ProjectManager from "./pages/ProjectManager";
// import Profile from "./pages/Profile";
// import ForgotPassword from "./pages/forgot-password"; // ✅ Password Reset Page
// import ChangePassword from "./pages/ChangePassword";

// // Inner app wrapper to use location
// const AppWrapper = () => {
//   const location = useLocation(); // detect current route

//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username");
//     if (storedUsername) {
//       setIsLoggedIn(true);
//       setUsername(storedUsername);
//     }
//   }, []);

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUsername("");
//     localStorage.removeItem("username");
//   };

//   // ✅ Show footer only on home page ('/')
//   const shouldShowFooter = location.pathname === "/";

//   return (
//     <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//       <NavbarComponent
//         isLoggedIn={isLoggedIn}
//         username={username}
//         handleLogout={handleLogout}
//       />

//       <main style={{ flex: "1 0 auto", paddingBottom: shouldShowFooter ? "40px" : "0" }}>
//         <Routes>
//           <Route
//             path="/"
//             element={isLoggedIn ? <Navigate to="/projects" /> : <HomePage />}
//           />
//           <Route
//             path="/login"
//             element={
//               isLoggedIn ? (
//                 <Navigate to="/projects" />
//               ) : (
//                 <LoginPage
//                   setIsLoggedIn={setIsLoggedIn}
//                   setUsername={setUsername}
//                 />
//               )
//             }
//           />
//           <Route
//             path="/register"
//             element={isLoggedIn ? <Navigate to="/projects" /> : <Register />}
//           />
//           <Route
//             path="/logout"
//             element={<LogoutPage handleLogout={handleLogout} />}
//           />
//           <Route
//             path="/projects"
//             element={isLoggedIn ? <ProjectManager /> : <Navigate to="/login" />}
//           />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/change-password" element={<ChangePassword />} />
//         </Routes>
        

//       </main>

//       {shouldShowFooter && (
//         <footer style={{ flexShrink: 0 }}>
//           <FooterComponent />
//         </footer>
//       )}
//     </div>
//   );
// };

// // Main App with Router
// const App = () => (
//   <Router>
//     <AppWrapper />
//   </Router>
// );

// export default App;

// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
// } from "react-router-dom";

// import NavbarComponent from "./components/NavbarComponent";
// import FooterComponent from "./components/FooterComponent";

// import HomePage from "./HomePage";
// import LoginPage from "./pages/LoginPage";
// import Register from "./pages/Register";
// import LogoutPage from "./pages/LogoutPage";
// import ProjectManager from "./pages/ProjectManager";
// import Profile from "./pages/Profile";
// import ForgotPassword from "./pages/forgot-password"; // ✅ Password Reset Page
// import CreateProposal from "./pages/CreateProposal"; // ✅ Import CreateProposal component

// // Inner app wrapper to use location
// const AppWrapper = () => {
//   const location = useLocation(); // detect current route

//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username");
//     if (storedUsername) {
//       setIsLoggedIn(true);
//       setUsername(storedUsername);
//     }
//   }, []);

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUsername("");
//     localStorage.removeItem("username");
//   };

//   // ✅ Show footer only on home page ('/')
//   const shouldShowFooter = location.pathname === "/";

//   return (
//     <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//       <NavbarComponent
//         isLoggedIn={isLoggedIn}
//         username={username}
//         handleLogout={handleLogout}
//       />

//       <main style={{ flex: "1 0 auto", paddingBottom: shouldShowFooter ? "40px" : "0" }}>
//         <Routes>
//           <Route
//             path="/"
//             element={isLoggedIn ? <Navigate to="/projects" /> : <HomePage />}
//           />
//           <Route
//             path="/login"
//             element={
//               isLoggedIn ? (
//                 <Navigate to="/projects" />
//               ) : (
//                 <LoginPage
//                   setIsLoggedIn={setIsLoggedIn}
//                   setUsername={setUsername}
//                 />
//               )
//             }
//           />
//           <Route
//             path="/register"
//             element={isLoggedIn ? <Navigate to="/projects" /> : <Register />}
//           />
//           <Route
//             path="/logout"
//             element={<LogoutPage handleLogout={handleLogout} />}
//           />
//           <Route
//             path="/projects"
//             element={isLoggedIn ? <ProjectManager /> : <Navigate to="/login" />}
//           />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
          

//           {/* ✅ NEW route for CreateProposal */}
//           <Route
//             path="/create-proposal/:projectId"
//             element={isLoggedIn ? <CreateProposal /> : <Navigate to="/login" />}
//           />
//         </Routes>


//       </main>

//       {shouldShowFooter && (
//         <footer style={{ flexShrink: 0 }}>
//           <FooterComponent />
//         </footer>
//       )}
//     </div>
//   );
// };

// // Main App with Router
// const App = () => (
//   <Router>
//     <AppWrapper />
//   </Router>
// );

// export default App;

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import NavbarComponent from './components/NavbarComponent';
// import FooterComponent from './components/FooterComponent';
// import HomePage from './HomePage';
// import LoginPage from './pages/LoginPage';
// import Register from './pages/Register';
// import LogoutPage from './pages/LogoutPage';
// import ProjectManager from './pages/ProjectManager';
// import Profile from './pages/Profile';
// import ForgotPassword from './pages/forgot-password'
// import CreateProposal from './pages/CreateProposal';

// const AppWrapper = () => {
//   const location = useLocation();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState('');

//   useEffect(() => {
//     const storedUsername = localStorage.getItem('username');
//     if (storedUsername) {
//       setIsLoggedIn(true);
//       setUsername(storedUsername);
//     }
//   }, []);

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUsername('');
//     localStorage.removeItem('username');
//   };

//   const shouldShowFooter = location.pathname === '/';

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//       <NavbarComponent
//         isLoggedIn={isLoggedIn}
//         username={username}
//         handleLogout={handleLogout}
//       />

//       <main style={{ flex: '1 0 auto', paddingBottom: shouldShowFooter ? '40px' : '0' }}>
//         <Routes>
//           <Route path="/" element={isLoggedIn ? <Navigate to="/projects" /> : <HomePage />} />
//           <Route path="/login" element={isLoggedIn ? <Navigate to="/projects" /> : <LoginPage />} />
//           <Route path="/register" element={isLoggedIn ? <Navigate to="/projects" /> : <Register />} />
//           <Route path="/logout" element={<LogoutPage handleLogout={handleLogout} />} />
//           <Route path="/projects" element={isLoggedIn ? <ProjectManager /> : <Navigate to="/login" />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/create-proposal/:projectId" element={isLoggedIn ? <CreateProposal /> : <Navigate to="/login" />} />
//         </Routes>
//       </main>

//       {shouldShowFooter && (
//         <footer style={{ flexShrink: 0 }}>
//           <FooterComponent />
//         </footer>
//       )}
//     </div>
//   );
// };

// const App = () => (
//   <Router>
//     <AppWrapper />
//   </Router>
// );

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';
import HomePage from './HomePage';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import LogoutPage from './pages/LogoutPage';
import ProjectManager from './pages/ProjectManager';
import Profile from './pages/Profile';
import ForgotPassword from './pages/forgot-password';
import CreateProposal from './pages/CreateProposal';



const AppWrapper = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // Check localStorage for existing session
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
  };

  const shouldShowFooter = location.pathname === '/';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavbarComponent
        isLoggedIn={isLoggedIn}
        username={username}
        handleLogout={handleLogout}
      />

      <main style={{ flex: '1 0 auto', paddingBottom: shouldShowFooter ? '40px' : '0' }}>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/projects" /> : <HomePage />}
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/projects" />
              ) : (
                <LoginPage
                  setIsLoggedIn={setIsLoggedIn}
                  setUsername={setUsername}
                />
              )
            }
          />
          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to="/projects" /> : <Register />}
          />
          <Route
            path="/logout"
            element={<LogoutPage handleLogout={handleLogout} />}
          />
          <Route
            path="/projects"
            element={isLoggedIn ? <ProjectManager /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/create-proposal/:projectId"
            element={isLoggedIn ? <CreateProposal /> : <Navigate to="/login" />}
          />
        </Routes>
        return (
    
      </main>

      {shouldShowFooter && (
        <footer style={{ flexShrink: 0 }}>
          <FooterComponent />
        </footer>
      )}
    </div>
  );
};

// Wrap with Router
const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;

