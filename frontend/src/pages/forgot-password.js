// import React, { useState } from 'react';
// import ResetPassword from './ResetPassword';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [message, setMessage] = useState('');
//   const [messageColor, setMessageColor] = useState('red');

//   const sendOtp = async (userEmail) => {
//     try {
//       const response = await fetch(`http://localhost/Bussinessproposal/api/send_otp.php`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email: userEmail }),
//       });

//       const result = await response.json();
//       console.log("Sending OTP to:", userEmail);


//       if (result.success) {
//         setMessage("OTP sent successfully to " + userEmail);
//         setMessageColor('green');
//         setOtpSent(true);
//       } else {
//         setMessage(result.message || "Error sending OTP");
//         setMessageColor('red');
//       }
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       setMessage("Server error. Please try again.");
//       setMessageColor('red');
//     }
//   };

//   const handleSendOtp = () => {
//     if (!email) {
//       setMessage("Please enter your email");
//       setMessageColor('red');
//       return;
//     }

//     sendOtp(email);
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
//       <h2>Forgot Password</h2>

//       {message && <p style={{ color: messageColor }}>{message}</p>}

//       {!otpSent && (
//         <>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             className="form-control mb-3"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <button className="btn btn-primary w-100" onClick={handleSendOtp}>
//             Send OTP
//           </button>
//         </>
//       )}

//       {otpSent && <ResetPassword email={email} />}
//     </div>
//   );
// };

// export default ForgotPassword;

import React, { useState } from 'react';
import ResetPassword from './ResetPassword';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('red');

  const sendOtp = async () => {
    if (!email) {
      setMessage("Please enter your email");
      setMessageColor('red');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}send_otp.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      console.log("OTP Response:", result);

      if (result.success) {
        setMessage("OTP sent successfully");
        setMessageColor("green");
        setOtpSent(true);
      } else {
        setMessage(result.message || "Failed to send OTP");
        setMessageColor("red");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("Server error. Please try again.");
      setMessageColor("red");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Forgot Password</h2>
      {message && <p style={{ color: messageColor }}>{message}</p>}

      {!otpSent ? (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            className="form-control mb-3"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-primary w-100" onClick={sendOtp}>
            Send OTP
          </button>
        </>
      ) : (
        <ResetPassword email={email} />
      )}
    </div>
  );
};

export default ForgotPassword;
