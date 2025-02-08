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
// Import the API variable

const DocumentHome = () => {
  const { auth } = useAuth();
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

  const handleShare = async (cardData) => {
    console.log("sharing link");
    setLoading(true);
    try {
      const response = await fetch(`${API}/documents/share/${cardData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Document shared successfully");
        // Do something like set a isShared state to render the icon shared icon
      } else {
        toast.error(data.message || "Failed to share document");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to share document");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <div className="row d-flex align-items-center justify-content-between px-3">
        <div className="col-12 col-md-8">
          <h1 className="display-5 text-primary">
            Hello {auth?.user?.username} 👋
          </h1>
          <p className="lead">Welcome to your document home page</p>
        </div>
        <div className="col-12 col-md-4 d-flex justify-content-md-end mt-3 mt-md-0">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#createDoc"
          >
            <i className="bi bi-plus-circle-fill me-2"></i>Create New
          </button>
        </div>
      </div>
      <div className="row my-4">
        {!loading ? (
          data.map((doc) => (
            <div
              key={doc._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 my-3"
            >
              <Card
                cardData={doc}
                deleteEvent={handleDelete}
                shareEvent={handleShare}
              />
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
      <Modal
        title="Create New Document"
        modalId="createDoc"
        content={
          <form onSubmit={handleAdd}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
                id="title"
                placeholder="Document Title"
                required
              />
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
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
