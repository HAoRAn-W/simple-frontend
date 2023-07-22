import axios from "axios";
import RefreshService from "./refresh.service";
import {
  ACCESS_TOKEN_RENEWED,
  NEED_RELOGIN,
  REFRESH_TOKEN_EXPIRED,
  UNAUTHORIZED,
  UNDEFINED_ERROR,
} from "../constants/MessageCode";

// axios instance with baseURL and credential config to send http-only cookies with request
const userClient = axios.create({
  baseURL: "http://localhost:8080/api/test/",
  withCredentials: true,
});

userClient.interceptors.response.use(
  (response) => {
    return response;
  },
  // access token expired OR requesting unauthorized resources
  (error) => {
    const request = error.config;  // get request
    if (error.response.status && error.response.status === 401) {
      if (!request._retry) {
        // set _retry flag to prevent multiple retries
        request._retry = true;
        // try to refresh access token
        return RefreshService.refreshToken().then((data) => {
          if (data.code === ACCESS_TOKEN_RENEWED) {
            console.log("Successfully refresh access token.");
            return userClient(request);  // retry original request
          } else if (data.code === REFRESH_TOKEN_EXPIRED) {
            console.log("Refresh token expired, need to login");
            return {data: {code: NEED_RELOGIN, message: "Refresh token expired, need to login"}}
          }
        })
      }
    }
    return Promise.reject(error);
  }
);

const getPublicConetnt = () => {
  return userClient
    .get("all")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('UNDEFINED_ERROR')
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const getUserContent = () => {
  return userClient
    .get("user")
    .then((response) => {
      console.log('the:', response);
      return response.data;
    })
    .catch(() => {
      console.log('UNAUTHORIZED')
      return { code: UNAUTHORIZED, message: "unauthorized" };
    });
};

const getAdminContent = () => {
  return userClient
    .get("admin")
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch(() => {
      console.log('UNAUTHORIZED')
      return { code: UNAUTHORIZED, message: "unauthorized" };
    });
};

const UserServcice = {
  getPublicConetnt,
  getUserContent,
  getAdminContent,
};

export default UserServcice;
