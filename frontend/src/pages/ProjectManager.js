

// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ProjectManager = () => {
//   const [projects, setProjects] = useState([]);
//   const [formData, setFormData] = useState({
//     id: "",
//     title: "",
//     description: "",
//     clientName: "",
//     clientEmail: "",
//     projectCost: "",
//     currency: "USD",
//     projectSchedule: ""
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const navigate = useNavigate();
//   const loggedInEmail = localStorage.getItem("email");

//   const loadProjects = useCallback(async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}ProjectManager.php`, {
//         params: { email: loggedInEmail }
//       });
//       const userProjects = (response.data.projects || []).filter(p => p.email === loggedInEmail);
//       setProjects(userProjects);
//     } catch (error) {
//       console.error("Error loading projects:", error);
//     }
//   }, [loggedInEmail]);

//   useEffect(() => {
//     loadProjects();
//   }, [loadProjects]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     const { title, description } = formData;
//     if (!title.trim() || !description.trim()) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     const titleExists = projects.some(
//       (p) =>
//         p.title.trim().toLowerCase() === title.trim().toLowerCase() &&
//         (!isEditing || (isEditing && p.id !== formData.id))
//     );

//     if (titleExists) {
//       alert("Project name already exists. Use a different name.");
//       return;
//     }

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}project.php`, {
//         ...formData,
//         id: isEditing ? formData.id : undefined,
//         email: loggedInEmail
//       });

//       if (response.data.success) {
//         alert(isEditing ? "Project updated!" : "Project added!");
//         setFormData({
//           id: "",
//           title: "",
//           description: "",
//           clientName: "",
//           clientEmail: "",
//           projectCost: "",
//           currency: "USD",
//           projectSchedule: ""
//         });
//         setIsEditing(false);
//         loadProjects();
//       } else {
//         alert(response.data.message);
//       }
//     } catch (error) {
//       console.error("Error saving project:", error);
//     }
//   };

//   const handleEdit = (project) => {
//     setFormData({
//       id: project.id,
//       title: project.title,
//       description: project.description,
//       clientName: project.clientName || "",
//       clientEmail: project.clientEmail || "",
//       projectCost: project.projectCost || "",
//       currency: project.currency || "USD",
//       projectSchedule: project.projectSchedule || ""
//     });
//     setIsEditing(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this project?")) return;

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}ProjectManager.php`,
//         new URLSearchParams({ id }),
//         { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
//       );

//       if (response.data.success) {
//         alert("Project deleted successfully.");
//         loadProjects();
//       } else {
//         alert("Delete failed: " + response.data.message);
//       }
//     } catch (error) {
//       console.error("Error deleting project:", error);
//     }
//   };

//   const handleCancel = () => {
//     setFormData({
//       id: "",
//       title: "",
//       description: "",
//       clientName: "",
//       clientEmail: "",
//       projectCost: "",
//       currency: "USD",
//       projectSchedule: ""
//     });
//     setIsEditing(false);
//   };

//   const handleCreateProposal = (projectId) => {
//   const selectedProject = projects.find((p) => p.id === projectId);
//   navigate(`/create-proposal/${projectId}`, {
//     state: {
//       projectName: selectedProject.title,
//       requirements: selectedProject.description,
//       clientName: selectedProject.clientName || "",
//       clientEmail: selectedProject.clientEmail || "",
//       projectCost: selectedProject.projectCost || "",
//       currency: selectedProject.currency || "USD",
//       projectSchedule: selectedProject.projectSchedule || ""
//     }
//   });
// };

//   return (
//     <div style={{ width: "80%", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h2>Project Manager</h2>

//       {/* Form Section */}
//       <div style={{ background: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
//         <h3>Project Name:</h3>
//         <input type="text" name="title" value={formData.title} onChange={handleChange} required
//           style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

//         <h3>Project Requirements:</h3>
//         <textarea name="description" value={formData.description} onChange={handleChange} required
//           style={{ width: "100%", padding: "10px", height: "100px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

//         <h3>Client Name:</h3>
//         <input type="text" name="clientName" value={formData.clientName} onChange={handleChange}
//           style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

//         <h3>Client Email:</h3>
//         <input type="email" name="clientEmail" value={formData.clientEmail} onChange={handleChange}
//           style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

//         <h3>Project Cost:</h3>
//         <input type="number" name="projectCost" value={formData.projectCost} onChange={handleChange}
//           style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

//         <h3>Currency:</h3>
//         <select name="currency" value={formData.currency} onChange={handleChange}
//           style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc" }}>
//           <option value="USD">USD</option>
//           <option value="INR">INR</option>
//           <option value="EUR">EUR</option>
//         </select>

//         <h3>Project Schedule:</h3>
//         <input type="text" name="projectSchedule" value={formData.projectSchedule} onChange={handleChange}
//           style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

//         <div style={{ display: "flex", gap: "10px" }}>
//           <button onClick={handleSave}
//             style={{ flex: 1, background: "#007bff", color: "#fff", border: "none", borderRadius: "5px", padding: "10px", cursor: "pointer" }}>
//             {isEditing ? "Update" : "Add Project"}
//           </button>
//           <button onClick={handleCancel}
//             style={{ flex: 1, background: "#6c757d", color: "#fff", border: "none", borderRadius: "5px", padding: "10px", cursor: "pointer" }}>
//             Cancel
//           </button>
//         </div>
//       </div>

//       {/* Projects List */}
//       <h3 style={{ marginTop: "30px" }}>Saved Projects</h3>
//       <div style={{ background: "#f8f9fa", padding: "15px", borderRadius: "5px" }}>
//         {projects.length > 0 ? (
//           projects.map((project) => (
//             <div key={project.id} style={{ marginBottom: "15px", paddingBottom: "10px", borderBottom: "1px solid #ccc", display: "flex", justifyContent: "space-between" }}>
//               <div>
//                 <strong>{project.title}</strong> - {project.description}
//               </div>
//               <div>
//                 <button onClick={() => handleEdit(project)} style={{ marginRight: "10px", padding: "5px 10px", borderRadius: "5px", backgroundColor: "#ffc107", color: "black", border: "none" }}>Edit</button>
//                 <button onClick={() => handleDelete(project.id)} style={{ marginRight: "10px", padding: "5px 10px", borderRadius: "5px", backgroundColor: "#dc3545", color: "white", border: "none" }}>Delete</button>
//                 <button onClick={() => handleCreateProposal(project.id)} style={{ padding: "5px 10px", borderRadius: "5px", backgroundColor: "#28a745", color: "white", border: "none" }}>Create Proposal</button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No projects available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjectManager;



// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import FooterComponent from '../components/FooterComponent'; // ✅ Footer

// const ProjectManager = () => {
//   const [projects, setProjects] = useState([]);
//   const [formData, setFormData] = useState({
//     id: "",
//     title: "",
//     description: "",
//     clientName: "",
//     clientEmail: "",
//     projectCost: "",
//     currency: "USD",
//     projectSchedule: ""
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const navigate = useNavigate();
//   const loggedInEmail = localStorage.getItem("email");

//   const loadProjects = useCallback(async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}ProjectManager.php`, {
//         params: { email: loggedInEmail }
//       });
//       const userProjects = (response.data.projects || []).filter(p => p.email === loggedInEmail);
//       setProjects(userProjects);
//     } catch (error) {
//       console.error("Error loading projects:", error);
//     }
//   }, [loggedInEmail]);

//   useEffect(() => {
//     loadProjects();
//   }, [loadProjects]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     const { title, description } = formData;
//     if (!title.trim() || !description.trim()) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     const titleExists = projects.some(
//       (p) =>
//         p.title.trim().toLowerCase() === title.trim().toLowerCase() &&
//         (!isEditing || (isEditing && p.id !== formData.id))
//     );

//     if (titleExists) {
//       alert("Project name already exists. Use a different name.");
//       return;
//     }

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}project.php`, {
//         ...formData,
//         id: isEditing ? formData.id : undefined,
//         email: loggedInEmail
//       });

//       if (response.data.success) {
//         alert(isEditing ? "Project updated!" : "Project added!");
//         setFormData({
//           id: "",
//           title: "",
//           description: "",
//           clientName: "",
//           clientEmail: "",
//           projectCost: "",
//           currency: "USD",
//           projectSchedule: ""
//         });
//         setIsEditing(false);
//         loadProjects();
//       } else {
//         alert(response.data.message);
//       }
//     } catch (error) {
//       console.error("Error saving project:", error);
//     }
//   };

//   const handleEdit = (project) => {
//     setFormData({
//       id: project.id || "",
//       title: project.title || "",
//       description: project.description || "",
//       clientName: project.clientName || "",
//       clientEmail: project.clientEmail || "",
//       projectCost: project.projectCost || "",
//       currency: project.currency || "USD",
//       projectSchedule: project.projectSchedule || ""
//     });
//     setIsEditing(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this project?")) return;

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}ProjectManager.php`,
//         new URLSearchParams({ id }),
//         { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
//       );

//       if (response.data.success) {
//         alert("Project deleted successfully.");
//         loadProjects();
//       } else {
//         alert("Delete failed: " + response.data.message);
//       }
//     } catch (error) {
//       console.error("Error deleting project:", error);
//     }
//   };

//   const handleCancel = () => {
//     setFormData({
//       id: "",
//       title: "",
//       description: "",
//       clientName: "",
//       clientEmail: "",
//       projectCost: "",
//       currency: "USD",
//       projectSchedule: ""
//     });
//     setIsEditing(false);
//   };

//   const handleCreateProposal = (projectId) => {
//     const selectedProject = projects.find((p) => p.id === projectId);
//     navigate(`/create-proposal/${projectId}`, {
//       state: {
//         projectName: selectedProject.title,
//         requirements: selectedProject.description,
//         clientName: selectedProject.clientName || "",
//         clientEmail: selectedProject.clientEmail || "",
//         projectCost: selectedProject.projectCost || "",
//         currency: selectedProject.currency || "USD",
//         projectSchedule: selectedProject.projectSchedule || ""
//       }
//     });
//   };

//   return (
//     <>
//       <div style={{ width: "80%", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
//         <h2>Project Manager</h2>

//         <div style={{ background: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
//           {/* Form Inputs */}
//           <h3>Project Name:</h3>
//           <input type="text" name="title" value={formData.title} onChange={handleChange} required
//             style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

//           <h3>Project Requirements:</h3>
//           <textarea name="description" value={formData.description} onChange={handleChange} required
//             style={{ width: "100%", padding: "10px", height: "100px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

//           <h3>Client Name:</h3>
//           <input type="text" name="clientName" value={formData.clientName} onChange={handleChange}
//             style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

//           <h3>Client Email:</h3>
//           <input type="email" name="clientEmail" value={formData.clientEmail} onChange={handleChange}
//             style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

//           <h3>Project Cost:</h3>
//           <input type="number" name="projectCost" value={formData.projectCost} onChange={handleChange}
//             style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

//           <h3>Currency:</h3>
//           <select name="currency" value={formData.currency} onChange={handleChange}
//             style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc" }}>
//             <option value="USD">USD</option>
//             <option value="INR">INR</option>
//             <option value="EUR">EUR</option>
//           </select>

//           <h3>Project Schedule:</h3>
//           <input type="text" name="projectSchedule" value={formData.projectSchedule} onChange={handleChange}
//             style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

//           <div style={{ display: "flex", gap: "10px" }}>
//             <button onClick={handleSave}
//               style={{ flex: 1, background: "#007bff", color: "#fff", border: "none", borderRadius: "5px", padding: "10px", cursor: "pointer" }}>
//               {isEditing ? "Update" : "Add Project"}
//             </button>
//             <button onClick={handleCancel}
//               style={{ flex: 1, background: "#6c757d", color: "#fff", border: "none", borderRadius: "5px", padding: "10px", cursor: "pointer" }}>
//               Cancel
//             </button>
//           </div>
//         </div>

//         <h3 style={{ marginTop: "30px" }}>Saved Projects</h3>
//         <div style={{ background: "#f8f9fa", padding: "15px", borderRadius: "5px" }}>
//           {projects.length > 0 ? (
//             projects.map((project) => (
//               <div key={project.id} style={{ marginBottom: "15px", paddingBottom: "10px", borderBottom: "1px solid #ccc", display: "flex", justifyContent: "space-between" }}>
//                 <div>
//                   <strong>{project.title}</strong> - {project.description}
//                 </div>
//                 <div>
//                   <button onClick={() => handleEdit(project)} style={{ marginRight: "10px", padding: "5px 10px", borderRadius: "5px", backgroundColor: "#ffc107", color: "black", border: "none" }}>Edit</button>
//                   <button onClick={() => handleDelete(project.id)} style={{ marginRight: "10px", padding: "5px 10px", borderRadius: "5px", backgroundColor: "#dc3545", color: "white", border: "none" }}>Delete</button>
//                   <button onClick={() => handleCreateProposal(project.id)} style={{ padding: "5px 10px", borderRadius: "5px", backgroundColor: "#28a745", color: "white", border: "none" }}>Create Proposal</button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No projects available</p>
//           )}
//         </div>
//       </div>

//       {/* ✅ Footer */}
//       <FooterComponent />
//     </>
//   );
// };

// export default ProjectManager;

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FooterComponent from "../components/FooterComponent"; // ✅ Footer

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    clientName: "",
    clientEmail: "",
    projectCost: "",
    currency: "USD",
    projectSchedule: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const loggedInEmail = localStorage.getItem("email");

  const loadProjects = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}ProjectManager.php`, {
        params: { email: loggedInEmail }
      });
      const userProjects = (response.data.projects || []).filter(p => p.email === loggedInEmail);
      setProjects(userProjects);
    } catch (error) {
      console.error("Error loading projects:", error);
    }
  }, [loggedInEmail]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const { title, description } = formData;
    if (!title.trim() || !description.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    const titleExists = projects.some(
      (p) =>
        p.title.trim().toLowerCase() === title.trim().toLowerCase() &&
        (!isEditing || (isEditing && p.id !== formData.id))
    );

    if (titleExists) {
      alert("Project name already exists. Use a different name.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}project.php`, {
        ...formData,
        id: isEditing ? formData.id : undefined,
        email: loggedInEmail
      });

      if (response.data.success) {
        alert(isEditing ? "Project updated!" : "Project added!");
        setFormData({
          id: "",
          title: "",
          description: "",
          clientName: "",
          clientEmail: "",
          projectCost: "",
          currency: "USD",
          projectSchedule: ""
        });
        setIsEditing(false);
        loadProjects();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      id: project.id || "",
      title: project.title || "",
      description: project.description || "",
      clientName: project.clientName || "",
      clientEmail: project.clientEmail || "",
      projectCost: project.projectCost || "",
      currency: project.currency || "USD",
      projectSchedule: project.projectSchedule || ""
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}ProjectManager.php`,
        new URLSearchParams({ id }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      if (response.data.success) {
        alert("Project deleted successfully.");
        loadProjects();
      } else {
        alert("Delete failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      id: "",
      title: "",
      description: "",
      clientName: "",
      clientEmail: "",
      projectCost: "",
      currency: "USD",
      projectSchedule: ""
    });
    setIsEditing(false);
  };

  const handleCreateProposal = (projectId) => {
    const selectedProject = projects.find((p) => p.id === projectId);
    navigate(`/create-proposal/${projectId}`, {
      state: {
        projectName: selectedProject.title,
        requirements: selectedProject.description,
        clientName: selectedProject.clientName || "",
        clientEmail: selectedProject.clientEmail || "",
        projectCost: selectedProject.projectCost || "",
        currency: selectedProject.currency || "USD",
        projectSchedule: selectedProject.projectSchedule || ""
      }
    });
  };

  return (
    <div className="project-manager">
      <div style={{ width: "80%", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h2>Project Manager</h2>

        <div style={{ background: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
          <h3>Project Name:</h3>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required
            style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

          <h3>Project Requirements:</h3>
          <textarea name="description" value={formData.description} onChange={handleChange} required
            style={{ width: "100%", padding: "10px", height: "100px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

          <h3>Client Name:</h3>
          <input type="text" name="clientName" value={formData.clientName} onChange={handleChange}
            style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

          <h3>Client Email:</h3>
          <input type="email" name="clientEmail" value={formData.clientEmail} onChange={handleChange}
            style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

          <h3>Project Cost:</h3>
          <input type="number" name="projectCost" value={formData.projectCost} onChange={handleChange}
            style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

          <h3>Currency:</h3>
          <select name="currency" value={formData.currency} onChange={handleChange}
            style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc" }}>
            <option value="USD">USD</option>
            <option value="INR">INR</option>
            <option value="EUR">EUR</option>
          </select>

          <h3>Project Schedule:</h3>
          <input type="text" name="projectSchedule" value={formData.projectSchedule} onChange={handleChange}
            style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={handleSave}
              style={{ flex: 1, background: "#007bff", color: "#fff", border: "none", borderRadius: "5px", padding: "10px", cursor: "pointer" }}>
              {isEditing ? "Update" : "Add Project"}
            </button>
            <button onClick={handleCancel}
              style={{ flex: 1, background: "#6c757d", color: "#fff", border: "none", borderRadius: "5px", padding: "10px", cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        </div>

        <h3 style={{ marginTop: "30px" }}>Saved Projects</h3>
        <div style={{ background: "#f8f9fa", padding: "15px", borderRadius: "5px" }}>
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} style={{ marginBottom: "15px", paddingBottom: "10px", borderBottom: "1px solid #ccc", display: "flex", justifyContent: "space-between" }}>
                <div>
                  <strong>{project.title}</strong> - {project.description}
                </div>
                <div>
                  <button onClick={() => handleEdit(project)} style={{ marginRight: "10px", padding: "5px 10px", borderRadius: "5px", backgroundColor: "#ffc107", color: "black", border: "none" }}>Edit</button>
                  <button onClick={() => handleDelete(project.id)} style={{ marginRight: "10px", padding: "5px 10px", borderRadius: "5px", backgroundColor: "#dc3545", color: "white", border: "none" }}>Delete</button>
                  <button onClick={() => handleCreateProposal(project.id)} style={{ padding: "5px 10px", borderRadius: "5px", backgroundColor: "#28a745", color: "white", border: "none" }}>Create Proposal</button>
                </div>
              </div>
            ))
          ) : (
            <p>No projects available</p>
          )}
        </div>
      </div>

      {/* ✅ Footer */}
      <FooterComponent />
    </div>
  );
};

export default ProjectManager;


