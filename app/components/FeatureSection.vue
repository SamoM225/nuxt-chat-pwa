<template>
    <section id="services" class="px-6 pb-24 pt-6">
        <div class="mx-auto max-w-4xl text-center">
            <p class="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-400 text-glow">What we deliver</p>
            <h2 class="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">Web development built for speed and storytelling</h2>
            <p class="mt-4 text-sm text-slate-600 dark:text-emerald-100/80">
                Choose a lane or mix and match. Every track ships with weekly demos, async Loom updates, and a shared Notion board.
            </p>
        </div>

        <div class="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2">
            <article class="rounded-3xl border border-emerald-500/30 bg-white/80 p-6 text-slate-900 shadow-2xl dark:border-emerald-400/30 dark:bg-slate-900/60 dark:text-emerald-50">
                <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold">Launch Sites & Marketing Engines</h3>
                <p class="mt-2 text-sm text-slate-600 dark:text-emerald-100/80">Narrative-driven sites with animation systems, CMS hooks, and analytics baked in.</p>
                <ul class="mt-4 text-sm text-slate-500 dark:text-emerald-200/80">
                    <li>• Hero & conversion experiments</li>
                    <li>• Headless CMS migrations</li>
                </ul>
                <button class="mt-6 text-left text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500 text-glow">Book scope call →</button>
            </article>
            <article class="rounded-3xl border border-emerald-500/30 bg-white/80 p-6 text-slate-900 shadow-2xl dark:border-emerald-400/30 dark:bg-slate-900/60 dark:text-emerald-50">
                <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6"/>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold">Product Engineering Retainers</h3>
                <p class="mt-2 text-sm text-slate-600 dark:text-emerald-100/80">Nuxt, Astro, and edge-ready APIs tuned for multiplatform dashboards.</p>
                <ul class="mt-4 text-sm text-slate-500 dark:text-emerald-200/80">
                    <li>• Component libraries</li>
                    <li>• QA automation + Lighthouse sweeps</li>
                </ul>
                <button class="mt-6 text-left text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500 text-glow">Retainer details ↗</button>
            </article>
            <article class="rounded-3xl border border-emerald-500/30 bg-white/80 p-6 text-slate-900 shadow-2xl dark:border-emerald-400/30 dark:bg-slate-900/60 dark:text-emerald-50">
                <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h8M4 18h6"/>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold">E-commerce Experiments</h3>
                <p class="mt-2 text-sm text-slate-600 dark:text-emerald-100/80">Headless Shopify, Stripe, and bespoke product builders with real-time previews.</p>
                <ul class="mt-4 text-sm text-slate-500 dark:text-emerald-200/80">
                    <li>• Subscription flows</li>
                    <li>• Localization + currency logic</li>
                </ul>
                <button class="mt-6 text-left text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500 text-glow-strong">Launch shop ☼</button>
            </article>
            <article class="rounded-3xl border border-emerald-500/30 bg-white/80 p-6 text-slate-900 shadow-2xl dark:border-emerald-400/30 dark:bg-slate-900/60 dark:text-emerald-50">
                <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 17l3 3 3-3m0-10l-3-3-3 3"/>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold">Design System Intensives</h3>
                <p class="mt-2 text-sm text-slate-600 dark:text-emerald-100/80">Audit your current UI kit, rebuild tokens, and document patterns that scale.</p>
                <ul class="mt-4 text-sm text-slate-500 dark:text-emerald-200/80">
                    <li>• Multi-brand theming</li>
                    <li>• Storybook + Figma sync</li>
                </ul>
                <button class="mt-6 text-left text-sm font-semibold uppercase tracking-[0.3em] text-emerald-500 text-glow">Request audit →</button>
            </article>
        </div>

        <div id="process" class="mx-auto mt-16 grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div class="glass-panel rounded-3xl p-8">
                <p class="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-400">Our process</p>
                <ol class="mt-6 space-y-5 text-sm text-slate-700 dark:text-emerald-100/80">
                    <li>
                        <span class="text-emerald-400 font-semibold">01 · Discovery Pulse</span>
                        <p>Audit goals, users, and tech. You walk away with a scope mural and timeline.</p>
                    </li>
                    <li>
                        <span class="text-emerald-400 font-semibold">02 · Co-design Sprints</span>
                        <p>Shared Figma + Nuxt preview links updated twice per week for instant feedback.</p>
                    </li>
                    <li>
                        <span class="text-emerald-400 font-semibold">03 · Build & QA</span>
                        <p>Edge deployments, performance budgets, and automated regression tests.</p>
                    </li>
                    <li>
                        <span class="text-emerald-400 font-semibold">04 · Handoff / Retain</span>
                        <p>Training sessions for your team or ongoing support with ops & experiments.</p>
                    </li>
                </ol>
            </div>
            <div class="rounded-3xl border border-emerald-400/40 bg-slate-950/70 p-8 text-emerald-50 shadow-2xl">
                <p class="text-xs uppercase tracking-[0.4em] text-emerald-300">Client note</p>
                <p class="mt-4 text-lg font-semibold">“Signal Forge rebuilt our entire data-heavy dashboard without slowing the roadmap. The glow details made our marketing team freak out (in the best way).”</p>
                <p class="mt-6 text-sm uppercase tracking-[0.3em] text-emerald-400">— Lina Ortega, COO at Northwind Labs</p>
            </div>
        </div>
    </section>
</template>
