import { storeToRefs } from 'pinia'
import { useAuthStore } from '#imports'

export const useUser = () => {
	const authStore = useAuthStore()
	const session = useSupabaseSession()

	const {
		user,
		isLoggedIn,
		loading,
		errorMessage,
		otpSent,
		lastEmail,
        userRole,
        username,
		about,
        firstName,
        lastName,
	} = storeToRefs(authStore)

	const logout = async () => {
		await authStore.logout()
	}

    const fetchUserData = async () => {
        await authStore.fetchUserData()
    }

	const updateUserData = async (username?: string, about?: string, firstName?: string, lastName?: string) => {
		await $fetch('/api/user/update', {
			method: 'POST',
			body: {
				username,
				aboutme: about,
				firstName,
				lastName,
			},
		})
		authStore.setUserData({ username, about, firstName, lastName })
	}

	return {
		user,
		session,
		isLoggedIn,
		loading,
		errorMessage,
		otpSent,
		lastEmail,
        userRole,
        username,
		about,
        firstName,
        lastName,
		logout,
        fetchUserData,
		updateUserData,
	}
}