import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabase = await serverSupabaseClient(event)
    const isLoggedIn = await supabase.auth.getUser() ?? null
    return isLoggedIn
})