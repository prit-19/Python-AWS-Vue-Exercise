import { data } from "jquery";
import { useAxios } from "~/composables/useAxios";

export const generatePresignedUrl = async () => {
  try {
    const response = await useAxios().post("/media/generate-pre-signed-url");
    return response;
  } catch (error) {
    console.log("error generating the pre signed url");
  }
};

export const specificMediaPresignedUrl = async (file_name: string) => {
  try {
    const response = await useAxios().post(
      "/media/specific-media-presigned-url",
      {
        file_name,
      }
    );
    return response;
  } catch (error) {
    console.log("error generating the pre signed url");
  }
};
