import { useAxios } from "~/composables/useAxios";

export const getAllUsers = async () => {
  try {
    const response = await useAxios().get("/users");
    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await useAxios().get("/users/profile");
    return response;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, payload: any) => {
  try {
    const response = await useAxios().patch(`/users/${userId}`, payload);
    return response;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
