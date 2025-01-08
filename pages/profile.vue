<template>
  <div class="container pt-4">
    <div class="img-container"><ProfilePic /></div>
    <section class="mt-4">
      <h3>Details</h3>

      <div class="profile-details mt-4">
        <p>
          <b> Name </b>:
          {{ userStore?.user?.name || "Not mentioned" }}
        </p>
        <p>
          <b> Email </b>:
          {{ userStore?.user?.email || "Not mentioned" }}
        </p>
        <p>
          <b> Height </b>:
          {{ userStore?.user?.height || "Not mentioned" }}
        </p>
        <p>
          <b> Gender </b>:
          {{ userStore?.user?.gender || "Not mentioned" }}
        </p>
        <p>
          <b> DOB </b>:
          {{ userStore?.user?.dob || "Not mentioned" }}
        </p>
        <p>
          <b> Group </b>:
          {{ userStore?.user?.group || "Not mentioned" }}
        </p>

        <!-- Button trigger modal -->
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          @click="showModal = true"
        >
          Edit
        </button>
      </div>
    </section>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Update Details
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="close-modal"
            ></button>
          </div>
          <div class="modal-body">
            <UpdateUser @userUpdated="updateUpdatedSuccessfully" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "layout-1",
  middleware: "standard-user-auth",
});

const showModal = ref(false);

const userStore = useUserStore();

const updateUpdatedSuccessfully = () => {
  document.getElementById("close-modal")?.click();
};
</script>

<style></style>
