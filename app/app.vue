<template>
  <div class="min-h-screen bg-transparent transition-colors duration-500">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '../composables/useTheme'

const { theme } = useTheme()

useHead(() => ({
  htmlAttrs: {
    class: theme.value === 'dark' ? 'dark' : undefined,
    'data-theme': theme.value
  },
  bodyAttrs: {
    class: [
      'transition-colors duration-500 font-[\"Space_Grotesk\",Inter,sans-serif] selection:bg-emerald-500/40 selection:text-emerald-50',
      theme.value === 'dark'
        ? 'bg-slate-950 text-emerald-50'
        : 'bg-emerald-50 text-slate-900'
    ].join(' ')
  }
}))
</script>