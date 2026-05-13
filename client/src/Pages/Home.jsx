import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>

      <h1>Welcome to Zest AI</h1>

      {/* Google Login */}
      <h3>
        <a href="http://localhost:5000/auth/google">
          Continue with Google
        </a>
      </h3>

      {/* Email Login */}
      <h3>
        <Link to="/login">
          Continue with Email
        </Link>
      </h3>

      {/* Register */}
      <h3>
        <Link to="/register">
          Create Account
        </Link>
      </h3>

    </div>
  );
};

export default Home;