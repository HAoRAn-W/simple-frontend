import axios from "axios";
import { UNDEFINED_ERROR } from "../constants/MessageCode";
import { backendURL } from "../../config";

const client = axios.create({
  baseURL: `${backendURL}/api/page/`,
  withCredentials: true,
});

const loadPage = async (page) => {
  try {
    const response = await client.get("post", {
      params: { pageNo: page, pageSize: 6 },
    });
    return response.data;
  } catch (error) {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  }
};

const loadPageByCategory = async (categoryId, page) => {
  try {
    const response = await client.get("post/category", {
      params: { categoryId: categoryId, pageNo: page, pageSize: 6 },
    });
    return response.data;
  } catch (error) {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  }
};

const loadPageByTag = async (tagId, page) => {
  try {
    const response = await client.get("post/tag", {
      params: { tagId: tagId, pageNo: page, pageSize: 6 },
    });
    return response.data;
  } catch (error) {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  }
};

const PageService = {
  loadPage,
  loadPageByCategory,
  loadPageByTag,
};

export default PageService;
