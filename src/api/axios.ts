import axios from "axios";

const ajax = axios.create({
  baseURL: process.env.VUE_APP_HOST + process.env.VUE_APP_API_IP,
  headers: {
    "Content-Type": "application/json",
    "jwt": localStorage.getItem("jwt") || null,
    app: "autologin",
  },
});

ajax.interceptors.request.use(
  config => {
    let token = localStorage.getItem("jwt") || null;

    if (token) {
      config.headers["jwt"] = `${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default ajax;
