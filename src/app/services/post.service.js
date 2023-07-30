import axios from "axios";
import {
  ACCESS_TOKEN_RENEWED,
  NEED_RELOGIN,
  POST_NOT_FOUND,
  REFRESH_TOKEN_EXPIRED,
  SUCCESSFUL,
  UNDEFINED_ERROR,
} from "../constants/MessageCode";
import RefreshService from "./refresh.service";

const client = axios.create({
  baseURL: "http://localhost:8080/api/post/",
  withCredentials: true,
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  // access token expired OR requesting unauthorized resources
  (error) => {
    const request = error.config; // get request
    if (request.url === "add" || request.url === "update") {
      console.log("running interceptor");
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

const getPost = (id) => {
  return client
    .get(`${id}`)
    .then((response) => {
      if (response.data.code === SUCCESSFUL) {
        return response.data;
      } else {
        return { code: POST_NOT_FOUND, message: response.data.message };
      }
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const addPost = (newPost) => {
  return client
    .post("add", newPost)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const updatePost = (newPost) => {
  return client
    .post("update", newPost)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const deletePost = (postId) => {
  return client.get(`delete/${postId}`).then((response) => {
    return response.data;
  })
  .catch((error) => {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  });
}

const pinPost = (postId) => {
  return client.get(`pin/${postId}`).then((response) => {
    return response.data;
  })
  .catch((error) => {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  });
}

const unpinPost = (postId) => {
  return client.get(`unpin/${postId}`).then((response) => {
    return response.data;
  })
  .catch((error) => {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  });
  
}

const getPinnedPosts = () => {
  return client.get(`pin/all`).then((response) => {
    return response.data;
  })
  .catch((error) => {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  });
}


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
