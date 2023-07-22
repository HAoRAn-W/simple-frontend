import axios from "axios";
import { UNAUTHORIZED } from "../constants/MessageCode";

const refreshClient = axios.create({
  baseURL: "http://localhost:8080/api/refresh",
  withCredentials: true,
});

// if access token expired, a 401 error will be raised by other requests.
// call refreshToken to request a new access token
const refreshToken = () => {
  return refreshClient
    .post()
    .then((response) => {
      console.log("refreshToken() response data:");
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      return { code: UNAUTHORIZED, message: error.toString() };
    });
};

const RefreshService = {
  refreshToken,
};

export default RefreshService;
