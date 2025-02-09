import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="vh-100 vw-100 d-flex flex-column justify-content-center align-items-start"
      style={{
        backgroundImage: "url('/images/home.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "40px",
      }}
    >
      {/* ✅ Move text to the left */}
      <h1
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "4rem",
          fontWeight: "bold",
          color: "#073980",
          textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
          textAlign: "left",
        }}
      >
        Welcome to CollabWrite
      </h1>

      {/* ✅ Center buttons while keeping text left */}
      <div className="d-flex gap-3 mt-3">
        {/* Gradient Blue Button */}
        <Link
          to="/register"
          style={{
            background: "linear-gradient(45deg, #007bff, #0056b3)",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            fontWeight: "bold",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)",
            transition: "0.3s",
            textDecoration: "none",
          }}
        >
          Docs
        </Link>

        {/* Glassmorphism Button */}
        <button
          onClick={() => window.location.href = "http://localhost:3000/"}
          style={{
            background: "rgba(255, 255, 255, 0.3)",
            color: "#073980",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(0,0, 0, 1)",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "bold",
            transition: "0.3s",
          }}
        >
          ChatPDF
        </button>
      </div>
    </div>
  );
};

export default Home;
