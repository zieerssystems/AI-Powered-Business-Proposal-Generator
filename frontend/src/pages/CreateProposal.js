// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import jsPDF from "jspdf";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './CreateProposal.css';
// import FooterComponent from "../components/FooterComponent"; // ✅ Footer

// const CreateProposal = () => {
//   const location = useLocation();
//   console.log("location.state", location.state);

//   const {
//     projectName: initialProjectName = "",
//     requirements: initialRequirements = "",
//     clientName: initialClientName = "",
//     clientEmail: initialClientEmail = "",
//     projectCost: initialProjectCost = "",
//     currency: initialCurrency = "USD",
//     projectSchedule: initialProjectSchedule = ""
//   } = location.state || {};

//   const [projectName, setProjectName] = useState(initialProjectName);
//   const [requirements, setRequirements] = useState(initialRequirements);
//   const [clientName, setClientName] = useState(initialClientName);
//   const [clientEmail, setClientEmail] = useState(initialClientEmail);
//   const [projectCost, setProjectCost] = useState(initialProjectCost);
//   const [currency, setCurrency] = useState(initialCurrency);
//   const [projectSchedule, setProjectSchedule] = useState(initialProjectSchedule);
//   const [proposal, setProposal] = useState("");

//   const handleCreateProposal = async () => {
//     try {
//       const apiKey = "AIzaSyBgF8MSv_-m9gTxfYDyIq6Z07nlM4JrJZU";
//       const modelName = "gemini-1.5-flash";
//       const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

//       const fullPrompt = `Generate a formal project proposal with the following details:
// Client Name: ${clientName}
// Project Name: ${projectName}
// Requirements: ${requirements}
// Project Schedule: ${projectSchedule}
// Project Cost: ${projectCost} ${currency}
// The proposal must include the following sections as bold plain text headings (not using asterisks **). Return them in this format (no markdown or symbols):

// 1. Introduction  
// 2. Requirements  
// 3. Objective  
// 4. Deliverables  
// 5. Cost  
// 6. Schedule  
// 7. Conclusion

// Each section heading should be clearly labeled and in bold, followed by the corresponding content in normal text. Do not use markdown symbols like *, **, or #. Return it as plain text with structured formatting.`;

//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           contents: [{ parts: [{ text: fullPrompt }] }]
//         })
//       });

//       const data = await response.json();
//       const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

//       if (generatedText) {
//         setProposal(generatedText);
//       } else {
//         alert("Failed to generate proposal. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error generating proposal:", error);
//       alert("An error occurred while generating the proposal.");
//     }
//   };

//   const handleDownloadPDF = () => {
//     if (!proposal) {
//       alert("No proposal to download.");
//       return;
//     }

//     const doc = new jsPDF({
//       orientation: "portrait",
//       unit: "pt",
//       format: "a3",
//     });

//     doc.setFont("times", "");
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const marginX = 50;
//     const contentWidth = pageWidth - 2 * marginX;
//     let y = 60;

//     doc.setFontSize(24);
//     doc.setFont(undefined, "bold");
//     const title = `Project Proposal: ${clientName}`;
//     doc.text(title, (pageWidth - doc.getTextWidth(title)) / 2, y);
//     y += 35;

//     doc.setFontSize(16);
//     doc.setFont(undefined, "bold");
//     doc.text("Prepared for:", marginX, y);
//     doc.setFont(undefined, "normal");
//     doc.text(clientName, marginX + 130, y);
//     y += 22;

//     doc.setFont(undefined, "bold");
//     doc.text("Prepared by:", marginX, y);
//     doc.setFont(undefined, "normal");
//     doc.text("Zieers", marginX + 130, y);
//     y += 22;

//     const today = new Date().toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//     doc.setFont(undefined, "bold");
//     doc.text("Date:", marginX, y);
//     doc.setFont(undefined, "normal");
//     doc.text(today, marginX + 130, y);
//     y += 40;

//     const renderSection = (heading, content) => {
//       doc.setFontSize(18);
//       doc.setFont(undefined, "bold");
//       doc.text(heading, marginX, y);
//       y += 25;

//       doc.setFontSize(14);
//       doc.setFont(undefined, "normal");
//       const lines = doc.splitTextToSize(content, contentWidth);
//       doc.text(lines, marginX, y);
//       y += lines.length * 18 + 20;
//     };

//     const sections = [
//       {
//         title: "1. Introduction",
//         content: `This proposal outlines a project plan for "${projectName}". It aims to address the client's requirements related to the project scope, objectives, deliverables, and timeline.`,
//       },
//       {
//         title: "2. Proposal Details",
//         content: proposal,
//       },
//     ];

//     sections.forEach(section => renderSection(section.title, section.content));
//     doc.save(`${projectName}_Proposal.pdf`);
//   };

//   const handleSendPdfEmail = async () => {
//     if (!clientEmail || !proposal) {
//       alert("Please enter the email and generate the proposal.");
//       return;
//     }

//     const doc = new jsPDF();
//     doc.setFontSize(30);
//     const lines = doc.splitTextToSize(proposal, 500);
//     doc.text(lines, 20, 40);

//     const pdfBase64 = doc.output('datauristring');

//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_URL}send_proposal_email.php`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: clientEmail,
//           subject: `${projectName} - Project Proposal`,
//           message: "Please find the attached project proposal PDF.",
//           attachment: pdfBase64,
//           filename: `${projectName}_Proposal.pdf`,
//         }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         alert("Email with PDF sent successfully!");
//       } else {
//         alert("Failed to send email: " + data.message);
//       }
//     } catch (err) {
//       console.error("Email send error:", err);
//       alert("An error occurred while sending the email.");
//     }
//   };

//   return (
//     <div className="create-proposal-page">
//       <div className="container my-5">
//         <div className="card shadow p-4 bg-light rounded">
//           <h2 className="text-center text-primary mb-4">Create Proposal</h2>

//           <div className="mb-3">
//             <label className="form-label fw-bold">Client Name:</label>
//             <input
//               type="text"
//               className="form-control"
//               value={clientName}
//               onChange={(e) => setClientName(e.target.value)}
//               placeholder="Enter client name"
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label fw-bold">Client Email:</label>
//             <input
//               type="email"
//               className="form-control"
//               value={clientEmail}
//               onChange={(e) => setClientEmail(e.target.value)}
//               placeholder="Enter client email"
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label fw-bold">Project Name:</label>
//             <input
//               type="text"
//               className="form-control"
//               value={projectName}
//               onChange={(e) => setProjectName(e.target.value)}
//               placeholder="Enter project name"
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label fw-bold">Requirements:</label>
//             <textarea
//               className="form-control"
//               value={requirements}
//               onChange={(e) => setRequirements(e.target.value)}
//               rows={4}
//               placeholder="Enter project requirements"
//             ></textarea>
//           </div>

//           <div className="mb-3">
//             <label className="form-label fw-bold">Project Schedule:</label>
//             <input
//               type="text"
//               className="form-control"
//               value={projectSchedule}
//               onChange={(e) => setProjectSchedule(e.target.value)}
//               placeholder="E.g. 2 months, Q3 2025, etc."
//             />
//           </div>

//           <div className="row mb-4">
//             <div className="col-md-6">
//               <label className="form-label fw-bold">Project Cost:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={projectCost}
//                 onChange={(e) => setProjectCost(e.target.value)}
//                 placeholder="Enter project cost"
//               />
//             </div>

//             <div className="col-md-6">
//               <label className="form-label fw-bold">Currency:</label>
//               <select
//                 className="form-control"
//                 value={currency}
//                 onChange={(e) => setCurrency(e.target.value)}
//               >
//                 <option value="USD">USD - US Dollar</option>
//                 <option value="EUR">EUR - Euro</option>
//                 <option value="INR">INR - Indian Rupee</option>
//                 <option value="GBP">GBP - British Pound</option>
//                 <option value="CAD">CAD - Canadian Dollar</option>
//                 <option value="AUD">AUD - Australian Dollar</option>
//               </select>
//             </div>
//           </div>

//           <div className="d-flex justify-content-center gap-3 mb-4">
//             <button className="btn btn-primary px-4" onClick={handleCreateProposal}>
//               Generate Proposal
//             </button>
//             <button className="btn btn-warning text-dark px-4" onClick={handleSendPdfEmail}>
//               Send Email
//             </button>
//           </div>

//           {proposal && (
//             <div className="p-4 border rounded bg-white">
//               <h4 className="text-center text-success mb-3">Generated Proposal</h4>
//               <ul className="list-group">
//                 {proposal.split("\n").map((line, index) =>
//                   line.trim() && (
//                     <li key={index} className="list-group-item">
//                       {line}
//                     </li>
//                   )
//                 )}
//               </ul>
//             </div>
//           )}

//           <div className="text-center mt-4">
//             <button className="btn btn-success px-5" onClick={handleDownloadPDF}>
//               Extract PDF
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Footer added here */}
//       <FooterComponent />
//     </div>
//   );
// };

// export default CreateProposal;


import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreateProposal.css';
import FooterComponent from "../components/FooterComponent"; // ✅ Footer

const CreateProposal = () => {
  const location = useLocation();
  console.log("location.state", location.state);

  const {
    projectName: initialProjectName = "",
    requirements: initialRequirements = "",
    clientName: initialClientName = "",
    clientEmail: initialClientEmail = "",
    projectCost: initialProjectCost = "",
    currency: initialCurrency = "USD",
    projectSchedule: initialProjectSchedule = ""
  } = location.state || {};

  const [projectName, setProjectName] = useState(initialProjectName);
  const [requirements, setRequirements] = useState(initialRequirements);
  const [clientName, setClientName] = useState(initialClientName);
  const [clientEmail, setClientEmail] = useState(initialClientEmail);
  const [projectCost, setProjectCost] = useState(initialProjectCost);
  const [currency, setCurrency] = useState(initialCurrency);
  const [projectSchedule, setProjectSchedule] = useState(initialProjectSchedule);
  const [proposal, setProposal] = useState("");

  const handleCreateProposal = async () => {
    try {
      const apiKey = "AIzaSyBgF8MSv_-m9gTxfYDyIq6Z07nlM4JrJZU";
      const modelName = "gemini-1.5-flash";
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

      const fullPrompt = `Generate a formal project proposal with the following details:
Client Name: ${clientName}
Project Name: ${projectName}
Requirements: ${requirements}
Project Schedule: ${projectSchedule}
Project Cost: ${projectCost} ${currency}
The proposal must include the following sections as bold plain text headings (not using asterisks **). Return them in this format (no markdown or symbols):

1. Introduction  
2. Requirements  
3. Objective  
4. Deliverables  
5. Cost  
6. Schedule  
7. Conclusion

Each section heading should be clearly labeled and in bold, followed by the corresponding content in normal text. Do not use markdown symbols like *, **, or #. Return it as plain text with structured formatting.`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }]
        })
      });

      const data = await response.json();
      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (generatedText) {
        setProposal(generatedText);
      } else {
        alert("Failed to generate proposal. Please try again.");
      }
    } catch (error) {
      console.error("Error generating proposal:", error);
      alert("An error occurred while generating the proposal.");
    }
  };

  const handleDownloadPDF = () => {
    if (!proposal) {
      alert("No proposal to download.");
      return;
    }

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a3",
    });

    doc.setFont("times", "");
    const pageWidth = doc.internal.pageSize.getWidth();
    const marginX = 50;
    const contentWidth = pageWidth - 2 * marginX;
    let y = 60;

    doc.setFontSize(24);
    doc.setFont(undefined, "bold");
    const title = `Project Proposal: ${clientName}`;
    doc.text(title, (pageWidth - doc.getTextWidth(title)) / 2, y);
    y += 35;

    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.text("Prepared for:", marginX, y);
    doc.setFont(undefined, "normal");
    doc.text(clientName, marginX + 130, y);
    y += 22;

    doc.setFont(undefined, "bold");
    doc.text("Prepared by:", marginX, y);
    doc.setFont(undefined, "normal");
    doc.text("Zieers", marginX + 130, y);
    y += 22;

    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    doc.setFont(undefined, "bold");
    doc.text("Date:", marginX, y);
    doc.setFont(undefined, "normal");
    doc.text(today, marginX + 130, y);
    y += 40;

    const renderSection = (heading, content) => {
      doc.setFontSize(18);
      doc.setFont(undefined, "bold");
      doc.text(heading, marginX, y);
      y += 25;

      doc.setFontSize(14);
      doc.setFont(undefined, "normal");
      const lines = doc.splitTextToSize(content, contentWidth);
      doc.text(lines, marginX, y);
      y += lines.length * 18 + 20;
    };

    const sections = [
      {
        title: "1. Introduction",
        content: `This proposal outlines a project plan for "${projectName}". It aims to address the client's requirements related to the project scope, objectives, deliverables, and timeline.`,
      },
      {
        title: "2. Proposal Details",
        content: proposal,
      },
    ];

    sections.forEach(section => renderSection(section.title, section.content));
    doc.save(`${projectName}_Proposal.pdf`);
  };

  const handleSendPdfEmail = async () => {
    if (!clientEmail || !proposal) {
      alert("Please enter the email and generate the proposal.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(30);
    const lines = doc.splitTextToSize(proposal, 500);
    doc.text(lines, 20, 40);

const pdfBase64 = doc.output('datauristring').replace(/^data:application\/pdf;filename=generated.pdf;base64,/, "");


    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}send_proposal_email.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: clientEmail,
          subject: `${projectName} - Project Proposal`,
          message: "Please find the attached project proposal PDF.",
          attachment: pdfBase64,
          filename: `${projectName}_Proposal.pdf`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Email with PDF sent successfully!");
      } else {
        alert("Failed to send email: " + data.message);
      }
    } catch (err) {
      console.error("Email send error:", err);
      alert("An error occurred while sending the email.");
    }
  };

  return (
    <div className="create-proposal-page">
      <div className="container my-5">
        <div className="card shadow p-4 bg-light rounded">
          <h2 className="text-center text-primary mb-4">Create Proposal</h2>

          <div className="mb-3">
            <label className="form-label fw-bold">Client Name:</label>
            <input
              type="text"
              className="form-control"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Enter client name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Client Email:</label>
            <input
              type="email"
              className="form-control"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="Enter client email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Project Name:</label>
            <input
              type="text"
              className="form-control"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Requirements:</label>
            <textarea
              className="form-control"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              rows={4}
              placeholder="Enter project requirements"
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Project Schedule:</label>
            <input
              type="text"
              className="form-control"
              value={projectSchedule}
              onChange={(e) => setProjectSchedule(e.target.value)}
              placeholder="E.g. 2 months, Q3 2025, etc."
            />
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label fw-bold">Project Cost:</label>
              <input
                type="text"
                className="form-control"
                value={projectCost}
                onChange={(e) => setProjectCost(e.target.value)}
                placeholder="Enter project cost"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">Currency:</label>
              <select
                className="form-control"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="AUD">AUD - Australian Dollar</option>
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-center gap-3 mb-4">
            <button className="btn btn-primary px-4" onClick={handleCreateProposal}>
              Generate Proposal
            </button>
            <button className="btn btn-warning text-dark px-4" onClick={handleSendPdfEmail}>
              Send Email
            </button>
          </div>

          {proposal && (
            <div className="p-4 border rounded bg-white">
              <h4 className="text-center text-success mb-3">Generated Proposal</h4>
              <ul className="list-group">
                {proposal.split("\n").map((line, index) =>
                  line.trim() && (
                    <li key={index} className="list-group-item">
                      {line}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          <div className="text-center mt-4">
            <button className="btn btn-success px-5" onClick={handleDownloadPDF}>
              Extract PDF
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Footer added here */}
      <FooterComponent />
    </div>
  );
};

export default CreateProposal;






