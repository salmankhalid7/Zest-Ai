import React from "react";

const Dashboard = () => {
  const handleLogout = () => {
    // Remove token
    localStorage.removeItem("token");

    // Remove user info
    localStorage.removeItem("user");

    // Logout backend session + redirect
    window.location.href = "http://localhost:5000/auth/logout";
  };
  return (
    <div>
      Dashboard
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
