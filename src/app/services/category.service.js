import axios from "axios";
import { UNDEFINED_ERROR } from "../constants/MessageCode";

const client = axios.create({
  baseURL: "http://localhost:8080/api/category/",
  withCredentials: true,
});

const getCategoryList = () => {
  return client
    .get("all")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const CategoryService = {
  getCategoryList,
};

export default CategoryService;
