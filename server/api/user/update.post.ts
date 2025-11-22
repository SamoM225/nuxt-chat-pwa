import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabase = await serverSupabaseClient(event)
    const user = await serverSupabaseUser(event)

    if (!user) {
        event.node.res.statusCode = 401
        return { error: 'no_user' }
    }
    const body = await readBody(event)

    const updates: any = {
        username: body.username,
        aboutme: body.aboutme,
        first_name: body.firstName,
        last_name: body.lastName,
        updated_at: new Date().toISOString()
    }


    const {data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .select()
        .eq('id', user.sub)
    if (data) {
        console.log('User data updated:', data)
    }
    if (error) {
        event.node.res.statusCode = 500
        return { error: error.message }
    }
})