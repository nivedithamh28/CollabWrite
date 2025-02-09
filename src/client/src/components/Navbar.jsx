import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import DarkModeButton from "./DarkModeButton/DarkModeButton.jsx";
import { useSupplier } from "../context/supplierContext.jsx";

const Navbar = () => {
  // Retrieve authentication state and setter function from context
  const { auth, setAuth } = useAuth();

  // Retrieve dark mode state from supplier context
  const { darkMode } = useSupplier();

  // React Router's navigation function
  const navigate = useNavigate();

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem("auth"); // Remove auth data from local storage
    setAuth({ user: null, token: null }); // Reset authentication state
    navigate("/"); // Redirect to home page
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: darkMode ? "#222" : "#6CB4EE", // Change background based on dark mode
        transition: "background-color 0.3s ease-in-out", // Smooth transition effect
      }}
    >
      <div className="container-fluid">
        {/* Brand Name / Home Link */}
        <NavLink
          className={`navbar-brand fw-bold ${darkMode ? "text-light" : "text-dark"}`}
          to="/"
        >
          CollabWrite
        </NavLink>

        {/* Navbar Toggler for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {/* Check if user is logged in */}
            {auth.user ? (
              <>
                <li className="nav-item">
                  {/* Dark Mode Toggle Button (Smaller Size) */}
                  <DarkModeButton className="btn btn-sm" />
                </li>
                <li className="nav-item">
                  {/* Logout Button */}
                  <button className="btn btn-danger fw-bold btn-sm ms-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  {/* Dark Mode Toggle Button (Smaller Size) */}
                  <DarkModeButton className="btn btn-sm" />
                </li>
                <li className="nav-item">
                  {/* Login Link with Bold Text */}
                  <NavLink
                    className={`nav-link fw-bold ${darkMode ? "text-light" : "text-dark"}`}
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  {/* Register Link with Bold Text */}
                  <NavLink
                    className={`nav-link fw-bold ${darkMode ? "text-light" : "text-dark"}`}
                    to="/register"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
