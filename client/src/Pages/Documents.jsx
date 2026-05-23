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

  return (
    <div className="max-w-4xl mx-auto p-1 space-y-8 animate-fadeIn">
      
      {/* PAGE TITLE */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            My Documents
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Upload and manage your study materials or PDF reports.
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-green-50 text-green-700 border border-green-100 rounded-full shadow-sm">
          {docs.length} {docs.length === 1 ? "Document" : "Documents"}
        </span>
      </div>

      {/* UPLOAD BOX REGION */}
      <section className="bg-white rounded-2xl border border-green-100/60 p-2 shadow-sm">
        <UploadBox onUpload={handleUpload} />
      </section>

      {/* DOCUMENT GRID CONTAINER */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 px-1">
          Repository File Feed
        </h2>

        {isLoading ? (
          /* FETCHING SKELETON FEED LOADER */
          <div className="flex flex-col items-center justify-center py-16 bg-white border border-green-100/40 rounded-xl">
            <div className="w-8 h-8 border-4 border-green-100 border-t-green-600 rounded-full animate-spin mb-3" />
            <p className="text-xs font-medium text-green-800 tracking-wide">Syncing archive feed...</p>
          </div>
        ) : docs.length === 0 ? (
          /* EMPTY FEED ARTIFACT VISUALIZATION */
          <div className="text-center py-16 bg-white border border-dashed border-gray-200 rounded-xl space-y-3 p-6 shadow-inner">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-xl mx-auto text-gray-400">
              📂
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-700">No documents found</p>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Your repository index file pile is empty. Drop a file into the upload tray above to get started.
              </p>
            </div>
          </div>
        ) : (
          /* RENDERING FEED ITERATION CONTAINER MAP */
          <div className="grid grid-cols-1 gap-1">
            {docs.map((doc) => (
              <DocumentCard
                key={doc._id}
                doc={doc}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default Documents;