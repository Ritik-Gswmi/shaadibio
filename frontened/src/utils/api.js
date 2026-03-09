// API base URL
export const API_URL =
  import.meta.env.MODE === "production"
    ? "/api"
    : "http://localhost:5000/api";

// Auth headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};