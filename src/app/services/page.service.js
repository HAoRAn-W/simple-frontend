import axios from "axios";
import { UNDEFINED_ERROR } from "../constants/MessageCode";

const client = axios.create({
  baseURL: "http://localhost:8080/api/page/",
  withCredentials: true,
});

const loadPage = (page) => {
  return client
    .get('post', {params: {pageNo: page, pageSize:6}})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const loadPageByCategory = (categoryId, page) => {
  console.log('categoryId', categoryId);
  console.log('page', page);

  return client
    .get('post/category', {params: {categoryId: categoryId, pageNo: page, pageSize:6}})
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
