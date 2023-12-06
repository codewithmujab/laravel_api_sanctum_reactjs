import axios from "axios";

//buat instance axios
const axiosClient = axios.create({
  // ambil dari .env
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

// tambahkan interceptor untuk menangani request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// tambahkan interceptor untuk menangani response
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    //jika error karena server
    if (response.status === 401) {
      // hapus token di localstorage
      localStorage.removeItem("ACCESS_TOKEN");
      // window.location.reload();
    } else if (response.status === 404) {
      //Show not found
    }

    throw error;
  }
);

export default axiosClient;
