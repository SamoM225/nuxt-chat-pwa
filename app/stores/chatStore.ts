import { defineStore } from "pinia";
import { ref } from "vue";

export const useChatStore = defineStore("chat", () => {
    const conversationId = ref<string | null>(null);
    const name = ref<string | null>(null);
    const email = ref<string | null>(null);
    const userId = ref<string | null>(null);
    
    const adminConversations = ref<Array<Record<string, any>>>([]);

    const setUser = (newName: string, newEmail: string, newUserId?: string | null) => {
        name.value = newName;
        email.value = newEmail;
        if (newUserId) {
            userId.value = newUserId;
        }
    };

    const setConversation = (id: string) => {
        conversationId.value = id;
    };

    const setAdminConversations = (conversations: Array<Record<string, any>>) => {
        adminConversations.value = conversations;
    }
    
    return { conversationId, name, email, userId, adminConversations, setUser, setConversation, setAdminConversations };

})