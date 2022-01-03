import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "http://localhost:8001/api/",
});

// Alter defaults after instance has been created
instance.defaults.headers.common["Authorization"] = localStorage.getItem(
  "accessToken"
)
  ? `Bearer ${localStorage.getItem("accessToken")}`
  : "";

export default instance;
