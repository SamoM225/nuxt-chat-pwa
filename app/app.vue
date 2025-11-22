<template>
  <div class="min-h-screen bg-transparent transition-colors duration-500">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <toastAlert ref="toastRef" />
    <WhatsAppWidget />
  </div>
</template>

<script setup lang="ts">
import toastAlert from './components/toastAlert.vue'
import { provide, ref, onMounted } from 'vue'
import { useAuthStore } from '#imports'

const authStore = useAuthStore()
const toastRef = ref(null)
provide('toastRef', toastRef)

onMounted(async () => {
  await authStore.fetchUserData()
})
</script>