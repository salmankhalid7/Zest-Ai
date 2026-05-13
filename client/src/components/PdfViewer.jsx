import React from "react";
import { Document, Page } from "react-pdf";

const PdfViewer = ({ fileUrl }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <Document file={fileUrl}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default PdfViewer;