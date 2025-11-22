<template>
    <div class="min-h-screen flex flex-col justify-center items-center sm:py-12">
        <div class="p-8 xs:p-0 mx-auto md:w-full md:max-w-md">
            <h1 class="font-bold text-center text-2xl mb-5 text-glow">Log-in</h1>
            <div class="flex justify-center">
                <button @click.prevent="changeMethod"
                    class="mb-5 flex  text-center transition duration-200 border border-emerald-500 hover:bg-emerald-900 focus:bg-emerald-700 focus:shadow-sm focus:ring-4 focus:ring-emerald-900 focus:ring-opacity-50 text-white w-50 justify-center  py-2.5 rounded-lg text-sm shadow-md hover:shadow-xl font-semibold inline-block disabled:cursor-not-allowed disabled:opacity-60">Change
                    Log in method</button>
            </div>
            <!-- Login form using email + password -->
            <form v-if="method === 'password'" @submit.prevent="handleLoginPassword"
                class="glass-panel w-full rounded-2xl divide-y divide-emerald-200 shadow-xl">
                <div class="px-6 py-8">
                    <div class="mb-5">
                        <label class="font-semibold text-sm text-slate-700 dark:text-emerald-100 block">E-mail</label>
                        <input v-model="email" type="email" placeholder="example@example.com" required
                            class="border border-emerald-200 dark:border-emerald-700 rounded-lg px-3 py-2 w-full bg-transparent focus:ring-2 focus:ring-emerald-400 transition-colors duration-200" />
                    </div>
                    <div class="mb-5">
                        <label class="font-semibold text-sm text-slate-700 dark:text-emerald-100 block">Password</label>
                        <input v-model="password" type="password" placeholder="Password" required
                            class="border border-emerald-200 dark:border-emerald-700 rounded-lg px-3 py-2 w-full bg-transparent focus:ring-2 focus:ring-emerald-400 transition-colors duration-200" />
                    </div>
                </div>
                <p class="px-6 text-sm text-slate-600 dark:text-emerald-200/80">
                    Enter your email address and password to log in.
                </p>
                <div class="px-6 py-4">
                    <p v-if="errorMessage" class="text-sm text-red-500">
                        {{ errorMessage }}
                    </p>
                    <button type="submit"
                        class="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg">Log
                        in</button>
                </div>
            </form>
            <!-- Login form using email + otp -->
            <form v-if="method === 'otp'" @submit.prevent="handleLogin"
                class="glass-panel w-full rounded-2xl divide-y divide-emerald-200 shadow-xl">
                <div v-if="mode === 'email'" class="px-6 py-8">
                    <div class="mb-5">
                        <label class="font-semibold text-sm text-slate-700 dark:text-emerald-100 block">E-mail</label>
                        <input v-model="email" type="email" placeholder="example@example.com" required
                            class="border border-emerald-200 dark:border-emerald-700 rounded-lg px-3 py-2 w-full bg-transparent focus:ring-2 focus:ring-emerald-400 transition-colors duration-200" />
                    </div>
                </div>
                <div v-else class="px-6 py-8">
                    <div class="mb-5">
                        <label class="font-semibold text-sm text-slate-700 dark:text-emerald-100 block">Code
                            Field</label>
                        <input v-model="code" type="text" placeholder="Enter code field"
                            class="border border-emerald-200 dark:border-emerald-700 rounded-lg px-3 py-2 w-full bg-transparent focus:ring-2 focus:ring-emerald-400 transition-colors duration-200"
                            required />
                    </div>
                </div>
                <p class="px-6 text-sm text-slate-600 dark:text-emerald-200/80">
                    {{ helperMessage }}
                </p>
                <p v-if="errorMessage" class="px-6 pt-2 text-sm text-red-500">
                    {{ errorMessage }}
                </p>
                <div class="flex justify-center px-6 py-4">
                    <button type="submit" :disabled="loading"
                        class="py-2 w-full transition duration-200 bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus:shadow-sm focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50 text-white rounded-lg text-sm shadow-md hover:shadow-xl font-semibold text-center inline-block disabled:cursor-not-allowed disabled:opacity-60">
                        <span class="inline-block mr-2">{{ buttonLabel }}</span>
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

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '#imports'

const authStore = useAuthStore()
const { loading, errorMessage, otpSent, isLoggedIn, lastEmail } = storeToRefs(authStore)

const email = ref('')
const code = ref('')
const password = ref('')

const method = ref('password') // password or otp
const mode = computed(() => (otpSent.value ? 'code' : 'email'))
const buttonLabel = computed(() => (mode.value === 'email' ? 'Send OTP' : 'Verify OTP'))

const helperMessage = computed(() => {
    if (mode.value === 'code') {
        return `We sent a one-time code to ${email.value || lastEmail.value}`
    }
    return 'Enter your email address to receive a one-time login code.'
})

watch(isLoggedIn, (logged) => {
    if (logged) {
        navigateTo('/')
    }
})

const changeMethod = () => {
    method.value = method.value === 'password' ? 'otp' : 'password'
}

const handleLogin = async () => {
    try {
        if (mode.value === 'email') {
            await authStore.sendOtp(email.value)
            return
        }
        await authStore.verifyOtp(code.value, email.value)
        code.value = ''
    } catch (error) {
        console.error('Auth error:', error)
    }
}

const handleLoginPassword = async () => {
    try {
        await authStore.loginWithPassword(email.value, password.value)
    } catch (error) {
        console.error('Auth error:', error)
    }
}
</script>