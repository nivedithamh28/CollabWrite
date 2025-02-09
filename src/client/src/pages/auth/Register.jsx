import React, { useState, useEffect } from "react";
import { register } from "../../helpers/auth/auth.helper.js";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSupplier } from "../../context/supplierContext.jsx";

const Register = () => {
  const navigate = useNavigate();
  const { auth, loading, setLoading, darkMode } = useSupplier();

  const [userCreds, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  useEffect(() => {
    if (auth) {
      navigate("/home");
    }
  }, [auth]);

  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userCreds.username.length < 3) {
      toast.warning("Username must be at least 3 characters long");
      return;
    } else if (userCreds.password.length < 6) {
      toast.warning("Password must be at least 6 characters long");
      return;
    } else if (userCreds.username.length > 10) {
      toast.warning("Username must be less than 10 characters long");
      return;
    }

    setLoading(true);
    const result = await register(userCreds).finally(() => setLoading(false));
    if (result.status === 201) {
      toast.success(result.message);
      navigate("/");
    } else if (result.status === 400) {
      toast.warning(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center mt-5 p-4"
      style={{ 
        minHeight: "90vh", 
        backgroundColor: darkMode ? "#1C1C1C" : "#f4f4f4", // Darker background in dark mode
        transition: "background-color 0.3s ease-in-out"
      }}
    >
      <div
        className="p-5 shadow-lg rounded-4 w-100"
        style={{
          backgroundColor: darkMode ? "#3C3C3C" : "#ffffff",
          color: darkMode ? "#fff" : "#333",
          maxWidth: "420px",
          padding: "2rem",
          transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out"
        }}
      >
        <h2 className="text-center mb-4 fw-bold">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">Username</label>
            <input
              type="text"
              className="form-control rounded-3"
              id="username"
              value={userCreds.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control rounded-3"
              id="email"
              value={userCreds.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control rounded-3"
              id="password"
              value={userCreds.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="d-grid my-3">
            <button
              type="submit"
              disabled={loading}
              className={`btn btn-lg rounded-3 btn-${darkMode ? "light" : "primary"}`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        <hr className="my-4" />
        <p className="text-center">
          Already have an account? <Link to="/login" className="text-decoration-none fw-semibold" style={{ color: darkMode ? "#FFD700" : "#007bff" }}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
