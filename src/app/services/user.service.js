import axios from "axios";
import RefreshService from "./refresh.service";
import {
  ACCESS_TOKEN_RENEWED,
  NEED_RELOGIN,
  REFRESH_TOKEN_EXPIRED,
  UNDEFINED_ERROR,
} from "../constants/MessageCode";

// axios instance with baseURL and credential config to send http-only cookies with request
const userClient = axios.create({
  baseURL: "http://localhost:8080/api/user/",
  withCredentials: true,
});

userClient.interceptors.response.use(
  (response) => {
    return response;
  },
  // access token expired OR requesting unauthorized resources
  (error) => {
    const request = error.config; // get request
    if (error.response.status && error.response.status === 401) {
      if (!request._retry) {
        // set _retry flag to prevent multiple retries
        request._retry = true;
        // try to refresh access token
        return RefreshService.refreshToken().then((data) => {
          if (data.code === ACCESS_TOKEN_RENEWED) {
            console.log("Successfully refresh access token.");
            return userClient(request); // retry original request
          } else if (data.code === REFRESH_TOKEN_EXPIRED) {
            console.log("Refresh token expired, need to login");
            return {
              data: {
                code: NEED_RELOGIN,
                message: "Refresh token expired, need to login",
              },
            };
          }
        });
      }
    }
    return Promise.reject(error);
  }
);

const getFavoriteList = (pageNo) => {
  return userClient
    .get("favorite", {params: {pageNo: pageNo, pageSize:6}})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const addFavorite = (postId) => {
  return userClient
    .get(`favorite/add/${postId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const removeFavorite = (postId) => {
  return userClient
    .get(`favorite/remove/${postId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const queryFavorite = (postId) => {
  return userClient
    .get(`favorite/${postId}`)
    .then((response) => {
      console.log("query:", response.data);
      return response.data;
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const UserServcice = {
  getFavoriteList,
  addFavorite,
  removeFavorite,
  queryFavorite,
};

export default UserServcice;
