import axios from "axios";
import { UNAUTHORIZED } from "../constants/MessageCode";
import { backendURL } from "../../config";

const refreshClient = axios.create({
  baseURL: `${backendURL}/api/refresh`,
  withCredentials: true,
});

// if access token expired, a 401 error will be raised by other requests.
// call refreshToken to request a new access token
const refreshToken = async () => {
  try {
    const response = await refreshClient.post();
    return response.data;
  } catch (error) {
    return { code: UNAUTHORIZED, message: error.toString() };
  }
};

const RefreshService = {
  refreshToken,
};

export default RefreshService;
