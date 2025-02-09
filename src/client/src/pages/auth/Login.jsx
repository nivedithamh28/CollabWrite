import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import { login } from "../../helpers/auth/auth.helper.js";
import { useSupplier } from "../../context/supplierContext";

const Login = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const { loading, setLoading, darkMode } = useSupplier();

  useEffect(() => {
    if (auth?.user) {
      navigate("/home");
    }
  }, [auth]);

  const [userCreds, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(userCreds).finally(() => setLoading(false));
    const { message, user, token, status } = result;

    if (status === 200) {
      setAuth({
        ...auth,
        user,
        token,
      });
      toast.success(message);
      navigate("/home");
      return;
    }

    toast.error(message);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "90vh",
        backgroundColor: darkMode ? "#1C1C1C" : "#f8f9fa",
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      <div
        className="p-5 shadow-lg rounded-4 w-100"
        style={{
          backgroundColor: darkMode ? "#3C3C3C" : "#ffffff",
          color: darkMode ? "#fff" : "#333",
          maxWidth: "420px",
          padding: "2rem",
          transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
        }}
      >
        <h2 className="text-center mb-4 fw-bold">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
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
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
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
              {loading ? "Logging In..." : "Login"}
            </button>
          </div>
        </form>
        <hr className="my-4" />
        <p className="text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-decoration-none fw-semibold"
            style={{ color: darkMode ? "#FFD700" : "#007bff" }}
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
