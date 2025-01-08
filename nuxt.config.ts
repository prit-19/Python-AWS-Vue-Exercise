// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,
  runtimeConfig: {
    pvtVar: "This is pvt variable",
    public: {
      apiBase: process.env.API_BASE_URL,
    },
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
        },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js",
        },
        { src: "https://code.jquery.com/jquery-3.6.0.min.js" },
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
        },
      ],
    },
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    layoutTransition: { name: "layout", mode: "out-in" },
  },

  routeRules: {
    "/": { prerender: true },
  },

  modules: ["@pinia/nuxt", "pinia-plugin-persistedstate/nuxt", "@nuxtjs/color-mode"],
  plugins: ["~/plugins/piniaPersist.ts", "~/plugins/axios.ts"],
});