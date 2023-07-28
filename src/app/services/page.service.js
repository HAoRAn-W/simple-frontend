import axios from "axios";
import { UNDEFINED_ERROR } from "../constants/MessageCode";

const client = axios.create({
  baseURL: "http://localhost:8080/api/page/",
  withCredentials: true,
});

const loadPage = (page) => {
  return client
    .get('post', {params: {pageNo: page, pageSize:2}})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const loadPageByCategory = (categoryId, page) => {
  return client
    .get('/page/category', {params: {categoryId: categoryId, pageNo: page, pageSize:1}})
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
