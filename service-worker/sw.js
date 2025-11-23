self.addEventListener('push', (event: any) => {
  const data = event.data ? event.data.json() : {}
  const title = data.title || 'Notification'
  const options = {
    body: data.body || '',
    data: { url: data.url || '/' }
  }

  event.waitUntil((self as any).registration.showNotification(title, options))
})

self.addEventListener('notificationclick', (event: any) => {
  event.notification.close()
  const url = event.notification.data?.url || '/'
  event.waitUntil((self as any).clients.openWindow(url))
})
