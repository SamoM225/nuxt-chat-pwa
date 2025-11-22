import { onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';

export function useInactivityLogout(timeout = 15 * 60 * 1000) {
    let timer: ReturnType<typeof setTimeout>;
    const authStore = useAuthStore();

    const resetTimer = () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            authStore.logout()
        }, timeout)
    }

    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];

    onMounted(() => {
        events.forEach(event =>
            window.addEventListener(event, resetTimer)
        )
        resetTimer()
    })

    onUnmounted(() => {
        events.forEach(event =>
            window.removeEventListener(event, resetTimer)
        )
        clearTimeout(timer)
    })
}