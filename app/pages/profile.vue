<template>
    <div class="container mx-auto p-6 max-w-6xl">
        <form @submit.prevent="handleUpdate" class="glass-panel rounded-3xl p-6 shadow-2xl">
            <div class="grid gap-6 lg:grid-cols-3">
                <!-- LEFT: Profile Summary -->
                <aside class="lg:col-span-1">
                    <div class="flex flex-col items-center text-center">
                        <div class="h-28 w-28 rounded-full overflow-hidden bg-gray-100 shadow-md">
                            <img v-if="avatar" :src="avatar" alt="avatar" class="w-full h-full object-cover" />
                            <div v-else class="flex items-center justify-center h-full w-full text-gray-400">
                                <svg class="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z" />
                                </svg>
                            </div>
                        </div>
                        <h2 class="mt-4 text-xl font-semibold text-slate-900 dark:text-emerald-50">{{ username || 'Yourname' }}</h2>
                        <p class="text-sm text-slate-600 dark:text-emerald-100/80">{{ form.email }}</p>
                        <div class="mt-4 flex items-center gap-2">
                            <button type="button" @click="triggerAvatarUpload"
                                class="inline-flex items-center gap-2 rounded-md border border-emerald-400/40 bg-white/90 px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">Change</button>
                            <input ref="avatarInput" @change="handleAvatar" type="file" accept="image/*"
                                class="hidden" />
                            <button v-if="isLoggedIn" type="button" @click="logout"
                                class="rounded-md bg-emerald-400 hover:bg-emerald-600 text-white px-3 py-2 text-sm font-semibold">Logout</button>
                        </div>
                        <div
                            class="mt-6 w-full rounded-2xl border border-emerald-200/40 bg-white/70 dark:bg-slate-900/40 p-4">
                            <p class="text-xs uppercase tracking-[0.35em] text-emerald-400">Account</p>
                            <p class="mt-2 text-sm text-slate-700 dark:text-emerald-200/40">Member since <span
                                    class="font-medium">2024</span></p>
                            <p class="mt-1 text-xs text-slate-500 dark:text-emerald-200/70">Last login: <span
                                    class="font-medium">—</span></p>
                        </div>
                    </div>
                </aside>

                <!-- RIGHT: Main content -->
                <section class="lg:col-span-2 space-y-6">
                    <div>
                        <div class="flex items-start justify-between">
                            <div>
                                <h3 class="text-lg font-semibold text-slate-900 dark:text-emerald-50">Profile settings
                                </h3>
                                <p class="mt-1 text-sm text-slate-500 dark:text-emerald-100/80">Personalize your account
                                    and privacy settings.</p>
                            </div>
                            <div class="hidden sm:flex items-center gap-2">
                                <button type="button" @click="cancel"
                                    class="inline-flex items-center gap-2 border border-gray-300 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                                <button type="submit"
                                    class="inline-flex items-center gap-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 text-sm font-semibold">Save
                                    changes</button>
                            </div>
                            <div class="hidden sm:flex items-center gap-2 text-xs text-slate-500">
                                <span v-if="savedAt">Saved at {{ savedAt }}</span>
                            </div>
                        </div>

                        <!-- Card: Profile details -->
                        <div class="mt-6 rounded-2xl border border-emerald-400/40 bg-white/80 p-6 dark:bg-slate-900/60">
                            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label for="username"
                                        class="block text-sm font-medium text-slate-700 dark:text-emerald-100">Username</label>
                                    <div class="mt-1 relative rounded-md shadow-sm">
                                        <input id="username" v-model="form.username"
                                            class="block w-full border border-emerald-200/40 rounded-lg bg-transparent px-3 py-2 focus:ring-2 focus:ring-emerald-400" />
                                    </div>
                                </div>
                                <div>
                                    <label for="about"
                                        class="block text-sm font-medium text-slate-700 dark:text-emerald-100">About</label>
                                    <textarea id="about" v-model="form.about" rows="3"
                                        class="mt-1 block w-full border border-emerald-200/40 rounded-lg bg-transparent px-3 py-2 focus:ring-2 focus:ring-emerald-400"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div class="rounded-2xl border border-emerald-400/40 bg-white/80 p-6 dark:bg-slate-900/60">
                            <h4 class="text-sm font-semibold text-slate-900 dark:text-emerald-50">Personal Information
                            </h4>
                            <p class="text-xs text-slate-500 dark:text-emerald-200/70 mt-1">Use your real name so people
                                can find you.</p>
                            <div class="mt-4 grid gap-4">
                                <input v-model="form.firstName" type="text" placeholder="First name"
                                    class="w-full border border-emerald-200/40 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-400" />
                                <input v-model="form.lastName" type="text" placeholder="Last name"
                                    class="w-full border border-emerald-200/40 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-400" />
                                <input v-model="form.email" type="email" placeholder="Email"
                                    class="w-full border border-emerald-200/40 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-400" />
                            </div>
                        </div>

                        <div class="rounded-2xl border border-emerald-400/40 bg-white/80 p-6 dark:bg-slate-900/60 p-5">
                            <h4 class="text-sm font-semibold text-slate-900 dark:text-emerald-50">Notifications</h4>
                            <p class="text-xs text-slate-500 dark:text-emerald-200/70 mt-1">Control how you receive
                                updates.</p>
                            <div class="mt-4 space-y-3">
                                <label class="flex items-center gap-3">
                                    <input type="checkbox" v-model="form.notifyComments"
                                        class="h-4 w-4 text-emerald-600 border-emerald-400/40" />
                                    <div>
                                        <div class="text-sm font-medium text-slate-900 dark:text-emerald-50">Comments
                                        </div>
                                        <div class="text-xs text-slate-500 dark:text-emerald-200/70">When someone
                                            comments on your post</div>
                                    </div>
                                </label>
                                <label class="flex items-center gap-3">
                                    <input type="checkbox" v-model="form.notifyCandidates"
                                        class="h-4 w-4 text-emerald-600 border-emerald-400/40" />
                                    <div>
                                        <div class="text-sm font-medium text-slate-900 dark:text-emerald-50">Candidates
                                        </div>
                                        <div class="text-xs text-slate-500 dark:text-emerald-200/70">When someone
                                            applies for a job</div>
                                    </div>
                                </label>
                                <label class="flex items-center gap-3">
                                    <input type="checkbox" v-model="form.notifyOffers"
                                        class="h-4 w-4 text-emerald-600 border-emerald-400/40" />
                                    <div>
                                        <div class="text-sm font-medium text-slate-900 dark:text-emerald-50">Offers
                                        </div>
                                        <div class="text-xs text-slate-500 dark:text-emerald-200/70">When a candidate
                                            accepts/rejects an offer</div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Mobile action buttons -->
                    <div class="flex justify-end sm:hidden gap-3">
                        <button type="button" @click="cancel"
                            class="inline-flex items-center gap-2  rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button type="submit"
                            class="inline-flex items-center gap-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 text-sm font-semibold">Save
                            changes</button>
                    </div>
                </section>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useUser } from '../composables/useUser'
const { user, isLoggedIn, logout, updateUserData } = useUser()
import { useAuthStore } from '../app/stores/authStore'

const auth = useAuthStore()
const email = ref(auth.user?.email || '')
const username = ref(auth.username || '')
const first_name = ref(auth.firstName || '')
const last_name = ref(auth.lastName || '')
const about = ref(auth.about || '')

definePageMeta({
    middleware: 'auth'
})


const form = reactive({
    username: username.value || '',
    about: about.value || '',
    firstName: first_name.value || '',
    lastName: last_name.value || '',
    email: email.value || '',
    notifyComments: true,
    notifyCandidates: false,
    notifyOffers: true,
})




const handleUpdate = () => {
    updateUserData(form.username, form.about, form.firstName, form.lastName)
    console.log('Profile updated:', form)
}



const avatar = ref(null)
const savedAt = ref(null)

const cancel = () => {
    // Reset form to initial values or fetch from user data
    if (user.value) {
        form.username = user.value.user_metadata.username || ''
        form.about = user.value.user_metadata.about || ''
        form.firstName = user.value.user_metadata.firstName || ''
        form.lastName = user.value.user_metadata.lastName || ''
        form.email = user.value.email || ''
    }
    avatar.value = null
}



const triggerAvatarUpload = () => {
    const input = avatarInput.value
    if (input) {
        input.click()
    }
}
const avatarInput = ref(null)
const handleAvatar = (event) => {
    const file = event.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            avatar.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}
</script>

<style scoped>
.container {
    max-width: 1000px;
}
</style>
