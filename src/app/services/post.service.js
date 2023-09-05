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
  baseURL: `${backendURL}/api/post/`,
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
      console.log("running interceptor");
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

const getPost = async (id) => {
  try {
    const response = await client.get(`${id}`);
    return response.data;
  } catch (error) {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  }
};

const addPost = async (newPost) => {
  try {
    const response = await client.post("add", newPost);
    return response.data;
  } catch (error) {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  }
};

const updatePost = async (newPost) => {
  try {
    const response = await client.post("update", newPost);
    return response.data;
  } catch (error) {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  }
};

const deletePost = async (postId) => {
  try {
    const response = await client.get(`delete`, { params: { postId: postId } });
    return response.data;
  } catch (error) {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  }
};

const pinPost = async (postId) => {
  try {
    const response = await client.get(`pin/${postId}`);
    return response.data;
  } catch (error) {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  }
};

const unpinPost = async (postId) => {
  try {
    const response = await client.get(`unpin/${postId}`);
    return response.data;
  } catch (error) {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  }
};

const getPinnedPosts = async () => {
  try {
    const response = await client.get(`pin/all`);
    return response.data;
  } catch (error) {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  }
};

const PostService = {
  getPost,
  addPost,
  updatePost,
  deletePost,
  pinPost,
  unpinPost,
  getPinnedPosts,
};

export default PostService;
