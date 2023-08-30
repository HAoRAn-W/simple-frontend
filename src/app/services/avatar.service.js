import axios from "axios";
import {
  ACCESS_TOKEN_RENEWED,
  NEED_RELOGIN,
  REFRESH_TOKEN_EXPIRED,
  UNDEFINED_ERROR,
} from "../constants/MessageCode";
import RefreshService from "./refresh.service";

const client = axios.create({
  baseURL: "http://localhost:8080/api/avatar/",
  withCredentials: true,
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  // access token expired OR requesting unauthorized resources
  (error) => {
    const request = error.config; // get request
    if (
      request.url === "add" ||
      request.url === "update" ||
      request.url === "delete"
    ) {
      if (error.response.status && error.response.status === 401) {
        if (!request._retry) {
          // set _retry flag to prevent multiple retries
          request._retry = true;
          // try to refresh access token
          return RefreshService.refreshToken().then((data) => {
            if (data.code === ACCESS_TOKEN_RENEWED) {
              console.log("Successfully refresh access token.");
              return client(request); // retry original request
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
    }
    return Promise.reject(error);
  }
);

const getAvatarList = () => {
  return client
    .get("all")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const updateAvatar = (avatar) => {
  return client
    .post("update", avatar)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const addAvatar = (avatar) => {
  return client
    .post("add", avatar)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const deleteAvatar = (id) => {
  return client
    .get("delete", { params: { avatarId: id } })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const AvatarService = {
  getAvatarList,
  updateAvatar,
  addAvatar,
  deleteAvatar,
};

export default AvatarService;
