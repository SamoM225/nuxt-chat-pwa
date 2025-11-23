import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const supabase = await serverSupabaseClient(event);

    const user = event.context.auth?.user;
    const user_id = user?.id;

    const { error } = await supabase
        .from('pwa_subscriptions')
        .upsert([{
            user_id,
            endpoint: body.endpoint,
            p256dh: body.keys?.p256dh,
            auth: body.keys?.auth,
            expiration_time: body.expirationTime || null,
            user_agent: body.user_agent || null,
            is_active: true,
            updated_at: new Date().toISOString()
        }], { onConflict: ['endpoint']})

    if (error) {
        return { success: false, error }
    }

    return { success: true }
})