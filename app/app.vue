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
  <button @click="returnVapidKeys()">Zobraziť VAPID kľúče</button>
</template>

<script setup lang="ts">
import toastAlert from './components/toastAlert.vue'
import { provide, ref, onMounted } from 'vue'
import { useAuthStore } from '#imports'
import { useHead } from 'nuxt/app'
import { usePush } from './../composables/usePush'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()
const vapidPublicKey = config.public.vapidPublicKey

function returnVapidKeys() {
  alert(`Public Key: ${vapidPublicKey}`)
}

async function sendPushNotification() {
  await $fetch('/api/push/send-test', {
    method: 'POST',
    body: { subscriptionId: 'ab0ac868-1d0a-4646-a5a5-6d61c9249d83' }
  })

}



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

    return
  }

  const perm = await Notification.requestPermission()

  if (perm !== 'granted') return

  try {
    const registration = await navigator.serviceWorker.ready


    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
    })


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


  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;

    const permission = await Notification.requestPermission();

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