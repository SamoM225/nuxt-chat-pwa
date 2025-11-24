import webpush from 'web-push';
import { serverSupabaseClient } from '#supabase/server';

const config = useRuntimeConfig();
const vapidPublicKey = config.public.vapidPublicKey;
const vapidPrivateKey = config.vapidPrivateKey;

webpush.setVapidDetails('mailto:majerciks1004@gmail.com', vapidPublicKey, vapidPrivateKey);

export default defineEventHandler(async (event) => {
    const body = await readBody<{
        subscriptionId: string;
        title: string;
        pushBody: string;
    }>(event);

    const supabase = await serverSupabaseClient(event);
    const { data, error } = await supabase
        .from('pwa_subscriptions')
        .select('*')
        .eq('id', body.subscriptionId)
        .single();

    if (error || !data) {
        throw createError({ statusCode: 404, statusMessage: 'Subscription not found' });
    }

    const subscription = {
        endpoint: data.endpoint,
        keys: {
            p256dh: data.p256dh,
            auth: data.auth
        }
    }

    await webpush.sendNotification(
        subscription as any,
        JSON.stringify({
            title: body.title, body: body.pushBody, url: '/'
        })
    )
    return { ok: true };
})

