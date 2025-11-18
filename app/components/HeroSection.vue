<template>
    <section class="relative isolate overflow-hidden px-6 py-24">
        <div class="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-400/15 via-transparent to-slate-900/70"></div>
        <div class="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div class="text-center lg:text-left">
                <p class="mb-4 text-xs font-semibold uppercase tracking-[0.5em] text-emerald-400 text-glow">Signal Forge Studio</p>
                <h1 class="text-4xl font-semibold leading-tight text-slate-900 dark:text-emerald-50 sm:text-5xl">
                    Web development for bold digital products
                    <span class="block text-emerald-500">strategy, design systems, engineering</span>
                </h1>
                <p class="mt-6 max-w-2xl text-base text-slate-600 dark:text-emerald-100/80">
                    We craft end-to-end experiences for SaaS teams, agencies, and creators. From pitch-ready landing
                    pages to full-stack platforms, our Nuxt + Tailwind pipeline stays fast, accessible, and endlessly brandable.
                </p>
                <div class="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
                    <NuxtLink
                        to="/about"
                        class="text-glow text-lg font-semibold uppercase tracking-[0.3em] text-emerald-500 transition hover:text-emerald-200"
                    >
                        Start a project →
                    </NuxtLink>
                    <NuxtLink
                        to="/#services"
                        class="text-glow-strong text-lg font-semibold uppercase tracking-[0.3em] text-emerald-300 transition hover:text-emerald-100"
                    >
                        View capabilities ↗
                    </NuxtLink>
                </div>
                <dl class="mt-12 grid gap-6 text-left text-sm text-slate-700 dark:text-emerald-100/70 sm:grid-cols-3">
                    <div class="rounded-2xl border border-emerald-500/40 bg-white/70 p-4 dark:border-emerald-400/40 dark:bg-slate-900/40">
                        <dt class="text-xs uppercase tracking-[0.4em] text-emerald-500">Launches</dt>
                        <dd class="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">56</dd>
                        <p class="text-xs text-slate-500 dark:text-emerald-200/70">products deployed since 2020</p>
                    </div>
                    <div class="rounded-2xl border border-emerald-500/40 bg-white/70 p-4 dark:border-emerald-400/40 dark:bg-slate-900/40">
                        <dt class="text-xs uppercase tracking-[0.4em] text-emerald-500">Response time</dt>
                        <dd class="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">24h</dd>
                        <p class="text-xs text-slate-500 dark:text-emerald-200/70">to first prototype</p>
                    </div>
                    <div class="rounded-2xl border border-emerald-500/40 bg-white/70 p-4 dark:border-emerald-400/40 dark:bg-slate-900/40">
                        <dt class="text-xs uppercase tracking-[0.4em] text-emerald-500">Stack</dt>
                        <dd class="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">Nuxt · Astro</dd>
                        <p class="text-xs text-slate-500 dark:text-emerald-200/70">plus headless commerce</p>
                    </div>
                </dl>
            </div>
            <div class="flex flex-col gap-6">
                <div class="glass-panel rounded-3xl p-8">
                    <p class="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-400">What we build</p>
                    <ul class="mt-6 space-y-3 text-sm text-slate-700 dark:text-emerald-100/80">
                        <li>• Launch-ready marketing sites with motion systems.</li>
                        <li>• Headless Shopify experiences wired to Nuxt.</li>
                        <li>• Internal dashboards that feel like consumer apps.</li>
                        <li>• Component libraries and documentation stacks.</li>
                    </ul>
                    <p class="mt-8 text-xs uppercase tracking-[0.4em] text-emerald-500">Current slots</p>
                    <p class="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">2 builds open for January</p>
                </div>
                <div class="grid gap-4 sm:grid-cols-2">
                    <article class="rounded-2xl border border-emerald-400/30 bg-white/80 p-5 text-slate-900 shadow-xl dark:bg-slate-900/60 dark:text-emerald-50">
                        <p class="text-xs uppercase tracking-[0.4em] text-emerald-500">Case: Latitude CRM</p>
                        <p class="mt-2 text-sm text-slate-600 dark:text-emerald-100/80">Scaled their onboarding flow in 3 sprints with Nuxt Islands.</p>
                        <p class="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">Result: +31% trial conversions</p>
                    </article>
                    <article class="rounded-2xl border border-emerald-400/30 bg-white/80 p-5 text-slate-900 shadow-xl dark:bg-slate-900/60 dark:text-emerald-50">
                        <p class="text-xs uppercase tracking-[0.4em] text-emerald-500">Case: Meadow Commerce</p>
                        <p class="mt-2 text-sm text-slate-600 dark:text-emerald-100/80">Built a realtime product configurator with headless Shopify + Nuxt.</p>
                        <p class="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">Result: 2.3× avg. order value</p>
                    </article>
                </div>
            </div>
        </div>
    </section>
</template>
