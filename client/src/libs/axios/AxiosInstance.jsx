import axios from 'axios';
import { toast } from 'react-toastify';
const createAxiosInstance = (url) => {
  const axiosInstance = axios.create({  baseURL: url });

  axiosInstance.interceptors.request.use((config) => {
    config.headers["Content-Type"] = "application/json";
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      console.log("✅ Response:", response);
      if (response.data.success) {
        toast.success(response.data.message || "Thành công!");
        return response.data;
      } else {
        toast.error(response.data.message || "Có lỗi xảy ra!");
        return Promise.reject(response.data);
      }
    },
    (error) => {
      console.log("❌ Error response:", error.response);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra!");
      return Promise.reject(error.response?.data || error);
    }
  );
  

  return axiosInstance;
};

export default createAxiosInstance;