import { useState, useEffect, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// 🌐 Dynamically matches the version over stable CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.mjs`;

const PdfViewer = ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset states when file changes
    setPageNumber(1);
    setError(null);
    setIsLoading(true);
  }, [file]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setError(null);
    setIsLoading(false);
  }

  function onDocumentLoadError(err) {
    console.error("PDF Load Error:", err);
    setError("Failed to render this document. Please check the file format.");
    setIsLoading(false);
  }

  const options = useMemo(() => ({
    withCredentials: false
  }), []);

  // Zoom control logic
  const zoomIn = () => setScale((s) => Math.min(s + 0.2, 2.0));
  const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.6));

  if (!file) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 border border-dashed border-gray-200 rounded-xl h-full">
        <p className="text-sm font-medium text-gray-500">No PDF file specified or URL is empty.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-900/5 rounded-xl border border-gray-200/80 overflow-hidden shadow-inner">
      
      {/* 🛠️ PREMIUM TOOLBAR */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-gray-200/80 sticky top-0 z-10 backdrop-blur-md bg-white/95">
        
        {/* Pagination Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
            disabled={pageNumber <= 1 || isLoading}
            className="p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            title="Previous Page"
          >
            ⬅️
          </button>
          
          <span className="text-xs font-medium text-gray-600 select-none px-1">
            {numPages ? `${pageNumber} / ${numPages}` : "— / —"}
          </span>

          <button
            onClick={() => setPageNumber((p) => Math.min(p + 1, numPages || 1))}
            disabled={pageNumber >= (numPages || 1) || isLoading}
            className="p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            title="Next Page"
          >
            ➡️
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={zoomOut}
            disabled={scale <= 0.6 || isLoading}
            className="p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg disabled:opacity-30 transition-all text-xs font-bold"
            title="Zoom Out"
          >
            ➖
          </button>
          <span className="text-xs font-semibold text-gray-600 select-none min-w-[45px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={zoomIn}
            disabled={scale >= 2.0 || isLoading}
            className="p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg disabled:opacity-30 transition-all text-xs font-bold"
            title="Zoom In"
          >
            ➕
          </button>
        </div>

        {/* Download / Outbound link */}
        <div>
          <a
            href={file}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-gray-600 hover:text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-50 transition-all flex items-center gap-1.5"
          >
            📥 Download
          </a>
        </div>
      </div>

      {/* 📄 PDF RENDER CANVAS WORKSPACE */}
      <div className="flex-1 overflow-y-auto overflow-x-auto p-6 bg-gray-100/60 flex items-start justify-center min-h-0 relative">
        
        {/* Loading Spinner Overlays */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/80 backdrop-blur-sm z-20 transition-opacity duration-300">
            <div className="w-8 h-8 border-3 border-green-600 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-xs font-semibold text-gray-500 tracking-wide uppercase animate-pulse">
              Parsing Document...
            </p>
          </div>
        )}

        {/* Error Messaging Banner */}
        {error ? (
          <div className="max-w-md w-full bg-white border border-red-100 shadow-sm p-5 rounded-xl text-center my-12">
            <div className="text-2xl mb-2">⚠️</div>
            <h5 className="text-sm font-bold text-gray-800 mb-1">Unable to Preview PDF</h5>
            <p className="text-xs text-gray-500 leading-relaxed">{error}</p>
          </div>
        ) : (
          /* Main PDF Document Canvas Container */
          <div className="shadow-lg border border-gray-200/70 rounded-lg overflow-hidden bg-white transition-all duration-200 transform origin-top hover:shadow-xl">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={null} // Handled by our custom layout wrapper above
              options={options}
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="max-w-full"
              />
            </Document>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfViewer;