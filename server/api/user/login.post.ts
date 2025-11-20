// server/api/user/login.post.ts
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabase = await serverSupabaseClient(event)
    const body = await readBody(event)

    const { data, error } = await supabase.auth.signInWithPassword({
        email: body.email,
        password: body.password,
    })

    if (error) {
        event.node.res.statusCode = 500
        return { error: error.message }
    }

    // Vráť user data (id, email)
    return { user: data.user }
})