import axios from "axios";
import { decrypt } from "@/utils/encryption";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = sessionStorage.getItem("token");
const clearToken = token ? decrypt(token) : "";
// Create an axios instance with a default configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json", // You can set other headers if needed
    Authorization: `Bearer ${token ? clearToken : ""}`,
  },
});

export default axiosInstance;
