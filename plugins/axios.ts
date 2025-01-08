// plugins/axios.ts
import axios from "axios";

export default defineNuxtPlugin((nuxtApp: any) => {
  const runtimeConfig = useRuntimeConfig();

  // Create an axios instance
  const axiosInstance = axios.create({
    baseURL: runtimeConfig.public.apiBase,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const userStore = useUserStore();
      const authToken = userStore.idToken;

      if (authToken) {
        config.headers["Authorization"] = `Bearer ${authToken}`;
      }

      console.log("Request Config:", config);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle responses globally
  axiosInstance.interceptors.response.use(
    (response) => {
      console.log("Response:", response);
      return response.data;
    },
    (error) => {
      console.error("Response Error:", error);

      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 401) {
          nuxtApp.$router.push("/login");
        }
      }
      return Promise.reject(error);
    }
  );

  // Expose the axios instance globally
  nuxtApp.provide("axios", axiosInstance);
});
