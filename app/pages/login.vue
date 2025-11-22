<template>
    <LoginForm />
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'

const user = useSupabaseUser()

watchEffect(() => {
    if (user.value) {
        navigateTo('/')
    }
})
</script>