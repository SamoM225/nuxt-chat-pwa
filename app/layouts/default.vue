<template>
    <div class="flex min-h-screen flex-col">
        <Navbar />
        <main class="flex-1">
            <slot />
        </main>
        <Footer />
    </div>
</template>

<script>
import { useInactivityLogout } from '../../composables/useInactivityLogout';

useInactivityLogout();
</script>