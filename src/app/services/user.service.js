import axios from "axios";

const userClient = axios.create({
  baseURL: "http://localhost:8080/api/test/",
  withCredentials: true,
});

const getPublicConetnt = () => {
  return userClient.get("all");
};

const getUserContent = () => {
  return userClient.get("user");
};

const getAdminContent = () => {
  return userClient.get("admin");
};

const UserServcice = {
  getPublicConetnt,
  getUserContent,
  getAdminContent,
};

export default UserServcice;
