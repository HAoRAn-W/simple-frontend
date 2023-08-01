import axios from "axios";
import { ACCESS_TOKEN_RENEWED, NEED_RELOGIN, REFRESH_TOKEN_EXPIRED, SUCCESSFUL, UNDEFINED_ERROR } from "../constants/MessageCode";
import RefreshService from "./refresh.service";

const client = axios.create({
  baseURL: "http://localhost:8080/api/tag/",
  withCredentials: true,
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  // access token expired OR requesting unauthorized resources
  (error) => {
    const request = error.config; // get request
    if (request.url === "add" || request.url === "update" || request.url === "delete") {
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

const addTag = (newTag) => {
  return client
    .post("add", newTag)
    .then((response) => {
      if (response.data.code === SUCCESSFUL) {
        return response.data;
      } else {
        return { code: response.data.code, message: response.data.message };
      }
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const updateTag = (newTag) => {
  return client
    .post("update", newTag)
    .then((response) => {
      if (response.data.code === SUCCESSFUL) {
        return response.data;
      } else {
        return { code: response.data.code, message: response.data.message };
      }
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const deleteTag = (id) => {
  return client
    .get(`delete`, {params: {tagId: id}})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const getTagList = () => {
  return client
    .get("all")
    .then((response) => {
      if (response.data.code === SUCCESSFUL) {
        console.log("resp:", response.data);
        return response.data;
      } else {
        return { code: response.data.code, message: response.data.message };
      }
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const TagService = {
  addTag,
  updateTag,
  getTagList,
  deleteTag,
};

export default TagService;
