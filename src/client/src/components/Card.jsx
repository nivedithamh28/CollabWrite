import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useSupplier } from "../context/supplierContext";

const Card = ({ cardData, deleteEvent }) => {
  const navigate = useNavigate();
  const { setCurrentDoc, darkMode } = useSupplier();

  const cardBgClass = darkMode ? "bg-dark text-light" : "bg-light text-dark";
  const cardTitleClass = darkMode ? "text-info" : "text-primary";
  const textMutedClass = darkMode ? "text-secondary" : "text-muted";

  const insertValue = cardData?.content?.ops[0]?.insert;
  const previewText =
    typeof insertValue === "string"
      ? insertValue.slice(0, 50)
      : "No preview available.";

  // Function to handle TXT file download
  const handleDownload = () => {
    // Ensure content exists and is an array
    const contentOps = cardData?.content?.ops || [];
    const fullContent = contentOps
      .map((op) => (typeof op.insert === "string" ? op.insert : ""))
      .join(""); // Join all text inserts

    const textData = `
    Title: ${cardData?.title || "Untitled"}
    Owner: ${cardData?.owner?.username || "Unknown"}
    Date: ${
      cardData?.createdAt
        ? new Date(cardData.createdAt).toLocaleDateString()
        : "Unknown"
    }

    Content:
    ${fullContent || "No content available."}
  `;

    const blob = new Blob([textData], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${cardData?.title || "document"}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {cardData?.title && (
        <div className="col-12">
          <div className={`card ${cardBgClass} shadow-sm h-100`}>
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className={`card-title ${cardTitleClass} mb-0`}>
                  {cardData?.title}
                </h5>
                <small className={textMutedClass}>
                  {cardData?.createdAt
                    ? new Date(cardData.createdAt).toLocaleDateString()
                    : ""}
                </small>
              </div>

              <p className={`${textMutedClass} mb-2`}>
                Owner: {cardData?.owner?.username || "Unknown"}
              </p>

              <p className="card-text mb-4">
                {previewText}
                {typeof insertValue === "string" && insertValue.length > 50
                  ? "..."
                  : ""}
              </p>

              {/* Action Buttons */}
              <div className="d-flex justify-content-between mt-auto">
                <button
                  className="btn btn-outline-danger"
                  data-bs-toggle="modal"
                  data-bs-target={`#deleteDoc${cardData?._id}`}
                >
                  <i className="bi bi-trash3-fill me-2"></i>Delete
                </button>
                <button
                  onClick={() => {
                    navigate(`/edit/${cardData._id}`);
                    setCurrentDoc(cardData);
                  }}
                  className="btn btn-outline-success"
                >
                  <i className="bi bi-pencil-square me-2"></i>Edit
                </button>
                <button
                  onClick={handleDownload}
                  className="btn btn-outline-primary"
                >
                  <i className="bi bi-download"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Document"
        modalId={`deleteDoc${cardData?._id}`}
        content={
          <>
            <p className="lead text-danger">
              Are you sure you want to delete the document{" "}
              <strong>{cardData?.title || "Untitled"}</strong>?
            </p>
            <div className="d-flex justify-content-end mt-4">
              <button
                type="button"
                className="btn btn-secondary me-2"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => deleteEvent(cardData._id)}
                data-bs-dismiss="modal"
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </>
        }
      />
    </>
  );
};

export default Card;
