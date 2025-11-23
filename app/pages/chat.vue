<template>
  <div v-if="isMobile">
    <div class="min-h-screen flex flex-col justify-center items-center bg-emerald-50 dark:bg-slate-900">
      <div class="w-full max-w-sm p-4">
        <h1 class="text-2xl font-bold text-center mb-4 text-emerald-700 dark:text-emerald-200">Chat PWA</h1>
        <ChatWidget />
      </div>
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="p-8 rounded-xl bg-white shadow-xl text-center">
      <h2 class="text-xl font-semibold text-emerald-600">Táto stránka je dostupná len na mobilných zariadeniach.</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ChatWidget from '../components/ChatWidget.vue'

const isMobile = ref(false)


function detectMobile() {
  const ua = navigator.userAgent
  isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
}

onMounted(() => {
  detectMobile()
})
</script>
