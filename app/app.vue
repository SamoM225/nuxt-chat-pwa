<template>
  <div class="min-h-screen bg-transparent transition-colors duration-500">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <toastAlert ref="toastRef" />
    <WhatsAppWidget />
  </div>
  <button @click="sendPushNotification">Odoslať push notifikáciu</button>
  <break></break>
  <break></break>
  <button @click="enableNotifications">Povoliť notifikácie</button>
  <break></break>
</template>

<script setup lang="ts">
import toastAlert from './components/toastAlert.vue'
import { provide, ref, onMounted } from 'vue'
import { useAuthStore } from '#imports'
import { useHead } from 'nuxt/app'
import { usePush } from './../composables/usePush'

async function sendPushNotification() {
  await $fetch('/api/push/send-test', {
    method: 'POST',
    body: { subscriptionId: 'ab0ac868-1d0a-4646-a5a5-6d61c9249d83' }
  })

}



const vapidPublicKey = 'BGzKdkZ9egapa330wTntDrvL4s0GwDcCTiNuOqqlMnBsgZWwRHoVg8wzs7eCTLG8hkcN4K5Wml73YV-rajxGl6A';
const { subscribeToPush } = usePush();
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

async function enableNotifications() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    alert('Push not supported')
    return
  }

  const perm = await Notification.requestPermission()
  alert(`Notification permission: ${perm}`)
  if (perm !== 'granted') return

  try {
    const registration = await navigator.serviceWorker.ready
    alert('Service Worker ready.')

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
    })

    alert('Push Subscription successful!')
    subscribeToPush(subscription)
  } catch (e) {
    alert('Subscribe failed: ' + (e as Error).message)
  }
}

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