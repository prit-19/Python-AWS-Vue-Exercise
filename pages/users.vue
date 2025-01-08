<template>
  <div class="container">
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Height</th>
            <th scope="col">DOB</th>
            <th scope="col">Group</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          <tr v-for="user of users" :key="user.user_id">
            <td>
              {{ user.user_id || "" }}
            </td>
            <td>
              {{ user.name || "" }}
            </td>
            <td>
              {{ user.email || "" }}
            </td>
            <td>
              {{ user.gender || "" }}
            </td>
            <td>
              {{ user.height || "" }}
            </td>
            <td>
              {{ user.dob || "" }}
            </td>
            <td>
              {{ user.group || "" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAllUsers } from "~/server/users";

definePageMeta({
  layout: "layout-1",
  middleware: ["admin-user-auth"],
});

const users: any = ref([]);

onMounted(async () => {
  const allUsers: any = await getAllUsers();
  users.value = allUsers;
});
</script>

<style></style>
