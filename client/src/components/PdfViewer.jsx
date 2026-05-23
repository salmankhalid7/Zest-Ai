import React from "react";
import { Document, Page } from "react-pdf";

const PdfViewer = ({ fileUrl }) => {
  return (
    <div className="mt-5 bg-white border border-green-100 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
      
      {/* PDF CANVAS WRAPPER */}
      <div className="border border-gray-200 shadow-inner rounded-lg p-2 bg-gray-50/50 max-w-full overflow-x-auto">
        <Document 
          file={fileUrl}
          loading={
            <div className="flex flex-col items-center justify-center py-12 px-6">
              <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-3" />
              <p className="text-sm font-medium text-green-800">Loading document...</p>
            </div>
          }
          error={
            <div className="text-center py-12 px-6">
              <p className="text-sm font-medium text-red-500">Failed to load PDF preview.</p>
            </div>
          }
        >
          <Page 
            pageNumber={1} 
            renderTextLayer={false} 
            renderAnnotationLayer={false}
            className="max-w-full"
          />
        </Document>
      </div>

      {/* FOOTER ACCENT */}
      <div className="mt-4 text-center">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100/70">
          Showing Page 1
        </span>
      </div>

    </div>
  );
};

export default PdfViewer;