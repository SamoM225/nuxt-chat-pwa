


// Typ pre stav užívateľa
interface UserState {
    user_id: string
    email: string
    isLoggedIn: boolean
    // role: string TODO: pridaj role, ak bude potrebné
}

// Pinia store s options API
export const useUserStore = defineStore('userStore', {
    state: (): UserState => ({
        user_id: '',
        email: '',
        isLoggedIn: false
    }),
    actions: {
        // Nastaví údaje o užívateľovi a označí ho ako prihláseného
        setUser(id: string, email: string) {
            this.user_id = id
            this.email = email
            this.isLoggedIn = true
        },
        // Odhlási užívateľa
        logout() {
            this.user_id = ''
            this.email = ''
            this.isLoggedIn = false
        }
    }
})