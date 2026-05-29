// ===============================
// DocumentFeature.jsx
// ===============================

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import PdfViewer from "../components/PdfViewer";
import ChatBox from "./ChatBox";
import Summary from "./Summary";
import Flashcards from "./Flashcards";
import Quiz from "./Quiz";

const DocumentFeature = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Content");
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const tabs = [
    "Content",
    "Chat",
    "Summary",
    "Flashcards",
    "Quizzes",
  ];

  useEffect(() => {
    const fetchDocumentDetails = async () => {
      try {
        setLoading(true);
        setFetchError(null);

        const response = await axios.get(
          `http://localhost:5000/api/documents/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const documentData = response.data.document || response.data;
        setDoc(documentData);
      } catch (err) {
        console.error(err);

        setFetchError(
          "Failed to load document metadata. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDocumentDetails();
    }
  }, [id]);

  // ===============================
  // LOADING STATE
  // ===============================

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4"></div>

        <p className="text-sm font-semibold text-gray-500 tracking-wide uppercase animate-pulse">
          Opening Studio Workspace...
        </p>
      </div>
    );
  }

  // ===============================
  // ERROR STATE
  // ===============================

  if (fetchError || !doc) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-white p-6 text-center">
        <div className="text-4xl mb-3">📁</div>

        <h3 className="text-lg font-bold text-gray-800 mb-1">
          Workspace Error
        </h3>

        <p className="text-sm text-gray-500 max-w-sm mb-4">
          {fetchError || "Document record not found."}
        </p>

        <button
          onClick={() => navigate("/dashboard/documents")}
          className="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-xl transition-colors"
        >
          Return to Documents
        </button>
      </div>
    );
  }

  // ===============================
  // TAB RENDERER
  // ===============================

 const renderActiveTab = () => {
  switch (activeTab) {
    case "Content":
      return (
        <div className="bg-white rounded-2xl border border-gray-200/70 shadow-sm overflow-hidden flex flex-col h-full w-full">
          <div className="flex-1 min-h-0 relative bg-gray-100/40">
            {doc.fileUrl ? (
              <PdfViewer file={doc.fileUrl} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm font-medium">
                No source file attached to this record.
              </div>
            )}
          </div>
        </div>
      );

    case "Chat":
      return (
        <div className="h-full w-full">
          <ChatBox documentId={id} />
        </div>
      );

    case "Summary":
      return (
        <div className="h-full overflow-y-auto">
          <Summary summary={doc.summary} title={doc.title} />
        </div>
      );

    case "Flashcards":
      return (
        <div className="h-full overflow-y-auto">
          <Flashcards documentId={id} />
        </div>
      );

    case "Quizzes":
      return (
        <div className="h-full overflow-y-auto">
          <Quiz documentId={id} />
        </div>
      );

    default:
      return null;
  }
};

  // ===============================
  // MAIN UI
  // ===============================

  return (
    <div className="h-screen w-screen bg-white flex flex-col font-sans text-gray-800 overflow-hidden">

      {/* HEADER */}
      <div className="px-8 pt-6 pb-2 border-b border-gray-100 flex-shrink-0">

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-emerald-600 transition-colors mb-3 group"
        >
          <svg
            className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>

          Back to Documents
        </button>

        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-6">
          {doc.title || "Document Workspace"}
        </h1>

        {/* TABS */}
        <div className="flex items-center gap-8 border-b border-gray-100 -mb-[2px] overflow-x-auto">

          {tabs.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-bold transition-all relative whitespace-nowrap ${
                  isActive
                    ? "text-emerald-600 font-extrabold"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}

                <div
                  className={`absolute bottom-0 left-0 right-0 h-[3px] bg-emerald-500 rounded-full transition-all duration-200 transform origin-left ${
                    isActive
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 bg-gray-50/50 p-6 min-h-0 overflow-hidden">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default DocumentFeature;