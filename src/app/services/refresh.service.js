import axios from "axios";

const refreshClient = axios.create({
  baseURL: "http://localhost:8080/api/refresh/",
  withCredentials: true,
});


// if access token expired, a 401 error will be raised by other requests.
// call refreshToken to request a new access token
const refreshToken = () => {
    return refreshClient.get().then((response) => {
        return response.data;
    })
}

const RefreshService = {
    refreshToken,
}

export default RefreshService;
