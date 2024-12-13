import axios from "axios";
import config from ".";

const axiosInstance = axios.create({
  baseURL: config.api,
});

export default axiosInstance;
