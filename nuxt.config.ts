export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL!,
    adminKey: process.env.ADMIN_KEY!,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "shadcn-nuxt"
  ],
  googleFonts: {
    families: {
      Raleway: true,
      Poppins: true,
    }
  }
})
