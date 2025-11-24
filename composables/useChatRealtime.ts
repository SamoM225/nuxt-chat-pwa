// composables/useChatRealtime.ts
import type { RealtimeChannel } from '@supabase/supabase-js'

type pushMessage = {
  title: string;
  pushBody: string;
  subscriptionId: string;
}

async function sendPushNotification(message: pushMessage, isAdmin: boolean = false) {
  if (isAdmin) return; // Do not send push notifications for admin messages
  await $fetch('/api/push/send-test', {
    method: 'POST',
    body: message
  })
}

export const useChatRealtime = (
  conversationId: Ref<string>,
  userName?: Ref<string>,
  userEmail?: Ref<string>,
  onConversationCreated?: (id: string) => void,
  isAdmin?: boolean
) => {
  const supabase = useSupabaseClient()
  const messages = ref<any[]>([])
  const newMessage = ref('')
  const channel = ref<RealtimeChannel | null>(null)
  const adminMessage = ref(false)

  const getUserChatId = async (email: string) => {
    const res: any = await $fetch(`/api/chat/getUserId`, {
      method: 'POST',
      body: { email }
    })
    return res?.data?.id || null
  }


  const cleanupChannel = () => {
    if (channel.value) {
      console.log('RT: removing channel', channel.value.topic)
      supabase.removeChannel(channel.value)
      channel.value = null
    }
  }

  const initConversation = async (id: string) => {
    if (process.server) return

    cleanupChannel()

    if (!id) {
      messages.value = []
      return
    }

    console.log('RT: init for conversation', id)

    const res: any = await $fetch(`/api/chat?conversationId=${id}`)
    messages.value = res.messages ?? []

    const ch = supabase
      .channel(`conversation-${id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${id}`
        },
        payload => {
          console.log('RT: payload', payload)
          messages.value.push(payload.new)
        }
      )
      .subscribe(status => {
        console.log('RT: status', status)
      })

    channel.value = ch
  }

  watch(
    conversationId,
    (id) => {
      initConversation(id)
    },
    { immediate: true }
  )

  const sendMessage = async () => {
    if (!newMessage.value) return

    // Set adminMessage flag based on isAdmin
    adminMessage.value = !!isAdmin

    // 1) First message – no conversationId yet
    if (!conversationId.value) {
      if (!userName?.value || !userEmail?.value) {
        console.warn('Missing name/email for first message')
        return
      }

      const res: any = await $fetch('/api/chat', {
        method: 'POST',
        body: {
          name: userName.value,
          email: userEmail.value,
          text: newMessage.value,
        }
      })

      console.log('first message resp', res)

      if (res?.conversationId) {
        onConversationCreated?.(res.conversationId)
      }
      sendPushNotification({
        title: 'New message from customer',
        pushBody: newMessage.value,
        subscriptionId: '747c4052-ed8f-4f4a-bf4c-7a6f8b03ae6f',
      })
      newMessage.value = ''
      return
    }

    // 2) Operator/admin reply
    if (adminMessage.value) {
      await $fetch('/api/chat', {
        method: 'POST',
        body: {
          conversationId: conversationId.value,
          text: newMessage.value,
          adminMessage: true
        }
      })
      adminMessage.value = false
      sendPushNotification({
        title: 'New message from customer',
        pushBody: newMessage.value,
        subscriptionId: '747c4052-ed8f-4f4a-bf4c-7a6f8b03ae6f'
      })
      newMessage.value = ''
      return
    }

    // 3) Existing conversation
    await $fetch('/api/chat', {
      method: 'POST',
      body: {
        conversationId: conversationId.value,
        text: newMessage.value
      }
    })
    sendPushNotification({
      title: 'New message from customer',
      pushBody: newMessage.value,
      subscriptionId: '747c4052-ed8f-4f4a-bf4c-7a6f8b03ae6f'
    })
    newMessage.value = ''
  }

  onBeforeUnmount(() => {
    cleanupChannel()
  })

  return { messages, newMessage, adminMessage, sendMessage, getUserChatId }
}
