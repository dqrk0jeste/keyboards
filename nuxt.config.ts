export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL!,
    adminKey: process.env.ADMIN_KEY!,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,
  },
  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "shadcn-nuxt"
  ],
  googleFonts: {
    families: {
      Raleway: true,
      Poppins: true,
    }
  },
  routeRules: {
    "/": {
      prerender: true,
    },
    "/orders": {
      ssr: false,
    },
    "/form": {
      ssr: true,
    },
    "/admin/**": {
      ssr: false,
    },
  }
})
