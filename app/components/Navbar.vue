<template>
  <header class="sticky top-0 z-50 border-b border-emerald-400/20 bg-white/80 backdrop-blur-xl transition dark:border-emerald-300/25 dark:bg-slate-950/60">
    <div class="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
      <div class="flex items-center gap-3">
        <span class="text-xs uppercase tracking-[0.4em] text-emerald-500 text-glow">Signal Forge</span>
        <p class="text-sm text-emerald-900/70 dark:text-emerald-100/70">Web development lab</p>
      </div>

      <nav class="flex flex-wrap items-center justify-center gap-5 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-600 dark:text-emerald-200">
        <NuxtLink to="/" class="text-glow hover:text-emerald-300">Home</NuxtLink>
        <NuxtLink to="/#services" class="text-glow hover:text-emerald-300">Services</NuxtLink>
        <NuxtLink to="/#process" class="text-glow hover:text-emerald-300">Process</NuxtLink>
        <NuxtLink to="/about" class="text-glow hover:text-emerald-300">About</NuxtLink>
      </nav>

      <div class="flex items-center justify-end gap-4">
        <a href="mailto:studio@signallab.dev" class="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-400 text-glow-strong transition hover:text-emerald-200">
          Let's talk ↗
        </a>

      </div>
    </div>
  </header>
</template>