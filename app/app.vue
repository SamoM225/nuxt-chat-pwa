<template>
  <div class="min-h-screen bg-transparent transition-colors duration-500">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <toastAlert ref="toastRef" />
  </div>
</template>

<script>
import toastAlert from './components/toastAlert.vue'
import { provide, ref } from 'vue'

export default {
  components: { toastAlert },
  setup() {
    const toastRef = ref(null)
    provide('toastRef', toastRef)
    return { toastRef }
  }
}
</script>