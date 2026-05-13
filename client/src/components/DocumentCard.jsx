import React, { useState } from "react";

const DocumentCard = ({ doc, onDelete }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ border: "1px solid #ddd", padding: "15px", marginTop: "10px" }}>

      <h3>{doc.title}</h3>

      {/* OPEN PDF */}
      <button onClick={() => setOpen(true)}>
        Preview PDF
      </button>

      <a href={doc.fileUrl} target="_blank" rel="noreferrer">
        View in New Tab
      </a>

      <h4>AI Summary:</h4>
      <p>{doc.summary}</p>

      <button onClick={() => onDelete(doc._id)} style={{ color: "red" }}>
        Delete
      </button>

      {/* SIMPLE MODAL */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              width: "80%",
              height: "80%",
              overflow: "auto",
            }}
          >
            <button onClick={() => setOpen(false)}>
              Close
            </button>

            <iframe
              src={doc.fileUrl}
              width="100%"
              height="90%"
              title="PDF Preview"
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default DocumentCard;