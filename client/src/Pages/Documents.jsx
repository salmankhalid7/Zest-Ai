import React, { useEffect, useState } from "react";
import UploadBox from "../components/UploadBox";
import DocumentCard from "../components/DocumentCard";
import { getDocuments } from "../services/documentService";

const Documents = () => {
  const [docs, setDocs] = useState([]);

  const fetchDocs = async () => {
    try {
      const res = await getDocuments();
      setDocs(res.documents || []);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleUpload = (newDoc) => {
    setDocs((prev) => [newDoc, ...prev]);
  };

  const handleDelete = (id) => {
    setDocs((prev) => prev.filter((doc) => doc._id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Documents</h1>

      {/* Upload Box */}
      <UploadBox onUpload={handleUpload} />

      {/* Document List */}
      <div>
        {docs.map((doc) => (
          <DocumentCard
            key={doc._id}
            doc={doc}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Documents;