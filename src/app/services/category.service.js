import axios from "axios";
import {
  ACCESS_TOKEN_RENEWED,
  NEED_RELOGIN,
  REFRESH_TOKEN_EXPIRED,
  UNDEFINED_ERROR,
} from "../constants/MessageCode";
import RefreshService from "./refresh.service";
import { backendURL } from "../../config";

const client = axios.create({
  baseURL: `${backendURL}/api/category/`,
  withCredentials: true,
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  // access token expired OR requesting unauthorized resources
  async (error) => {
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
          const data = await RefreshService.refreshToken();
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
        }
      }
    }
    return Promise.reject(error);
  }
);

const getCategoryList = async () => {
  try {
    const response = await client.get("all");
    return response.data;
  } catch (error) {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  }
};

const addCategory = async (newCategory) => {
  try {
    const response = await client.post("add", newCategory);
    return response.data;
  } catch (error) {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  }
};

const updateCategory = async (newCategory) => {
  try {
    const response = await client.post("update", newCategory);
    return response.data;
  } catch (error) {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  }
};

const deleteCategory = async (categoryId) => {
  try {
    const response = await client.get(`delete`, {
      params: { categoryId: categoryId },
    });
    return response.data;
  } catch (error) {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  }
};

const CategoryService = {
  getCategoryList,
  addCategory,
  updateCategory,
  deleteCategory,
};

export default CategoryService;
