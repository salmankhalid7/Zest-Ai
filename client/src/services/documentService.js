import axios from "axios";

const API = "http://localhost:5000/api/documents";

// Upload PDF
export const uploadDocument = async (file, token) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${API}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// Get Documents
export const getDocuments = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const deleteDocument = async (id, token) => {
  const res = await axios.delete(
    `http://localhost:5000/api/documents/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};