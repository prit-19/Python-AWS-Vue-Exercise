<template>
  <div class="container">
    <h4 class="mt-4">Sign Up</h4>
    <div class="row">
      <form @submit="signup" class="col-6">
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
            >Already have an account?
            <span> <NuxtLink to="/login"> Login</NuxtLink></span>
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
import { signupUser } from "~/server/auth";
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

const signup = handleSubmit(async (value) => {
  const response = await signupUser(value);
  if (response) {
    toast.success(value);
    router.push("verify-email");
  }
});
</script>

<style scoped>
.text-danger {
  color: red;
  font-size: 0.9em;
}
</style>
