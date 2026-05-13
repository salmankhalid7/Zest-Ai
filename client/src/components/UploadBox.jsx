import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadDocument } from "../services/documentService";

const UploadBox = ({ onUpload }) => {
  const token = localStorage.getItem("token");

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];

    try {
      const res = await uploadDocument(file, token);
      alert("Upload successful!");
      onUpload(res.document);
    } catch (error) {
      alert("Upload failed");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "application/pdf": [],
      },
    });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #aaa",
        padding: "40px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />

      {isDragActive ? (
        <p>Drop your PDF here...</p>
      ) : (
        <p>Drag & drop PDF here, or click to upload</p>
      )}
    </div>
  );
};

export default UploadBox;