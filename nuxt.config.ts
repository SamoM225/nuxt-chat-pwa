import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  app: {
    baseURL: process.env.NUXT_PUBLIC_BASE_URL || '/'
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@vite-pwa/nuxt'
  ],
  pwa: {
    // vyhoď strategies: 'injectManifest', srcDir, filename
    registerType: 'autoUpdate',
    manifest: {
      name: 'Chat app nuxt',
      short_name: 'Chat nuxt',
      description: 'A chat application built with Nuxt.js and Supabase',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      lang: 'en'
    },
    icon: {
      source: './app/assets/icontouch.png',
      sizes: [64, 120, 144, 152, 192, 384, 512],
      targetDir: 'icons',
      purpose: ['any', 'maskable']
    },
    workbox: {
      importScripts: ['/sw-custom.js'],
      runtimeCaching: [
        {
          handler: 'CacheFirst',
          options: {
            cacheName: 'cdn-cache',
            expiration: {
              maxAgeSeconds: 300,
              maxEntries: 10
            }
          },
          urlPattern: 'https://my-cdn.com/.*'
        }
      ]
    }
  },
  css: ['./app/assets/css/main.css'],
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
    redirect: false
  },
  // nitro: {
  //   preset: 'github-pages'
  // },
  vite: {
    plugins: [tailwindcss()]
  }
})