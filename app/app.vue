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
import { useHead } from 'nuxt/app'
import { usePush } from './../composables/usePush'


const { subscribeToPush } = usePush();

useHead({
  link: [
    { rel: 'apple-touch-icon', href: '/nux192.png' }
  ],
  meta: [
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
  ]
})

const authStore = useAuthStore()
const toastRef = ref(null)
provide('toastRef', toastRef)

onMounted(async () => {
  const vapidPublicKey = 'BGzKdkZ9egapa330wTntDrvL4s0GwDcCTiNuOqqlMnBsgZWwRHoVg8wzs7eCTLG8hkcN4K5Wml73YV-rajxGl6A';
  alert('Requesting permission for Push Notifications...');
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;
    alert('Service Worker ready.');
    const permission = await Notification.requestPermission();
    alert(`Notification permission: ${permission}`);
    if (permission === 'granted') {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidPublicKey
      });
      alert('Push Subscription successful!');
      subscribeToPush(subscription);
      // await fetch('/api/push', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     endpoint: subscription.endpoint,
      //     keys: {
      //       p256dh: subscription.getKey('p256dh') ? btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('p256dh')!))) : null,
      //       auth: subscription.getKey('auth') ? btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('auth')!))) : null
      //     },
      //     expirationTime: subscription.expirationTime,
      //     user_agent: navigator.userAgent
      //   })
      // });
    }
  }
  await authStore.fetchUserData()
})
</script>