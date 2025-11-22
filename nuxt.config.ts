import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  app: {
    baseURL: process.env.NUXT_PUBLIC_BASE_URL || '/'
  },
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/supabase', '@pinia/nuxt'],
  css: ['./app/assets/css/main.css'],
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
    redirect: false
  },
  nitro: {
    preset: 'github-pages'
  },
  vite: {
    plugins: [tailwindcss()]
  }
})