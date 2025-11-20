<template>
    <div class="min-h-screen flex flex-col justify-center items-center sm:py-12">
        <div class="p-8 xs:p-0 mx-auto md:w-full md:max-w-md">
            <h1 class="font-bold text-center text-2xl mb-5 text-glow">Log-in</h1>
            <form @submit.prevent="handleLogin" class="glass-panel w-full rounded-2xl divide-y divide-emerald-200 shadow-xl">
                <div class="px-6 py-8">
                    <div class="mb-5">
                        <label class="font-semibold text-sm text-slate-700 dark:text-emerald-100 block">E-mail</label>
                        <input v-model="email" type="text" class="border border-emerald-200 dark:border-emerald-700 rounded-lg px-3 py-2 w-full bg-transparent focus:ring-2 focus:ring-emerald-400 transition-colors duration-200" required />
                    </div>
                    <div class="mb-5">
                        <label class="font-semibold text-sm text-slate-700 dark:text-emerald-100 block">Password</label>
                        <input v-model="password" type="password" class="border border-emerald-200 dark:border-emerald-700 rounded-lg px-3 py-2 w-full bg-transparent focus:ring-2 focus:ring-emerald-400 transition-colors duration-200" required />
                    </div>
                    <button type="submit" class="transition duration-200 bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus:shadow-sm focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-md hover:shadow-xl font-semibold text-center inline-block">
                        <span class="inline-block mr-2">Login</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            class="w-4 h-4 inline-block">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { inject, ref } from 'vue'
import { useUser } from '../../composables/useUser'
import { useRouter } from 'vue-router'

const toastRef = inject('toastRef')
const { login } = useUser()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
    try {
        await login(email.value, password.value)
        // Kontrola, či je user nastavený
        const { userStore } = useUser()
        if (userStore.user) {
            const router = useRouter()
            router.push('/')
            toastRef.value.showToast('Logged in successfully!', 'success')
        } else {
            toastRef.value.showToast('Error logging in!', 'error')
        }
    } catch (e) {
        toastRef.value.showToast('Error logging in!', 'error')
    }
}
</script>