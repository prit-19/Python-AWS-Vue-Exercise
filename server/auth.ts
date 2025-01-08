import { toast } from "vue3-toastify";
import { manageResponse } from "~/composables/manageResponse";
import { useAxios } from "~/composables/useAxios";

export const signupUser = async (payload: any) => {
  try {
    // Send the signup request using the configured axios instance
    const response = await useAxios().post("/auth/signup", payload);
    manageResponse(response);
    return response;
  } catch (error) {
    toast.error(error);
  }
};

export const verifyEmail = async (payload: any) => {
  try {
    const response = await useAxios().post("/auth/confirm-email", payload);
    manageResponse(response);
    return response;
  } catch (error) {
    toast.error(error);
  }
};

export const loginUser = async (payload: any) => {
  try {
    // Send the signup request using the configured axios instance
    const response = await useAxios().post("/auth/login", payload);
    manageResponse(response);
    return response;
  } catch (error) {
    toast.error(error);
  }
};
