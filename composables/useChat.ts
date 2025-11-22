import { serverSupabaseClient } from "#supabase/server"

type SendResponse = {
    conversationId: string
    name: string
    email: string
    userId: string
}

type FetchMessagesResponse = {
    messages: Array<Record<string, any>>
}

type FetchConversationsResponse = {
    conversations: ConversationHead[]
}

export type ConversationHead = {
    id: string
    contactName: string
    contactEmail: string
}


export const useChat = () => {
    const chat = useChatStore()
    const supabase = useSupabaseClient()

    const send = async (name: string, email: string, text: string, operatorId?: string) => {
        const response = await $fetch<SendResponse>('/api/chat', {
            method: 'POST',
            body: { name, email, text, operatorId }
        })
        
        chat.setUser(response.name, response.email, response.userId)
        chat.setConversation(response.conversationId)
        if (operatorId) {
            const conversations = await fetchConversations(operatorId)
            chat.setAdminConversations(conversations)
        }
    }

    const fetchMessages = async (conversationId: string) => {
        const { messages } = await $fetch<FetchMessagesResponse>('/api/chat', {
            query: { conversationId }
        })
        return messages
    }

    const fetchConversations = async (operatorId: string) => {
        const { conversations } = await $fetch<FetchConversationsResponse>('/api/chat/conversations', {
            query: { operatorId }
        })
        return conversations
    }
    



    return { send, fetchMessages, fetchConversations }
}