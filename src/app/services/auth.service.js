import axios from "axios";
import { SUCCESSFUL, UNDEFINED_ERROR } from "../constants/MessageCode";
import { backendURL } from "../../config";

const client = axios.create({
  baseURL: `${backendURL}/api/auth/`,
  withCredentials: true,
});

const signup = async (username, email, password) => {
  try {
    const response = await client.post("signup", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  }
};

const login = async (username, password) => {
  try {
    const response = await client.post("login", {
      username,
      password,
    });
    if (response.data.code === SUCCESSFUL) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  }
};

const resetpassword = async (username, email, password, confirmpassword) => {
  try {
    const response = await client.post("resetpassword", {
      username,
      email,
      password,
      confirmPassword: confirmpassword,
    });
    return response.data;
  } catch (error) {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  }
};

const logout = async () => {
  try {
    localStorage.removeItem("user");
    const response = await client.post("logout");
    return response.data;
  } catch (error) {
    return { code: UNDEFINED_ERROR, message: error.toString() };
  }
};

const getUser = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }

  return null;
};

const AuthService = {
  signup,
  login,
  logout,
  getUser,
  resetpassword,
};

export default AuthService;
