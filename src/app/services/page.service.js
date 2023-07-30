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
  return client
    .get('post/category', {params: {categoryId: categoryId, pageNo: page, pageSize:6}})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
}

const loadPageByTag = (tagId, page) => {
  return client
    .get('post/tag', {params: {tagId: tagId, pageNo: page, pageSize:6}})
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
  loadPageByTag,
};

export default PageService;
