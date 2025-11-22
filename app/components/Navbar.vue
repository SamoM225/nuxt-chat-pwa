<template>
  <header
    class="sticky top-0 z-[60] border-b border-emerald-400/15 bg-white/85 backdrop-blur-xl transition dark:border-emerald-300/10 dark:bg-slate-950/70">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-6">
      <div class="flex w-full items-center gap-4">
        <div class="flex flex-1 items-center gap-3">
          <span class="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-500 text-glow">Signal Forge</span>
          <p class="hidden text-sm text-emerald-900/70 dark:text-emerald-100/70 sm:block">Web development lab</p>
        </div>

        <nav class="hidden flex-1 items-center justify-center gap-6 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-emerald-700 dark:text-emerald-100 md:flex">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-glow transition hover:text-emerald-300"
          >
            {{ link.label }}
          </NuxtLink>
          <NuxtLink v-if="isLoggedIn" to="/profile" class="text-glow transition hover:text-emerald-300">
            Profile
          </NuxtLink>
          <NuxtLink v-if="!isLoggedIn" to="/login" class="text-glow transition hover:text-emerald-300">
            Login
          </NuxtLink>
          <button v-else @click="logout" class="text-glow transition hover:text-emerald-300">Logout</button>
        </nav>

        <div class="flex items-center gap-2 md:gap-4">
          <button
            ref="chatButtonRef"
            @click="toggleChat"
            class="hidden rounded-full border border-emerald-200/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-500 text-glow-strong transition hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-emerald-200/20 dark:text-emerald-200 dark:hover:border-emerald-200/40 md:inline-flex"
          >
            Let's talk
          </button>
          <button
            @click="toggleTheme"
            class="rounded-full border border-emerald-200/70 bg-emerald-50/70 p-2 transition hover:bg-emerald-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
          >
            <span class="sr-only">Toggle dark mode</span>
            <svg v-if="!isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="5" fill="currentColor" />
              <g stroke="currentColor" stroke-width="2">
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </g>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path fill="currentColor" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
            </svg>
          </button>
          <button
            class="md:hidden"
            @click="toggleMenu"
            :aria-expanded="menuOpen"
            aria-label="Toggle navigation"
          >
            <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <Transition name="fade-overlay">
      <div v-if="menuOpen" class="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm md:hidden" @click="closeMenu" />
    </Transition>

    <Transition name="mobile-drawer">
      <nav v-if="menuOpen" class="md:hidden">
        <div class="relative z-50 mx-auto max-w-6xl px-4 pb-6">
          <div class="rounded-2xl border border-emerald-200/40 bg-white/95 p-6 shadow-2xl shadow-emerald-500/10 dark:border-slate-800 dark:bg-slate-950/95">
            <div class="flex items-center justify-between pb-6">
              <div>
                <p class="text-xs uppercase tracking-[0.35em] text-emerald-500">Signal Forge</p>
                <p class="text-sm text-slate-500 dark:text-slate-300">Web development lab</p>
              </div>
              <button class="rounded-full border border-emerald-200/60 p-2" @click="closeMenu" aria-label="Close menu">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul class="flex flex-col gap-4 text-lg font-semibold text-emerald-800 dark:text-emerald-100">
              <li v-for="link in navLinks" :key="`mobile-${link.to}`">
                <NuxtLink :to="link.to" class="flex items-center justify-between" @click="handleNavClick">
                  {{ link.label }}
                  <span aria-hidden="false">→</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink v-if="isLoggedIn" to="/profile" class="flex items-center justify-between" @click="handleNavClick">
                  Profile
                  <span aria-hidden="false">→</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink v-if="!isLoggedIn" to="/login" class="flex items-center justify-between" @click="handleNavClick">
                  Login
                  <span aria-hidden="true">→</span>
                </NuxtLink>
                <button v-else class="flex w-full items-center justify-between" @click="handleLogout">
                  Logout
                  <span aria-hidden="true">→</span>
                </button>
              </li>
            </ul>
            <div class="mt-6 space-y-3">
              <button
                class="block w-full rounded-full border border-emerald-200/60 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.35em] text-emerald-500 text-glow-strong"
                @click="toggleChatAndClose"
              >
                Let's talk
              </button>
              <button
                class="flex w-full items-center justify-center rounded-full border border-emerald-200/60 px-4 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-500"
                @click="toggleThemeAndClose"
              >
                Toggle theme
              </button>
            </div>
          </div>
        </div>
      </nav>
    </Transition>

    <Transition name="chat-zoom">
      <ChatWidget 
        v-if="isChatOpen" 
        :initial-x="chatPosition.x" 
        :initial-y="chatPosition.y"
        :style="{ transformOrigin: transformOrigin }"
        @close="isChatOpen = false"
        @update:position="updateChatPosition"
      />
    </Transition>
  </header>
</template>
<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { useRoute } from '#imports'
import { useTheme } from '~~/composables/useTheme'
import { useUser } from '~~/composables/useUser'
import ChatWidget from './ChatWidget.vue'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/#services' },
  { label: 'Process', to: '/#process' },
  { label: 'About', to: '/about' },
]
const menuOpen = ref(false)
const isChatOpen = ref(false)
const chatButtonRef = ref<HTMLElement | null>(null)
const chatPosition = ref({ x: 0, y: 0 })
const transformOrigin = ref('top right')

const route = useRoute()
const { logout, isLoggedIn } = useUser()
const { theme, toggleTheme } = useTheme()
const isDarkMode = computed(() => theme.value === 'dark')

onMounted(() => {
  // Default position: bottom right with some margin
  chatPosition.value = {
    x: window.innerWidth - 450 - 20, // width 450, margin 20
    y: window.innerHeight - 600 - 20 // height 600, margin 20
  }
})

const closeMenu = () => {
  menuOpen.value = false
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const toggleChat = () => {
  if (!isChatOpen.value) {
    // Opening
    if (chatButtonRef.value) {
       const rect = chatButtonRef.value.getBoundingClientRect()
       const centerX = rect.left + rect.width / 2
       const centerY = rect.top + rect.height / 2
       const ox = centerX - chatPosition.value.x
       const oy = centerY - chatPosition.value.y
       transformOrigin.value = `${ox}px ${oy}px`
    }
    isChatOpen.value = true
  } else {
    // Closing
    if (chatButtonRef.value) {
       const rect = chatButtonRef.value.getBoundingClientRect()
       const centerX = rect.left + rect.width / 2
       const centerY = rect.top + rect.height / 2
       const ox = centerX - chatPosition.value.x
       const oy = centerY - chatPosition.value.y
       transformOrigin.value = `${ox}px ${oy}px`
    }
    isChatOpen.value = false
  }
}

const updateChatPosition = (pos: { x: number, y: number }) => {
  chatPosition.value = pos
}

const toggleChatAndClose = () => {
  toggleChat()
  closeMenu()
}

const handleNavClick = () => {
  closeMenu()
}

const handleLogout = async () => {
  await logout()
  closeMenu()
}

const toggleThemeAndClose = () => {
  toggleTheme()
  closeMenu()
}

watch(
  () => route.fullPath,
  () => {
    closeMenu()
  }
)
</script>
<style scoped>
.chat-zoom-enter-active,
.chat-zoom-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.chat-zoom-enter-from,
.chat-zoom-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>
