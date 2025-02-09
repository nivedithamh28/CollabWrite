import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/auth/Login";
import PrivateRoutes from "./helpers/routes/PrivateRoutes";
import Register from "./pages/auth/Register";
import DocumentHome from "./pages/main/DocumentHome";
import EditDocument from "./pages/main/EditDocument";
import Home from "./components/Home";
import Navbar from "./components/Navbar"; // ✅ Navbar Imported

// ✅ Custom Layout to Control Navbar Visibility
const Layout = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/"; // ✅ Hide Navbar only on "/"

  return (
    <>
      {!hideNavbar && <Navbar />} {/* ✅ Conditional Navbar Rendering */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/home" element={<DocumentHome />} />
          <Route path="/edit/:id" element={<EditDocument />} />
        </Route>
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout /> {/* ✅ Use Layout for Conditional Navbar */}
    </Router>
  );
}

export default App;
