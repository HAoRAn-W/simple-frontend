import axios from "axios";
import RefreshService from "./refresh.service";
import {
  ACCESS_TOKEN_RENEWED,
  NEED_RELOGIN,
  REFRESH_TOKEN_EXPIRED,
  UNAUTHORIZED,
  UNDEFINED_ERROR,
} from "./MessageCode";

const userClient = axios.create({
  baseURL: "http://localhost:8080/api/test/",
  withCredentials: true,
});

class LoginRequiredError extends Error {
  constructor(message) {
    super(message);
    this.name = "LoginRequiredError";
    this.code = NEED_RELOGIN;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.code = UNAUTHORIZED;
  }
}

userClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const request = error.config;
    if (error.response.status === 401) {
      if (!request._retry) {
        request._retry = true;
        return RefreshService.refreshToken().then((data) => {
          if (data.code === ACCESS_TOKEN_RENEWED) {
            console.log('retry success')
            return userClient(request);
          } else if (data.code === REFRESH_TOKEN_EXPIRED) {
            console.log('need login')
            throw new LoginRequiredError("Login is required");
          } else {
            throw new UnauthorizedError("Unauthorized");
          }
        });
      }
    }
    return Promise.reject(error);
  }
);

const getPublicConetnt = () => {
  return userClient.get("all");
};

const getUserContent = () => {
  return userClient.get("user").then((response) => {
    console.log('user:')
    console.log(response.data);
    return response.data;
  }).catch((error) => {
    if (error instanceof LoginRequiredError) {
      return {code: NEED_RELOGIN, message: 'Log in is required'}
    } else if (error instanceof UnauthorizedError ) {
      return {code: UNAUTHORIZED, message: 'unauthorized'}
    } else {
      return {code: UNDEFINED_ERROR, message: error.toString()}
    }
  });
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
