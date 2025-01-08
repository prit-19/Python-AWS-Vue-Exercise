import { useNuxtApp } from "nuxt/app";
import type { AxiosInstance } from "axios";

// Composable to get the Axios instance
export const useAxios = (): AxiosInstance => {
  const nuxtApp: any = useNuxtApp();
  return nuxtApp.$axios;
};
