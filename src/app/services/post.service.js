import axios from "axios";
import { POST_NOT_FOUND, SUCCESSFUL, UNDEFINED_ERROR } from "./MessageCode";

const client = axios.create({
    baseURL: "http://localhost:8080/api/post/",
    withCredentials: true,
  });

const getPost = (id) => {
    return client.get(`${id}`).then((response) => {
      if (response.data.code === SUCCESSFUL) {
        return response.data;
      } else {
        return {code: POST_NOT_FOUND, message: response.data.message};
      }
    }).catch((error) => {
      return {code: UNDEFINED_ERROR, message: error.toString()};
    })
  }

  const PostService = {
    getPost,
  }

  export default PostService;