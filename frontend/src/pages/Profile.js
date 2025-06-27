// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Add this

// const Profile = () => {
//   const [name, setName] = useState(""); // Name first
//   const [email, setEmail] = useState(""); // Email second
//   const [isEditing, setIsEditing] = useState(false);

//   const navigate = useNavigate(); // Hook to navigate

//   useEffect(() => {
//     const storedName = localStorage.getItem("username") || "";
//     const storedEmail = localStorage.getItem("email") || "";
//     setName(storedName);
//     setEmail(storedEmail);
//   }, []);

//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleSave = () => {
//     localStorage.setItem("username", name); // Save updated name to localStorage
//     setIsEditing(false);
//     alert("Profile updated!");
//   };

//   const handleChangePassword = () => {
//     navigate("/change-password"); // Navigate to the change password page
//   };

//   return (
//     <div
//       style={{
//         maxWidth: "500px",
//         margin: "40px auto",
//         padding: "20px",
//         border: "1px solid #ddd",
//         borderRadius: "10px",
//         background: "#fff",
//       }}
//     >
//       <h2>Profile</h2>

//       <div style={{ marginBottom: "15px" }}>
//         <label>Name:</label>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           readOnly={!isEditing}
//           style={{
//             width: "100%",
//             padding: "8px",
//             borderRadius: "5px",
//             border: "1px solid #ccc",
//           }}
//         />
//       </div>

//       <div style={{ marginBottom: "15px" }}>
//         <label>Email:</label>
//         <input
//           type="email"
//           value={email}
//           readOnly
//           style={{
//             width: "100%",
//             padding: "8px",
//             borderRadius: "5px",
//             border: "1px solid #ccc",
//           }}
//         />
//       </div>

//       <div className="d-flex justify-content-between">
//         <button
//           onClick={isEditing ? handleSave : handleEditToggle}
//           style={{
//             padding: "10px 20px",
//             backgroundColor: isEditing ? "#28a745" : "#007bff",
//             color: "#fff",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           {isEditing ? "Save" : "Edit & Change"}
//         </button>

//         <button
//           onClick={handleChangePassword} // use navigate here
//           style={{
//             padding: "10px 20px",
//             backgroundColor: "#ffc107",
//             color: "#000",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Change Password
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from "react";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("username") || "";
    const storedEmail = localStorage.getItem("email") || "";
    setName(storedName);
    setEmail(storedEmail);
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    localStorage.setItem("username", name);
    setIsEditing(false);
    alert("Profile updated!");
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        background: "#fff",
      }}
    >
      <h2>Profile</h2>

      <div style={{ marginBottom: "15px" }}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          readOnly={!isEditing}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          readOnly
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div className="d-flex justify-content-end">
        <button
          onClick={isEditing ? handleSave : handleEditToggle}
          style={{
            padding: "10px 20px",
            backgroundColor: isEditing ? "#28a745" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isEditing ? "Save" : "Edit & Change"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
