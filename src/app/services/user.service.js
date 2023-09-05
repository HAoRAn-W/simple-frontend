import axios from "axios";
import RefreshService from "./refresh.service";
import {
  ACCESS_TOKEN_RENEWED,
  NEED_RELOGIN,
  REFRESH_TOKEN_EXPIRED,
  SUCCESSFUL,
  UNDEFINED_ERROR,
} from "../constants/MessageCode";
import { backendURL } from "../../config";

// axios instance with baseURL and credential config to send http-only cookies with request
const userClient = axios.create({
  baseURL: `${backendURL}/api/user/`,
  withCredentials: true,
});

userClient.interceptors.response.use(
  (response) => {
    return response;
  },
  // access token expired OR requesting unauthorized resources
  async (error) => {
    const request = error.config; // get request
    if (error.response.status && error.response.status === 401) {
      if (!request._retry) {
        // set _retry flag to prevent multiple retries
        request._retry = true;
        // try to refresh access token
        const data = await RefreshService.refreshToken();
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
      }
    }
    return Promise.reject(error);
  }
);

const getFavoriteList = async (pageNo) => {
  try {
    const response = await userClient.get("favorite", {
      params: { pageNo: pageNo, pageSize: 6 },
    });
    return response.data;
  } catch (error) {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  }
};

const addFavorite = async (postId) => {
  try {
    const response = await userClient.get(`favorite/add/${postId}`);
    return response.data;
  } catch (error) {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  }
};

const removeFavorite = async (postId) => {
  try {
    const response = await userClient.get(`favorite/remove/${postId}`);
    return response.data;
  } catch (error) {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  }
};

const queryFavorite = async (postId) => {
  try {
    const response = await userClient.get(`favorite/${postId}`);
    return response.data;
  } catch (error) {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  }
};

const updateInfo = async (userinfo) => {
  try {
    const response = await userClient.post("updateinfo", userinfo);
    return response.data;
  } catch (error) {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  }
};

const refresh = async () => {
  try {
    const response = await userClient.get("getinfo");
    if (response.data.code === SUCCESSFUL) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  }
};

const UserServcice = {
  getFavoriteList,
  addFavorite,
  removeFavorite,
  queryFavorite,
  updateInfo,
  refresh,
};

export default UserServcice;
