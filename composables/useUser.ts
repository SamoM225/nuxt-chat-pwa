import { useUserStore } from '../app/stores/userStore'

export const useUser = () => {
    const userStore = useUserStore()

    const login = async (email: string, password: string) => {
        const res = await $fetch('/api/user/login', {
            method: 'POST',
            body: { email, password }
        })
        if('user' in res && res.user) {
            userStore.setUser(res.user.id, res.user.email ?? '')
        } else if ('error' in res && res.error) {
            throw new Error(res.error)
        }
    }


    const logout = () => {
        userStore.logout()
        const supabase = useSupabaseClient()
        supabase.auth.signOut()
    }

    return {
        userStore,
        login,
        logout
    }
}