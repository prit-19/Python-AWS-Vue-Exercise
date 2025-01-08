import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: {
      user_id: "",
      name: "",
      height: "",
      gender: "",
      dob: "",
      group: "",
      email: "",
      profilePicUrl: "",
    },
    idToken: "", // ID token from Cognito
    accessToken: "", // Access token from Cognito
    refreshToken: "", // Refresh token from Cognito
  }),

  actions: {
    setTokens(tokens: {
      idToken: string;
      accessToken: string;
      refreshToken: string;
    }) {
      this.idToken = tokens.idToken;
      this.accessToken = tokens.accessToken;
      this.refreshToken = tokens.refreshToken;
    },

    setUserProfile(profile: {
      user_id: string;
      name: string;
      height: string;
      gender: string;
      dob: string;
      group: string;
      email: string;
      profilePicUrl: string;
    }) {
      this.user = profile;
    },

    updateUserProfile(
      updates: Partial<{
        name: string;
        height: string;
        gender: string;
        dob: string;
        group: string;
        profilePicUrl: string;
      }>
    ) {
      this.user = { ...this.user, ...updates };
    },

    // Clear user profile and tokens on logout
    clearUser() {
      this.user = {
        user_id: "",
        name: "",
        height: "",
        gender: "",
        dob: "",
        group: "",
        email: "",
        profilePicUrl: "",
      };
      this.idToken = "";
      this.accessToken = "";
      this.refreshToken = "";
    },
  },
  persist: {
    storage: localStorage,
  },
});
