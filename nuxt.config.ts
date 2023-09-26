export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  css: [
    "@oruga-ui/oruga-next/src/scss/oruga-full-vars.scss",
    "/assets/sass/style.scss",
  ],
  devtools: { enabled: true },
});
