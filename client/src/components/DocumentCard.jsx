import React, { useState } from "react";

const DocumentCard = ({ doc, onDelete }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-green-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 mt-4">
      
      {/* CARD HEADER */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
          {doc.title}
        </h3>
        
        <button 
          onClick={() => onDelete(doc._id)} 
          className="text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-md transition-colors"
        >
          Delete
        </button>
      </div>

      {/* ACTION LINKS & BUTTONS */}
      <div className="flex items-center gap-4 text-sm mb-4">
        <button 
          onClick={() => setOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-3 py-1.5 rounded-lg transition-colors shadow-sm"
        >
          Preview PDF
        </button>

        <a 
          href={doc.fileUrl} 
          target="_blank" 
          rel="noreferrer"
          className="text-green-700 hover:text-green-800 font-medium hover:underline flex items-center gap-1"
        >
          View in New Tab
        </a>
      </div>

      {/* AI SUMMARY BOX */}
      <div className="bg-green-50/40 border border-green-100/60 rounded-lg p-3.5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-green-800 mb-1">
          AI Summary
        </h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          {doc.summary}
        </p>
      </div>

      {/* SIMPLE MODAL */}
      {open && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl border border-green-100">
            
            {/* MODAL HEADER */}
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-800 truncate max-w-xl">
                {doc.title} — Preview
              </h3>
              <button 
                onClick={() => setOpen(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>

            {/* IFRAME CONTAINER */}
            <div className="flex-1 rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
              <iframe
                src={doc.fileUrl}
                className="w-full h-full"
                title="PDF Preview"
              />
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
};

export default DocumentCard;