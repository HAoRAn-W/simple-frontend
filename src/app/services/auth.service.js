import axios from "axios";
import { SUCCESSFUL, UNDEFINED_ERROR } from "../constants/MessageCode";

const authClient = axios.create({
  baseURL: "http://localhost:8080/api/auth/",
  withCredentials: true,
});

const signup = (username, email, password) => {
  return authClient
    .post("signup", {
      username,
      email,
      password,
    })
    .then((response) => {
      return response.data;
    });
};

const login = (username, password) => {
  return authClient
    .post("login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.code === SUCCESSFUL) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    }).catch((error) => {
      return {code: UNDEFINED_ERROR, message: error.toString()};
    })
};

const logout = () => {
  localStorage.removeItem("user");
  return authClient.post("logout").then((response) => {
    return response.data;
  });
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  signup,
  login,
  logout,
  getUser,
};

export default AuthService;
