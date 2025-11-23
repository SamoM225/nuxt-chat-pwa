import webpush from 'web-push';
import { serverSupabaseClient } from '#supabase/server';

const vapidPublicKey = process.env.VAPID_PUBLIC_KEY || '';
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || '';

webpush.setVapidDetails('mailto:majerciks1004@gmail.com', vapidPublicKey, vapidPrivateKey);

export default defineEventHandler(async (event) => {
    const body = await readBody<{
        subscriptionId: string;
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
            title: 'Test notification', body: 'Test push notification from server to the operator on PWA app.', url: '/'
    })
    )
    return { ok: true };
})