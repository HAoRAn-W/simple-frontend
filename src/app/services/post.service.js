import axios from "axios";
import { UNDEFINED_ERROR } from "./MessageCode";

const client = axios.create({
  baseURL: "http://localhost:8080/api/post/",
  withCredentials: true,
});

const loadPage = (page) => {
  return client
    .get(`${page}`)
    .then((response) => {
      console.log("loadpage response:");
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const PageService = {
  loadPage,
};

export default PageService;
