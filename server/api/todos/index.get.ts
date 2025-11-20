import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabase = await serverSupabaseClient(event)
    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('id', { ascending: true })
    if (error) {
        event.node.res.statusCode = 500
        return { error: error.message }
    }
    console.log('TODOS DATA =', data);
    return { data }


})