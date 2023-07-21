import axios from "axios";
import { POST_NOT_FOUND, SUCCESSFUL, UNDEFINED_ERROR } from "./MessageCode";

const client = axios.create({
  baseURL: "http://localhost:8080/api/post/",
  withCredentials: true,
});

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
  const body = {
    title: newPost.title,
    description: newPost.description,
    content: newPost.content,
    categoryId: newPost.categoryId,
  }

  console.log('body',body)
  return client.post("add", body).then((response) => {
    return response.data;
  }).catch(error => {
    return {code: UNDEFINED_ERROR, message: error.toString()};
  })
};

const updatePost = (newPost) => {
  console.log('updating...')
  return client.post("update", {
    id: newPost.id,
    title: newPost.title,
    description: newPost.description,
    content: newPost.content,
    categoryId: newPost.categoryId,
  }).then((response) => {
    return response.data;
  }).catch(error => {
    return {code: UNDEFINED_ERROR, message: error.toString()};
  })
}

const PostService = {
  getPost,
  addPost,
  updatePost,
};

export default PostService;
