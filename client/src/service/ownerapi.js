import axios from "axios";
import { API_NOTIFICATION_MESSEAGES, SERVICE_URLS } from "../constants/config.js";

const API_URL = "http://localhost:8000/owner";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.response.use(
  (response) => ({ isSuccess: true, data: response.data }),
  (error) => {
    let errorMsg = "Unexpected error occurred";
    if (error.response) {
      errorMsg = API_NOTIFICATION_MESSEAGES.responseFailure;
    } else if (error.request) {
      errorMsg = API_NOTIFICATION_MESSEAGES.requestFailure;
    } else {
      errorMsg = API_NOTIFICATION_MESSEAGES.networkError;
    }
    return { isError: true, msg: errorMsg, response: error.response };
  }
);

const OWNERAPI = {};
Object.entries(SERVICE_URLS).forEach(([key, value]) => {
  OWNERAPI[key] = async (body) => {
    try {
      console.log(`API Call: ${value.method.toUpperCase()} ${value.url}`);
      const response = await axiosInstance({ method: value.method, url: value.url, data: body });
      return response;
    } catch (error) {
      console.error("API Error:", error);
      return error;
    }
  };
});

export { OWNERAPI };
