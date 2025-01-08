// plugins/piniaPersist.ts

import { defineNuxtPlugin } from "#app";
import piniaPersist from "pinia-plugin-persistedstate";

export default defineNuxtPlugin((nuxtApp) => {
  const pinia: any = nuxtApp.$pinia; // Access Pinia instance
  pinia.use(piniaPersist); // Register the persistence plugin
});
