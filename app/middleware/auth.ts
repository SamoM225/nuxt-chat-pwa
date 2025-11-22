export default defineNuxtRouteMiddleware(async () => {
    const clientUser = useSupabaseUser()

    if (clientUser.value) {
        return
    }

    const { data } = await $fetch('/api/user/userAuth').catch(() => ({ data: null }))

    if (!data?.user) {
        return navigateTo('/login')
    }
})