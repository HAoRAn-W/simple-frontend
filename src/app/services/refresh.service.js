import axios from "axios";

const refreshClient = axios.create({
  baseURL: "http://localhost:8080/api/refresh/",
  withCredentials: true,
});

const refreshToken = () => {
    return refreshClient.get().then((response) => {
        return response.data;
    })
}

const RefreshService = {
    refreshToken,
}

export default RefreshService;
