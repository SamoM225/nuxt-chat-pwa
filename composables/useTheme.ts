import { onMounted } from 'vue'
import { useState } from '#app'

type ThemeMode = 'light' | 'dark'

export const useTheme = () => {
  const theme = useState<ThemeMode>('theme-mode', () => 'dark')

  const applyTheme = (value: ThemeMode) => {
    if (!import.meta.client) {
      return
    }

    const root = document.documentElement
    root.classList.toggle('dark', value === 'dark')
    root.dataset.theme = value
    root.style.colorScheme = value === 'dark' ? 'dark' : 'light'
    window.localStorage.setItem('nuxt-theme', value)
  }

  const setTheme = (value: ThemeMode) => {
    theme.value = value
    applyTheme(value)
  }

  const toggleTheme = () => {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  onMounted(() => {
    const stored = window.localStorage.getItem('nuxt-theme') as ThemeMode | null
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored)
      return
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
  })

  return { theme, toggleTheme, setTheme }
}
