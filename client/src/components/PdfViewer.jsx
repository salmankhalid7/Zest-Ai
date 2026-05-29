import { useState, useEffect, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import worker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = worker;

const PdfViewer = ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRendering, setIsRendering] = useState(false);

  useEffect(() => {
    setPageNumber(1);
    setError(null);
    setIsLoading(true);
  }, [file]);

  const options = useMemo(() => ({
    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
    cMapPacked: true,
  }), []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  const onDocumentLoadError = (err) => {
    console.error("PDF Load Error:", err);
    setError(err.message || "Failed to load PDF. Please check the file URL or CORS settings.");
    setIsLoading(false);
  };

  const zoomIn = () => setScale(s => Math.min(s + 0.15, 2.5));
  const zoomOut = () => setScale(s => Math.max(s - 0.15, 0.5));
  const fitToWidth = () => setScale(1.2);
  const fitToPage = () => setScale(1.0);

  const goToPrevPage = () => {
    setIsRendering(true);
    setPageNumber(p => Math.max(p - 1, 1));
  };

  const goToNextPage = () => {
    setIsRendering(true);
    setPageNumber(p => Math.min(p + 1, numPages || 1));
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Modern Toolbar */}
      <div className="bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          {/* Page Navigation */}
          <div className="flex items-center bg-gray-100 rounded-xl px-2 py-1">
            <button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1 || isLoading}
              className="p-2 hover:bg-white rounded-lg transition-all disabled:opacity-40"
              title="Previous Page"
            >
              ←
            </button>
            
            <div className="px-4 text-sm font-medium text-gray-700 min-w-[80px] text-center">
              {numPages ? `${pageNumber} of ${numPages}` : "—"}
            </div>

            <button
              onClick={goToNextPage}
              disabled={pageNumber >= (numPages || 1) || isLoading}
              className="p-2 hover:bg-white rounded-lg transition-all disabled:opacity-40"
              title="Next Page"
            >
              →
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            <button onClick={zoomOut} className="p-2 hover:bg-white rounded-lg transition-all text-lg" title="Zoom Out">−</button>
            <span className="px-3 text-sm font-semibold text-gray-700 min-w-[52px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button onClick={zoomIn} className="p-2 hover:bg-white rounded-lg transition-all text-lg" title="Zoom In">＋</button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={fitToWidth}
              className="px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 hover:border-gray-300 rounded-lg transition-all"
            >
              Fit Width
            </button>
            <button
              onClick={fitToPage}
              className="px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 hover:border-gray-300 rounded-lg transition-all"
            >
              Fit Page
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <a
            href={file}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
          >
            <span>↓</span>
            Download
          </a>
        </div>
      </div>

      {/* PDF Viewer Area */}
      <div className="flex-1 overflow-auto p-8 bg-gray-100 flex items-start justify-center relative">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm z-30">
            <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm font-medium text-gray-600">Loading document...</p>
          </div>
        )}

        {error ? (
          <div className="max-w-lg w-full bg-white border border-red-100 rounded-2xl p-8 text-center shadow-sm">
            <div className="text-5xl mb-4">📄</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Couldn't Load PDF</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="shadow-2xl border border-gray-200 rounded-2xl overflow-hidden bg-white">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              options={options}
              loading={null}
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                onRenderSuccess={() => setIsRendering(false)}
                className="shadow-inner"
              />
            </Document>
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-white border-t border-gray-200 px-6 py-2.5 text-xs text-gray-500 flex items-center justify-between">
        <div>
          {numPages && `Page ${pageNumber} of ${numPages}`}
        </div>
        <div className="text-emerald-600 font-medium">
          Powered by PDF.js
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;