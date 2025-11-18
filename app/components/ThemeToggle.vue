<template>
  <button
    type="button"
    class="group relative inline-flex items-center gap-3 rounded-full border border-emerald-400/40 px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-500 transition hover:border-emerald-300/80"
    :aria-pressed="theme === 'dark'"
    :aria-label="`Switch to ${nextTheme} mode`"
    @click="toggleTheme"
  >
    <span class="absolute inset-0 rounded-full bg-emerald-500/10 opacity-0 blur-xl transition group-hover:opacity-100" aria-hidden="true"></span>
    <span class="relative flex items-center gap-2 text-glow">
      <span class="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(0,220,130,0.9)] transition group-hover:scale-125"></span>
      <span>{{ themeLabel }}</span>
    </span>
    <span class="relative text-xs font-medium tracking-[0.35em] text-emerald-200/80 text-glow-strong">
      {{ nextThemeText }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '../../composables/useTheme'

const { theme, toggleTheme } = useTheme()

const themeLabel = computed(() => (theme.value === 'dark' ? 'NUXT NIGHT' : 'NUXT GLOW'))
const nextThemeText = computed(() => (theme.value === 'dark' ? 'LIGHT' : 'DARK'))
const nextTheme = computed(() => (theme.value === 'dark' ? 'light' : 'dark'))
</script>
