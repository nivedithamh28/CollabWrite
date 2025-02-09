import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="text-center p-5 shadow rounded bg-light">
        <h1 className="mb-4">Welcome to Home</h1>
        <div className="d-flex gap-3">
          <Link to="/register" className="btn btn-primary">
            Docs
          </Link>
          <button className="btn btn-secondary">PDF Support</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
