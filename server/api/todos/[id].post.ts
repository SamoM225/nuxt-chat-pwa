import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabase = await serverSupabaseClient(event)
    const { id } = event.context.params
    const { data, error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
    if (error) {
        event.node.res.statusCode = 500
        return { error: error.message }
    }
    return { data }
})