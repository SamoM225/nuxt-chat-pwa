import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabase = await serverSupabaseClient(event)
    const body = await readBody(event)

    const { data, error } = await supabase
        .from('contacts')
        .select('id')
        .eq('email', body.email)
        .single()

    if (error || !data) {
        event.node.res.statusCode = 500
        return { error: error?.message || 'Failed to fetch user ID' }
    }
    return { data : { id: data?.id || null } }
})