import axios from "axios";

// ======================================
// 🌐 BASE API
// ======================================

const API = "http://localhost:5000/api/documents";

// ======================================
// 🔐 TOKEN HELPER
// ======================================

const getToken = () => {
  return localStorage.getItem("token");
};

// ======================================
// 🧠 AXIOS INSTANCE
// ======================================

const api = axios.create({
  baseURL: API,
});

// ======================================
// 🔥 AUTO ATTACH TOKEN
// ======================================

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ======================================
// 📤 UPLOAD DOCUMENT
// ======================================

export const uploadDocument = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Upload Error:", error);

    throw (
      error.response?.data || {
        message: "Failed to upload document",
      }
    );
  }
};

// ======================================
// 📄 GET DOCUMENTS
// ======================================

export const getDocuments = async () => {
  try {
    const res = await api.get("/");

    return res.data;
  } catch (error) {
    console.error("Get Documents Error:", error);

    throw (
      error.response?.data || {
        message: "Failed to fetch documents",
      }
    );
  }
};

// ======================================
// 🗑 DELETE DOCUMENT
// ======================================

export const deleteDocument = async (id) => {
  try {
    const res = await api.delete(`/${id}`);

    return res.data;
  } catch (error) {
    console.error("Delete Error:", error);

    throw (
      error.response?.data || {
        message: "Failed to delete document",
      }
    );
  }
};