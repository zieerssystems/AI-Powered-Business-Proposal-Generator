import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = ({ handleLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();  // ✅ Logout user
    setTimeout(() => {
      navigate("/"); // ✅ Redirect to homepage
    }, 1500);
  }, [handleLogout, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Logging out... 🚪</h2>
      <p>You will be redirected shortly.</p>
    </div>
  );
};

export default LogoutPage;
