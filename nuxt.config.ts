// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/image-edge"],
  runtimeConfig: {
    FIREBASE: process.env.FIREBASE,
    FIREBASEURL: process.env.FIREBASEURL,
    public: {
      siteURL: process.env.BASEURL,
    },
  },
  css: ["~/assets/css/style.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  image: {},
});
