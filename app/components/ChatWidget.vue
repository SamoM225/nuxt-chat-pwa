<template>
    <div>
        <div v-if="isMobile"
            class="fixed inset-0 z-[90] bg-slate-900/60 backdrop-blur-sm"
            @click.self="$emit('close')"></div>

        <div ref="chatWindow"
            :style="!isMobile ? { left: `${x}px`, top: `${y}px` } : undefined"
            :class="chatWindowClasses">
            <div v-if="showEntryForm" class="relative flex h-full flex-col items-center justify-center p-8">
                <button type="button" @click="handleClose"
                    class="absolute right-4 top-4 rounded-full border border-emerald-200 p-2 text-emerald-600 transition hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-slate-800">
                    <span class="sr-only">Zavrieť chat</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h3 class="mb-4 text-lg font-bold text-emerald-700 dark:text-emerald-300">Zadajte meno a email</h3>
                <input v-model="name" type="text" placeholder="Vaše meno"
                    class="mb-3 w-full rounded border border-emerald-200 px-4 py-2 focus:border-emerald-500 focus:outline-none dark:border-emerald-800 dark:bg-slate-800 dark:text-white" />
                <input v-model="email" type="email" placeholder="Váš email"
                    class="mb-3 w-full rounded border border-emerald-200 px-4 py-2 focus:border-emerald-500 focus:outline-none dark:border-emerald-800 dark:bg-slate-800 dark:text-white" />
                <button @click="submitUser" :disabled="!name.trim() || !email.trim()"
                    class="w-full rounded bg-emerald-500 py-2 font-semibold text-white hover:bg-emerald-600 disabled:opacity-50">Pokračovať
                    do chatu</button>
            </div>
            <div v-else class="relative flex h-full">
                <aside v-if="showAdminSidebar"
                    :class="[
                        'flex h-full flex-col border-r border-emerald-100/60 bg-emerald-50/30 dark:border-emerald-900/40 dark:bg-slate-900/80',
                        isMobile ? 'absolute inset-0 z-20 w-full rounded-2xl border-none bg-white dark:bg-slate-900' : 'w-52'
                    ]">
                    <div
                        class="flex items-center justify-between border-b border-emerald-100/70 px-4 py-3 dark:border-emerald-900/60">
                        <p class="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-200">
                            Konverzácie</p>
                        <div class="flex items-center gap-2">
                            <button @click="loadConversations" :disabled="loadingConversations" title="Obnoviť zoznam"
                                class="rounded-full p-1 text-emerald-500 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50 dark:text-emerald-300 dark:hover:bg-slate-800">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" :class="{ 'animate-spin': loadingConversations }">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 4v6h6M20 20v-6h-6M5 19A9 9 0 1119 5" />
                                </svg>
                            </button>
                            <button v-if="isMobile" @click="closeAdminSidebar" type="button"
                                class="rounded-full p-1 text-emerald-500 transition hover:bg-emerald-100 dark:text-emerald-300 dark:hover:bg-slate-800">
                                <span class="sr-only">Zatvoriť zoznam konverzácií</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div
                        class="flex-1 space-y-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-emerald-200/60 dark:scrollbar-thumb-emerald-900/60">
                        <button v-for="conversation in conversations" :key="conversation.id"
                            @click="selectConversation(conversation.id)"
                            class="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition" :class="chat.conversationId === conversation.id
                                ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-white'
                                : 'text-slate-600 hover:bg-emerald-100/70 dark:text-slate-200 dark:hover:bg-slate-800'">
                            <span
                                class="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-sm font-semibold uppercase text-white">
                                {{ getInitial(conversation.contactName) }}
                            </span>
                            <div class="flex flex-col">
                                <span class="text-sm font-semibold text-slate-800 dark:text-slate-100">{{
                                    conversation.contactName }}</span>
                                <span class="text-xs text-slate-500 dark:text-slate-400">{{ conversation.contactEmail
                                    }}</span>
                            </div>
                        </button>
                        <p v-if="!loadingConversations && conversations.length === 0"
                            class="px-4 py-8 text-center text-xs text-slate-400">Zatiaľ žiadne konverzácie.</p>
                    </div>
                </aside>
                <div v-if="showChatArea" class="flex flex-1 flex-col">
                    <div @mousedown="!isMobile && startDrag($event)"
                        :class="[
                            'flex shrink-0 items-center justify-between border-b border-emerald-100 bg-emerald-50/50 px-6 py-4 dark:border-emerald-800/50 dark:bg-slate-800/50',
                            isMobile ? 'cursor-default' : 'cursor-move'
                        ]">
                        <div class="flex items-center gap-3">
                            <button v-if="isAdmin && isMobile" type="button" @click="openAdminSidebar"
                                class="rounded-full border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-600 transition hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-slate-800">
                                Konverzácie
                            </button>
                            <div v-if="isAdmin"
                                class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-base font-semibold uppercase text-white">
                                {{ headerInitial }}
                            </div>
                            <div v-else class="relative h-2.5 w-2.5">
                                <span
                                    class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-sm font-semibold tracking-wide text-emerald-700 dark:text-emerald-300">{{
                                    headerTitle }}</span>
                                <span class="text-xs text-slate-500 dark:text-slate-400">{{ headerSubtitle }}</span>
                            </div>
                        </div>
                        <button @click="handleClose"
                            class="text-emerald-500 transition hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div class="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-emerald-200 dark:scrollbar-thumb-emerald-800"
                        ref="messagesContainer">
                        <div v-if="isAdmin && !chat.conversationId"
                            class="flex h-full flex-col items-center justify-center px-4 text-center text-sm text-slate-400">
                            <p>Vyberte konverzáciu zľava, aby ste videli správy.</p>
                        </div>
                        <div v-else-if="messages.length === 0"
                            class="flex h-full flex-col items-center justify-center text-center text-sm text-slate-400">
                            <p v-if="isAdmin">Žiadne správy v tejto konverzácii.</p>
                            <p v-else>👋 Hi there! How can we help you today?</p>
                        </div>
                        <div v-else class="flex flex-col gap-4">
                            <div v-for="(msg, index) in messages" :key="index" :class="[
                                'max-w-[85%] rounded-2xl px-4 py-3 text-sm',
                                (
                                    isAdmin
                                        ? msg.sender_id === auth.user?.sub
                                        : msg.sender_id === chat.userId || msg.sender_id == null
                                )
                                    ? 'self-end rounded-br-none bg-emerald-500 text-white'
                                    : 'self-start rounded-bl-none bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                            ]">
                                {{ msg.text }}
                            </div>
                        </div>
                    </div>

                    <form v-if="!isAdmin" @submit.prevent="sendMessage"
                        class="shrink-0 border-t border-emerald-100 bg-white p-4 dark:border-emerald-800/50 dark:bg-slate-900">
                        <div class="flex items-center gap-3">
                            <input v-model="newMessage" type="text" placeholder="Type a message..."
                                class="flex-1 rounded-full border border-emerald-200 bg-slate-50 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500">
                            <button type="submit" :disabled="!newMessage.trim()"
                                class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </form>
                    <!-- Ak je uživateľ operátor/admin -->
                    <div v-else
                        class="shrink-0 border-t border-emerald-100 bg-emerald-50/40 px-4 py-3 text-xs text-emerald-900 dark:border-emerald-900/50 dark:bg-slate-900/80 dark:text-slate-400">
                        <form @submit.prevent="sendMessage" class="flex items-center gap-3">
                            <input v-model="newMessage" type="text" placeholder="Napíšte správu..."
                                class="flex-1 rounded-full border border-emerald-200 bg-slate-50 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-emerald-500">
                            <button type="submit" :disabled="!newMessage.trim()"
                                class="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore, useChatStore } from '#imports'
import { useChat, type ConversationHead } from '../../composables/useChat'
import { ADMIN_UID } from '../../utils/chat'
import { useChatRealtime } from '../../composables/useChatRealtime'

const isMobile = computed(() => {
    if (typeof navigator === 'undefined') return false
    const ua = navigator.userAgent
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
})


const auth = useAuthStore()
const chat = useChatStore()
const { user: supabaseUser, userRole } = storeToRefs(auth)
const { send, fetchMessages: fetchMessagesApi } = useChat()



const messagesContainer = ref<HTMLElement | null>(null)
const chatWindow = ref<HTMLElement | null>(null)
const chatWindowClasses = computed(() => {
    const base = 'fixed z-[100] flex flex-col overflow-hidden border border-emerald-200/60 bg-white shadow-2xl shadow-emerald-500/10 dark:border-emerald-800/50 dark:bg-slate-900'
    if (isMobile.value) {
        return `${base} inset-x-4 top-[8vh] h-[80vh] max-h-[720px] rounded-3xl`
    }
    return `${base} h-[600px] w-[520px] rounded-2xl`
})

const conversations = ref<ConversationHead[]>([])
const loadingConversations = ref(false)

const isAdmin = computed(() => userRole.value === 'admin' || supabaseUser.value?.id === ADMIN_UID)
const adminSidebarOpen = ref(isAdmin.value && (!isMobile.value || !chat.conversationId))
const showAdminSidebar = computed(() => isAdmin.value && (!isMobile.value || adminSidebarOpen.value))
const showChatArea = computed(() => !isAdmin.value || !isMobile.value || !adminSidebarOpen.value)

const name = ref('')
const email = ref('')
const userReady = ref(false)
const showEntryForm = computed(() => !isAdmin.value && chat.name == null)

const getInitial = (value: string) => value?.trim().charAt(0)?.toUpperCase() || '?'

const activeConversation = computed(() => conversations.value.find((conv) => conv.id === chat.conversationId) ?? null)
const headerTitle = computed(() => isAdmin.value ? (activeConversation.value?.contactName ?? 'Vyberte konverzáciu') : 'Support Chat')
const headerSubtitle = computed(() => isAdmin.value ? (activeConversation.value?.contactEmail ?? 'Zvoľte chat pre náhľad') : 'Sme online')
const headerInitial = computed(() => getInitial(headerTitle.value))

const props = defineProps<{
    initialX: number
    initialY: number
}>()

const emit = defineEmits(['close', 'update:position'])

const handleClose = () => {
    emit('close')
}

const x = ref(props.initialX)
const y = ref(props.initialY)

const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })

const scrollToBottom = async () => {
    await nextTick()
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
}


// Use realtime chat composable


const syncAdminIdentity = () => {
    if (!supabaseUser.value) return
    chat.setUser(
        supabaseUser.value.user_metadata?.full_name ?? 'Support',
        supabaseUser.value.email ?? '',
        supabaseUser.value.id
    )
}

const loadConversations = async () => {
    if (!isAdmin.value || !supabaseUser.value?.sub) return
    loadingConversations.value = true
    try {
        const res: any = await $fetch('/api/chat/list?operatorId=' + ADMIN_UID)
        conversations.value = res.conversations ?? []
    } catch (error) {
        console.error('Failed to load conversations', error)
    } finally {
        loadingConversations.value = false
    }
}

const selectConversation = (conversationId: string) => {
    if (chat.conversationId === conversationId) {
        if (isMobile.value) {
            adminSidebarOpen.value = false
        }
        return
    }
    chat.setConversation(conversationId)
    if (isMobile.value) {
        adminSidebarOpen.value = false
    }
}


const submitUser = async () => {
    if (name.value.trim() && email.value.trim()) {
        userReady.value = true
        chat.setUser(name.value.trim(), email.value.trim())
        const res = await getUserChatId(email.value.trim())
        console.log('Existing User in chat ID:', res)
        chat.setUser(name.value.trim(), email.value.trim(), res)
        // No need to manually load messages, handled by useChatRealtime
    }
}




// sendMessage is now handled by useChatRealtime

const openAdminSidebar = () => {
    if (!isAdmin.value) return
    adminSidebarOpen.value = true
}

const closeAdminSidebar = () => {
    if (!isAdmin.value) return
    adminSidebarOpen.value = false
}

watch(isAdmin, (value) => {
    if (value) {
        userReady.value = true
        syncAdminIdentity()
        loadConversations()
        adminSidebarOpen.value = !isMobile.value || !chat.conversationId
    } else {
        conversations.value = []
        if (!name.value.trim() || !email.value.trim()) {
            userReady.value = false
        }
        adminSidebarOpen.value = false
    }
})

watch(supabaseUser, (user) => {
    if (user && isAdmin.value) {
        userReady.value = true
        syncAdminIdentity()
    } else if (!user) {
        conversations.value = []
    }
})

watch(isMobile, (value) => {
    if (!isAdmin.value) return
    adminSidebarOpen.value = !value || !chat.conversationId
})

watch(() => chat.conversationId, (id) => {
    if (!isAdmin.value || !isMobile.value) return
    if (!id) {
        adminSidebarOpen.value = true
    }
})


// useChatRealtime handles message updates, no need for manual watch

onMounted(() => {
    if (isAdmin.value) {
        userReady.value = true
        syncAdminIdentity()
        loadConversations()
        adminSidebarOpen.value = !isMobile.value || !chat.conversationId
    }
    if (isAdmin.value === true) {
        nextTick(() => {
            chatWindow.value?.focus()
        })

    }
})
const conversationIdRef = computed(() => chat.conversationId || '')
const { messages, newMessage, sendMessage, getUserChatId } = useChatRealtime(
    conversationIdRef,
    name,
    email,
    (id) => {
        chat.setConversation(id)
    },
    isAdmin.value
)






// Drag handlers --------------------- začiatok
const startDrag = (e: MouseEvent) => {
    if (!chatWindow.value) return
    isDragging.value = true
    dragOffset.value = {
        x: e.clientX - x.value,
        y: e.clientY - y.value
    }
    window.addEventListener('mousemove', onDrag)
    window.addEventListener('mouseup', stopDrag)
}

const onDrag = (e: MouseEvent) => {
    if (!isDragging.value) return
    x.value = e.clientX - dragOffset.value.x
    y.value = e.clientY - dragOffset.value.y
}

const stopDrag = () => {
    isDragging.value = false
    window.removeEventListener('mousemove', onDrag)
    window.removeEventListener('mouseup', stopDrag)
    emit('update:position', { x: x.value, y: y.value })
}
// Drag handlers --------------------- koniec
</script>
