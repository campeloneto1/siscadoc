import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Create an axios instance with a default configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json", // You can set other headers if needed
  },
});

export default axiosInstance;
