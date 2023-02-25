// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/image-edge"],
  runtimeConfig: {
    FIREBASE: process.env.FIREBASE,
    public: {
      siteURL: process.env.BASEURL,
      firebaseApiKey: process.env.FIREBASE_API_KEY,
    },
  },
  routeRules: {
    "/generateur/**": { ssr: false }, // Generateur is SPA only - No SEO
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
