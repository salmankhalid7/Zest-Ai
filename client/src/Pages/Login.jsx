import React from "react";

const Login = () => {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Welcome</h1>
      <a href="http://localhost:5000/auth/google">Continue with Google</a>
    </div>
  );
};

export default Login;
