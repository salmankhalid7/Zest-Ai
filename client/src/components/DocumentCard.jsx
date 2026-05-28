import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PdfViewer from "./PdfViewer";

const DocumentCard = ({ doc, onDelete, onToggleFavorite }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (!doc) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
  };

  const handleViewDetails = (e) => {
    if (e.target.closest("button") || e.target.closest("a")) return;
    navigate(`/document/${doc._id}`);
  };

  return (
    <>
      {/* 🟦 THE SQUARE TILE LAYOUT CONTAINER */}
      <div
        onClick={handleViewDetails}
        className="group relative bg-white border border-gray-200 hover:border-emerald-500 rounded-2xl p-5 w-full max-w-[340px] aspect-square flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer select-none bg-gradient-to-b from-white to-gray-50/30"
      >
        
        {/* TOP ROW: DOC ICON & DELETE BUTTON */}
        <div className="flex justify-between items-start w-full">
          {/* Doc Symbol (From your sketch) */}
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100/80 shadow-sm group-hover:scale-105 transition-transform">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>

          {/* Delete Symbol (From your sketch) */}
          <button
            onClick={(e) => { e.stopPropagation(); onDelete?.(doc._id); }}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
            title="Delete Document"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        {/* MIDDLE SECTION: TITLE & VIEW SUMMARY CTA */}
        <div className="flex flex-col flex-1 justify-center my-3 min-w-0">
          <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors truncate">
            {doc.title || "Untitled Document"}
          </h3>
          
          {/* View Summary / Preview Action Trigger */}
          <button
            onClick={(e) => { e.stopPropagation(); setOpen(true); }}
            className="mt-3 inline-flex items-center justify-center gap-1.5 w-full bg-gray-900 hover:bg-emerald-600 text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow-sm hover:shadow transition-all active:scale-[0.98]"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Summary & Preview
          </button>
        </div>

        {/* BOTTOM ROW: DATE BANNER & FAVORITE STAR */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-1 w-full">
          <span className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(doc.createdAt)}
          </span>

          {/* Star Button (From your sketch) */}
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(doc._id); }}
            className={`p-1.5 rounded-lg transition-all duration-200 transform active:scale-90 ${
              doc.isFavorite 
                ? "text-amber-500 scale-105" 
                : "text-gray-300 hover:text-gray-400"
            }`}
          >
            <svg className="w-5 h-5" fill={doc.isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
        </div>

      </div>

      {/* 🖥️ PREVIEW MODAL FRAME */}
      {open && (
        <div
          className="fixed inset-0 bg-gray-950/50 backdrop-blur-sm flex justify-center items-center p-4 md:p-6 z-50 animate-fadeIn"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-5xl h-[88vh] flex flex-col shadow-2xl overflow-hidden border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-100">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold truncate text-gray-900">
                    {doc.title || "Document Preview"}
                  </h3>
                </div>
              </div>
              
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* AI SUMMARY BOX INSIDE MODAL */}
            <div className="px-6 py-3.5 bg-emerald-50/40 border-b border-emerald-100/50">
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="w-3.5 h-3.5 text-emerald-600 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">AI Generated Insights Summary</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed max-w-4xl">
                {doc.summary || "No summary analysis has been run on this asset yet."}
              </p>
            </div>

            {/* INTEGRATED CUSTOM PDF VIEW */}
            <div className="flex-1 bg-gray-100/60 p-4 min-h-0 overflow-y-auto">
              {doc.fileUrl ? (
                <PdfViewer file={doc.fileUrl} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                  <p className="text-sm">No source file could be located.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DocumentCard;