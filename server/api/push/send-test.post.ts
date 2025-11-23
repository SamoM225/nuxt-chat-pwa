import webpush from 'web-push'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  webpush.setVapidDetails(
    'mailto:majercik1004@gmail.com',
    config.public.vapidPublicKey,
    config.vapidPrivateKey
  )

  const body = await readBody<{ subscription: any }>(event)

  await webpush.sendNotification(
    body.subscription,
    JSON.stringify({ title: 'Test', body: 'Ahoj' })
  )

  return { ok: true }
})
