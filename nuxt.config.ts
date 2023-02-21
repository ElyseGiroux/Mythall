// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: "vercel-edge",
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },
  vite: {
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false, // Fix a bug with vercel functions
    },
  },
  css: ["~/assets/css/style.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
