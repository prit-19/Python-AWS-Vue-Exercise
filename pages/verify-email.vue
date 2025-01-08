<template>
  <div class="container">
    <h4 class="mt-4">Confirm Email Verification</h4>
    <div class="row">
      <form @submit="confirmEmail" class="col-6">
        <div class="mt-4 verification-form">
          <!-- Email Input -->
          <div class="form-group">
            <label for="email">Email address</label>
            <Field
              type="email"
              name="email"
              class="form-control"
              id="email"
              placeholder="Enter your email"
            />
            <ErrorMessage name="email" class="text-danger" />
          </div>

          <!-- Verification Code Input -->
          <div class="form-group mt-4">
            <label for="verificationCode">Verification Code</label>
            <Field
              type="text"
              name="verificationCode"
              class="form-control"
              id="verificationCode"
              placeholder="Enter the verification code"
            />
            <ErrorMessage name="verificationCode" class="text-danger" />
          </div>

          <button type="submit" class="btn btn-primary mt-4">Verify</button>
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
import { verifyEmail } from "~/server/auth";
const router = useRouter();

// Define validation schema using Yup
const schema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  verificationCode: Yup.string()
    .length(6, "Verification code must be 6 characters")
    .required("Verification code is required"),
});

// Set up form validation with VeeValidate
const { handleSubmit } = useForm({
  validationSchema: schema,
});

const confirmEmail = handleSubmit(async (values) => {
  try {
    const response: any = await verifyEmail({
      email: values.email,
      confirmation_code: values.verificationCode,
    });
    if (response?.statusCode === 200) {
      toast.success(
        "Email verified successfully. Redirecting to login page..."
      );
      setTimeout(() => {}, 1000);
      router.push("/login");
    }
  } catch (error) {
    toast.error("Failed to verify email. Please try again.");
  }
});
</script>

<style>
.text-danger {
  color: red;
  font-size: 0.9em;
}
</style>
