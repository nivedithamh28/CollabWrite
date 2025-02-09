import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import {
  createNewDoc,
  deleteTheDoc,
  getAllLoggedInUserDocs,
} from "../../helpers/docs/doc.helper";
import { toast } from "react-toastify";
import { useSupplier } from "../../context/supplierContext";
import { useNavigate } from "react-router-dom";

const DocumentHome = () => {
  const { auth, logout } = useAuth(); // Added logout function
  const { loading, setLoading, shouldUpdate, triggerUpdate } = useSupplier();
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      toast.error("Please Login to continue");
      navigate("/");
    }
  }, [auth]);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (auth?.token) {
        const response = await getAllLoggedInUserDocs(auth.token);
        if (response.status === 200) {
          setData(response.data.documents);
        } else {
          toast.error(response.message);
        }
      }
    };
    fetchDocuments();
  }, [auth?.token, shouldUpdate]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await createNewDoc(title, auth.token).finally(() =>
      setLoading(false)
    );
    if (response.status === 201) {
      setTitle("");
      toast.success("Document Created Successfully");
      document.getElementById("closeTheModal").click();
      triggerUpdate();
    } else {
      toast.error(response.message);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const response = await deleteTheDoc(id, auth.token).finally(() =>
      setLoading(false)
    );
    if (response.status === 200) {
      toast.success("Document deleted successfully");
      triggerUpdate();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center position-relative"
      style={{
        background: "linear-gradient(135deg,rgb(130, 149, 234),rgb(204, 162, 246))",
        color: "white",
      }}
    >

      <div className="container py-5 text-center">
        <h1 className="display-4 fw-bold" style={{ color: "black" }}>Welcome {auth?.user?.username} 👋</h1>
        <p className="lead">Your documents are ready to be managed.</p>
        <button
          type="button"
          className="btn btn-light btn-lg mt-3 shadow"
          data-bs-toggle="modal"
          data-bs-target="#createDoc"
        >
          <i className="bi bi-plus-circle me-2"></i> Create New Document
        </button>
      </div>
      
      <div className="container mt-4">
        <div className="row justify-content-center">
          {!loading ? (
            data.map((doc) => (
              <div key={doc._id} className="col-12 col-sm-6 col-md-4 col-lg-3 my-3">
                <Card cardData={doc} deleteEvent={handleDelete} />
              </div>
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>

      <Modal
        title="Create New Document"
        modalId="createDoc"
        content={
          <form onSubmit={handleAdd}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label text-dark">
                Document Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
                id="title"
                placeholder="Enter title"
                required
              />
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" disabled={loading} className="btn btn-primary">
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        }
      />
    </div>
  );
};

export default DocumentHome;