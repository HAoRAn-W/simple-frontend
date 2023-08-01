import axios from "axios";
import { ACCESS_TOKEN_RENEWED, NEED_RELOGIN, REFRESH_TOKEN_EXPIRED, UNDEFINED_ERROR } from "../constants/MessageCode";
import RefreshService from "./refresh.service";

const client = axios.create({
  baseURL: "http://localhost:8080/api/category/",
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

const getCategoryList = () => {
  return client
    .get("all")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const addCategory = (newCategory) => {
  return client
    .post("add", newCategory)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const updateCategory = (newCategory) => {
  return client
    .post("update", newCategory)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const deleteCategory = (categoryId) => {
  return client.get(`delete`, {params: {categoryId: categoryId}}).then((response) => {
    return response.data;
  })
  .catch((error) => {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  });
}

const CategoryService = {
  getCategoryList,
  addCategory,
  updateCategory,
  deleteCategory
};

export default CategoryService;
