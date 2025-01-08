<template>
  <div class="container">
    <main>this is home page</main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "layout-1",
  middleware: ["auth"],
});
</script>

<style></style>
