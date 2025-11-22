import { defineStore } from "pinia";
import { computed, ref } from "vue";


type updateUserDataParams = {
    username?: string | null;
    about?: string | null;
    firstName?: string | null;
    lastName?: string | null;
}

type fetchUserdataParams = {
    role: string | null;
    aboutme: string | null;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
}


export const useAuthStore = defineStore("auth", () => {
    const supabase = useSupabaseClient();
    const supabaseUser = useSupabaseUser();

    const lastEmail = ref("");
    const otpSent = ref(false);
    const loading = ref(false);
    const username = ref<string | null>(null);
    const about = ref<string | null>(null);
    const firstName = ref<string | null>(null);
    const lastName = ref<string | null>(null);
    const errorMessage = ref<string | null>(null);
    const isLoggedIn = computed(() => Boolean(supabaseUser.value));
    const userRole = ref<string | null>(null);
    
    
    const resetOtpState = () => {
        otpSent.value = false;
        lastEmail.value = "";
    };

    const sendOtp = async (email: string) => {
        const normalizedEmail = email.trim().toLowerCase();
        if (!normalizedEmail) {
            throw new Error("E-mail is required");
        }

        loading.value = true;
        errorMessage.value = null;

        const { error } = await supabase.auth.signInWithOtp({ email: normalizedEmail });

        loading.value = false;

        if (error) {
            errorMessage.value = error.message;
            throw new Error(error.message);
        }

        lastEmail.value = normalizedEmail;
        otpSent.value = true;
        return true;
    };

    const verifyOtp = async (otp: string, email?: string) => {
        const normalizedEmail = (email ?? lastEmail.value).trim().toLowerCase();
        if (!normalizedEmail) {
            throw new Error("E-mail is required before verifying the code");
        }
        if (!otp) {
            throw new Error("Verification code is required");
        }

        loading.value = true;
        errorMessage.value = null;

        const { error } = await supabase.auth.verifyOtp({
            type: "email",
            token: otp.trim(),
            email: normalizedEmail,
        });

        loading.value = false;

        if (error) {
            errorMessage.value = error.message;
            throw new Error(error.message);
        }

        resetOtpState();
        return true;
    };

    const loginWithPassword = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email: email.trim().toLowerCase(),
            password: password,
        });
        if (error) {
            errorMessage.value = error.message;
            throw new Error(error.message);
        }
        return true;
    }

    const logout = async () => {
        await supabase.auth.signOut();
        resetOtpState();
    };

    const fetchUserData = async () => {
        const response = await $fetch<fetchUserdataParams>('/api/user/userData');
        userRole.value = response.role;
        about.value = response.aboutme;
        username.value = response.username;
        firstName.value = response?.firstName;
        lastName.value = response?.lastName;
    }

    const setUserData = (data: updateUserDataParams) => {
        if (data.username !== undefined) {
            username.value = data.username;
        }
        if (data.about !== undefined) {
            about.value = data.about;
        }
        if (data.firstName !== undefined) {
            firstName.value = data.firstName;
        }
        if (data.lastName !== undefined) {
            lastName.value = data.lastName;
        }
    }

    

    return {
        user: supabaseUser,
        isLoggedIn,
        lastEmail,
        otpSent,
        loading,
        errorMessage,
        userRole,
        username,
        about,
        firstName,
        lastName,
        sendOtp,
        verifyOtp,
        logout,
        fetchUserData,
        loginWithPassword,
        setUserData,
    };
});