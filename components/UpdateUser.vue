<template>
  <div>
    <form @submit="onSubmit">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <Field id="name" name="name" class="form-control" />
        <ErrorMessage name="name" class="text-danger" />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <Field id="email" name="email" type="email" class="form-control" />
        <ErrorMessage name="email" class="text-danger" />
      </div>

      <div class="mb-3">
        <label for="height" class="form-label">Height (cm)</label>
        <Field id="height" name="height" type="number" class="form-control" />
        <ErrorMessage name="height" class="text-danger" />
      </div>

      <div class="mb-3">
        <label for="gender" class="form-label">Gender</label>
        <Field as="select" id="gender" name="gender" class="form-select">
          <option value="" disabled>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Field>
        <ErrorMessage name="gender" class="text-danger" />
      </div>

      <div class="mb-3">
        <label for="dob" class="form-label">Date of Birth</label>
        <Field id="dob" name="dob" type="date" class="form-control" />
        <ErrorMessage name="dob" class="text-danger" />
      </div>

      <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/userStore";
import { useForm, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { updateUserProfile } from "~/server/users";

// Access user store
const userStore = useUserStore();

const emit = defineEmits<{
  (event: "userUpdated", data: any): void;
}>();

// Validation schema using Yup
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  height: yup
    .number()
    .required("Height is required")
    .positive("Must be positive"),
  gender: yup.string().required("Gender is required"),
  dob: yup.date().required("Date of birth is required"),
  group: yup.string().required("Group is required"),
});

// Set up form validation with initial values and schema
const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    name: userStore.user.name || "",
    email: userStore.user.email || "",
    height: userStore.user.height || null,
    gender: userStore.user.gender || "",
    dob: userStore.user.dob || null,
    group: userStore.user.group || "",
  },
});

// Handle form submission
const onSubmit = handleSubmit(async (values: any) => {
  await updateUserProfile(userStore?.user?.user_id, values);
  userStore.updateUserProfile(values);
  emit("userUpdated", values);
});
</script>

<style scoped>
.text-danger {
  font-size: 0.875rem;
}
</style>
