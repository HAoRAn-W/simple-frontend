import axios from "axios";
import { SUCCESSFUL, UNDEFINED_ERROR } from "../constants/MessageCode";

const client = axios.create({
  baseURL: "http://localhost:8080/api/tag/",
  withCredentials: true,
});

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
    .get(`delete/${id}`)
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
