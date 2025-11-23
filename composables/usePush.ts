export const usePush = () => {
    const subscribeToPush = async (subscription: PushSubscription,) => {
        await fetch('/api/push/save-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                endpoint: subscription.endpoint,
                keys: {
                    p256dh: subscription.getKey('p256dh') ? btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('p256dh')!))) : null,
                    auth: subscription.getKey('auth') ? btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('auth')!))) : null
                },
                expirationTime: subscription.expirationTime,
                user_agent: navigator.userAgent
            })
        })
    }

    return {
        subscribeToPush
    }
}