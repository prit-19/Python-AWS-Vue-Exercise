<template>
  <div>
    <img :src="profilePicUrl" alt="Profile pic" />
    <br />
    <input type="file" @change="handleFileChange" />
    <br />
    <button class="btn btn-sm small btn-primary mt-2" @click="upload">
      <span v-if="!profilePicUrl">Upload Photo</span>
      <span v-else>Change Photo</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  generatePresignedUrl,
  specificMediaPresignedUrl,
} from "~/server/media";
import { updateUserProfile } from "~/server/users";
import { useUserStore } from "~/stores/userStore";

// User store and profile pic URL
const userStore = useUserStore();
const profilePicUrl = ref(userStore?.user?.profilePicUrl || "");

onMounted(async () => {
  const imageName = profilePicUrl.value.split("/").at(-1) || "";
  const res: any = await specificMediaPresignedUrl(imageName);
  profilePicUrl.value = JSON.parse(res.body)?.presigned_url || "";
});

// Selected file to be uploaded
let selectedFile: File | null = null;

// Handle file selection
const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input?.files?.[0]) {
    selectedFile = input.files[0];
  }
};

// Upload function to generate presigned URL and upload file
const upload = async () => {
  if (!selectedFile) {
    alert("Please select a file to upload");
    return;
  }

  // Generate presigned URL
  const res: any = await generatePresignedUrl();
  const { presigned_url } = JSON.parse(res?.body || {});

  // Upload the file to the presigned URL
  const uploadRes = await fetch(presigned_url, {
    method: "PUT",
    headers: {
      "Content-Type": selectedFile.type, // Set the file type in the header
    },
    body: selectedFile,
  });

  if (uploadRes.ok) {
    // Update the profile picture URL in the user store
    const uploadedUrl = `${presigned_url.split("?")[0]}`;
    userStore.updateUserProfile({ profilePicUrl: uploadedUrl });
    await updateUserProfile(userStore?.user?.user_id, {
      profilePicUrl: uploadedUrl,
    });
    const imageName = uploadedUrl.split("/").at(-1) || "";
    const res: any = await specificMediaPresignedUrl(imageName);
    profilePicUrl.value = JSON.parse(res.body)?.presigned_url || "";
  } else {
    alert("Failed to upload the photo");
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
  height: auto;
  margin-bottom: 10px;
}
</style>
