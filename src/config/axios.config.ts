import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://back-end.smsid.co.uk/api/",
});

export default axiosInstance;
