<template>
    <footer class="border-t border-emerald-500/20 bg-slate-950/80 px-6 py-10 text-emerald-100">
        <div class="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center">
            <div class="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" class="h-10 w-10 text-emerald-400">
                    <path fill="#00DC82" d="M24 8L6 40h36L24 8z"/>
                </svg>
                <div>
                    <p class="text-sm uppercase tracking-[0.4em] text-emerald-400 text-glow">Signal Forge</p>
                    <p class="text-base font-semibold">Web development lab</p>
                </div>
            </div>
            <p class="text-sm text-emerald-200/80">© {{ year }} Signal Forge Studio · Made by Samuel Majerčík</p>
            <div class="flex flex-1 items-center justify-end gap-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
                <a href="https://github.com/Samom225" target="_blank" rel="noreferrer" class="text-glow-strong">GitHub</a>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
