<template>
  <div class="container">
    <h4 class="mt-4">Login</h4>
    <div class="row">
      <form @submit="login" class="col-6">
        <div class="mt-4 signup-form">
          <!-- Email Input -->
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <Field
              type="email"
              name="email"
              class="form-control"
              id="exampleInputEmail1"
              placeholder="Enter email"
              aria-disabled="true"
            />
            <ErrorMessage name="email" class="text-danger" />
          </div>

          <!-- Password Input -->
          <div class="form-group mt-4 mb-2">
            <label for="exampleInputPassword1">Password</label>
            <Field
              type="password"
              name="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
            <ErrorMessage name="password" class="text-danger" />
          </div>

          <small class="mt-4"
            >Don't have an account?
            <span> <NuxtLink to="/signup"> Register Now </NuxtLink></span>
          </small>
          <br />

          <button type="submit" class="btn btn-primary mt-4">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth-layout",
});
import { Field, Form, ErrorMessage, useForm } from "vee-validate";
import * as Yup from "yup";
import { toast } from "vue3-toastify";
import { loginUser, signupUser } from "~/server/auth";
import { useUserStore } from "~/stores/userStore";
import { getUserProfile } from "~/server/users";

const userStore = useUserStore();
const router = useRouter();

// Define validation schema using Yup
const schema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// Set up form validation with VeeValidate
const { handleSubmit } = useForm({
  validationSchema: schema,
});

const login = handleSubmit(async (value) => {
  const res: any = await loginUser(value);
  if (res?.statusCode !== 200) {
    return;
  }
  userStore.setTokens({
    idToken: res?.id_token || "",
    accessToken: res?.access_token || "",
    refreshToken: res?.refresh_token || "",
  });

  const userDetail: any = await getUserProfile();
  userStore.setUserProfile({
    user_id: userDetail?.user_id || "",
    name: userDetail?.name || "",
    height: userDetail?.height || "",
    gender: userDetail?.gender || "",
    dob: userDetail?.dob || "",
    group: userDetail?.group || "",
    email: userDetail?.email || "",
    profilePicUrl: userDetail?.profilePicUrl || "",
  });

  router.push("/");
  toast.success("Logged in successfully");
});
</script>

<style scoped>
.text-danger {
  color: red;
  font-size: 0.9em;
}
</style>
