import React, { useEffect, useState } from "react";
import UploadBox from "../components/UploadBox";
import DocumentCard from "../components/DocumentCard";
import { getDocuments } from "../services/documentService";

const Documents = () => {
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDocs = async () => {
    try {
      setIsLoading(true);
      const res = await getDocuments();
      setDocs(res.documents || []);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
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

  // 🌟 FIX: LOCAL STATE HANDLER FOR FAVORITES
  const handleToggleFavorite = async (id) => {
    // 1. Optimistically update local UI state immediately
    setDocs((prev) =>
      prev.map((doc) =>
        doc._id === id ? { ...doc, isFavorite: !doc.isFavorite } : doc
      )
    );

    try {
      // 2. TODO: If you have a favorite service endpoint, call it here:
      // await toggleFavoriteDocumentService(id);
    } catch (error) {
      console.error("Failed to update favorite status on server:", error);
      // Optional: Rollback state here if your backend fails
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-1 space-y-8 animate-fadeIn">
      {/* TITLE */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Documents</h1>
          <p className="text-xs text-gray-400 mt-1">
            Upload and manage your PDF files
          </p>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 bg-green-50 text-green-700 border border-green-100 rounded-full">
          {docs.length} Documents
        </span>
      </div>

      {/* UPLOAD */}
      <UploadBox onUpload={handleUpload} />

      {/* LIST */}
      {isLoading ? (
        <div className="py-16 text-center text-green-700">Loading...</div>
      ) : docs.length === 0 ? (
        <div className="py-16 text-center text-gray-500">
          No documents found
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-1">
          {docs.map((doc) => (
            <DocumentCard
              key={doc._id}
              doc={doc}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite} // 🌟 PASSED THE MISSING PROP HERE
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Documents;