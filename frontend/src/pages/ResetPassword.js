import React, { useState } from 'react';

const ResetPassword = ({ email }) => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('red');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!otp || !newPassword) {
      setMessage("Please fill in both OTP and new password.");
      setMessageColor("red");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch('http://localhost/Bussinessproposal/api/reset_password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          otp: otp,
          new_password: newPassword,    // <-- key matches backend
        }),
      });

      const result = await response.json();
      console.log("Reset Password Response:", result);

      if (result.success) {
        setMessage("Password reset successful. Redirecting to login...");
        setMessageColor("green");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setMessage(result.message || "Failed to reset password.");
        setMessageColor("red");
      }
    } catch (error) {
      console.error("Reset error:", error);
      setMessage("Server error. Try again later.");
      setMessageColor("red");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '20px auto' }}>
      <h4>Reset Password</h4>

      <div className="mb-3">
        <label className="form-label">OTP</label>
        <input
          type="text"
          placeholder="Enter OTP"
          className="form-control"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">New Password</label>
        <input
          type="password"
          placeholder="Enter New Password"
          className="form-control"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <button
        className="btn btn-success w-100"
        type="submit"
        disabled={loading}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>

      {message && (
        <p style={{ color: messageColor, marginTop: '10px' }}>
          {message}
        </p>
      )}
    </form>
  );
};

export default ResetPassword;
