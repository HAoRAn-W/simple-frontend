import axios from "axios";
import { UNDEFINED_ERROR } from "../constants/MessageCode";

const client = axios.create({
  baseURL: "http://localhost:8080/api/avatar/",
  withCredentials: true,
});

const getAvatarList = () => {
  return client
    .get("all")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { code: UNDEFINED_ERROR, message: error.toString() };
    });
};

const AvatarService = {
  getAvatarList,
};

export default AvatarService;
