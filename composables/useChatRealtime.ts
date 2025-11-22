// composables/useChatRealtime.ts
import type { RealtimeChannel } from '@supabase/supabase-js'

export const useChatRealtime = (
  conversationId: Ref<string>,
  userName?: Ref<string>,
  userEmail?: Ref<string>,
  onConversationCreated?: (id: string) => void
) => {
  const supabase = useSupabaseClient()
  const messages = ref<any[]>([])
  const newMessage = ref('')
  const channel = ref<RealtimeChannel | null>(null)

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

    // 1) prvá správa – ešte nemáme conversationId
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
          text: newMessage.value
        }
      })

      console.log('first message resp', res)

      if (res?.conversationId) {
        onConversationCreated?.(res.conversationId)
      }

      newMessage.value = ''
      return
    }

    // 2) existujúca konverzácia
    await $fetch('/api/chat', {
      method: 'POST',
      body: {
        conversationId: conversationId.value,
        text: newMessage.value
      }
    })

    newMessage.value = ''
  }

  onBeforeUnmount(() => {
    cleanupChannel()
  })

  return { messages, newMessage, sendMessage }
}
