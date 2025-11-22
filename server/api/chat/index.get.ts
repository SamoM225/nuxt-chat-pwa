import { serverSupabaseClient } from '#supabase/server'
import { getQuery } from 'h3'

export default defineEventHandler(async (event) => {
    const supabase = await serverSupabaseClient(event)
    const { conversationId } = getQuery(event)

    if (!conversationId || typeof conversationId !== 'string') {
        event.node.res.statusCode = 400
        return { error: 'Missing conversationId' }
    }

    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })

    if (error) {
        event.node.res.statusCode = 500
        return { error: error.message }
    }
    return { messages: data }
})