import axios from "axios";
import { UNDEFINED_ERROR } from "../constants/MessageCode";

const client = axios.create({
  baseURL: "http://localhost:8080/api/post/",
  withCredentials: true,
});

const loadPage = (page) => {
  return client
    .get(`page/${page}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const loadPageByCategory = (categoryId, page) => {
  return client
    .get(`${categoryId}/page/${page}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
}

const PageService = {
  loadPage,
  loadPageByCategory,
};

export default PageService;
