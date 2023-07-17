import axios from "axios";

const authClient = axios.create({
  baseURL: "http://localhost:8080/api/auth/",
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: "http://localhost:8080/api/refresh",
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
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
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

const refresh = () => {
  return refreshClient.post("").then((response) => {
    return response.data;
  });
};

const AuthService = {
  signup,
  login,
  logout,
  refresh,
  getUser,
};

export default AuthService;
