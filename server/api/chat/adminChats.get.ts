import { ADMIN_UID } from "~~/utils/chat"
import { serverSupabaseClient } from '#supabase/server'


export default defineEventHandler(async (event) => {
    const supabase = await serverSupabaseClient(event)
    const { data: conversations = [] } = await supabase
        .from('conversations')
        .select('id, contact:contacts ( name, email )')
        .eq('operator_id', ADMIN_UID)
        .order('updated_at', { ascending: false })
    const messagesMap: Record<string, any[]> = {}
    for (const conversation of conversations ?? []) {
        const { data: messages } = await supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', conversation.id)
            .order('created_at', { ascending: true })
        messagesMap[conversation.id] = messages || []
    }


    return { conversations: conversations.map(conversation => ({
        id: conversation.id,
        contactName: conversation.contact?.name ?? 'Unknown',
        contactEmail: conversation.contact?.email ?? '—',
        messages: messagesMap[conversation.id]
    })) }
})