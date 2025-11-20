<template>
    <div class="min-h-screen flex flex-col justify-center items-center sm:py-12">
        <div class="p-8 xs:p-0 mx-auto md:w-full md:max-w-md">
            <h1 class="font-bold text-center text-2xl mb-5 text-glow">Register</h1>
            <div class="glass-panel w-full rounded-2xl divide-y divide-emerald-200 shadow-xl">
                <div class="px-6 py-8">
                    <label class="font-semibold text-sm text-slate-700 dark:text-emerald-100 pb-1 block">Name</label>
                    <input type="text" class="border border-emerald-200 dark:border-emerald-700 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-transparent focus:ring-2 focus:ring-emerald-400 transition-colors duration-200" />
                    <label class="font-semibold text-sm text-slate-700 dark:text-emerald-100 pb-1 block">E-mail</label>
                    <input type="text" class="border border-emerald-200 dark:border-emerald-700 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-transparent focus:ring-2 focus:ring-emerald-400 transition-colors duration-200" />
                    <label class="font-semibold text-sm text-slate-700 dark:text-emerald-100 pb-1 block">Password</label>
                    <input type="password" class="border border-emerald-200 dark:border-emerald-700 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-transparent focus:ring-2 focus:ring-emerald-400 transition-colors duration-200" />
                    <label class="font-semibold text-sm text-slate-700 dark:text-emerald-100 pb-1 block">Confirm Password</label>
                    <input type="password" class="border border-emerald-200 dark:border-emerald-700 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-transparent focus:ring-2 focus:ring-emerald-400 transition-colors duration-200" />
                    <button type="button"
                        class="transition duration-200 bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus:shadow-sm focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-md hover:shadow-xl font-semibold text-center inline-block">
                        <span class="inline-block mr-2">Register</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            class="w-4 h-4 inline-block">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-3 gap-2">
                        <button type="button"
                            class="transition duration-200 border border-emerald-200 dark:border-emerald-700 text-slate-500 dark:text-emerald-200 w-full py-2.5 rounded-lg text-sm shadow-sm hover:text-emerald-300 hover:bg-emerald-500 hover:shadow-md font-normal text-center inline-block bg-transparent">MailUp</button>
                        <button type="button"
                            class="transition duration-200 border border-emerald-200 dark:border-emerald-700 text-slate-500 dark:text-emerald-200 w-full py-2.5 rounded-lg text-sm shadow-sm hover:text-emerald-300 hover:bg-emerald-500 hover:shadow-md font-normal text-center inline-block bg-transparent">Google</button>
                        <button type="button"
                            class="transition duration-200 border border-emerald-200 dark:border-emerald-700 text-slate-500 dark:text-emerald-200 w-full py-2.5 rounded-lg text-sm shadow-sm hover:text-emerald-300 hover:bg-emerald-500 hover:shadow-md font-normal text-center inline-block bg-transparent">Github</button>
                    </div>
                </div>
                <div class="py-6">
                    <div class="grid grid-cols-2 gap-2">
                        <div class="text-center sm:text-left whitespace-nowrap">
                            <button
                                class="transition duration-200 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-slate-500 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-slate-800 focus:outline-none focus:bg-emerald-200 dark:focus:bg-slate-900 focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 ring-inset">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" class="w-4 h-4 inline-block align-text-top">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                </svg>
                                <span class="inline-block ml-1">Forgot Password</span>
                            </button>
                        </div>
                        <div class="text-center sm:text-right whitespace-nowrap">
                            <button
                                class="transition duration-200 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-slate-500 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-slate-800 focus:outline-none focus:bg-emerald-200 dark:focus:bg-slate-900 focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 ring-inset">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" class="w-4 h-4 inline-block align-text-bottom">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <span class="inline-block ml-1">Help</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="py-6">
                <div class="grid grid-cols-2 gap-2">
                    <div class="text-center sm:text-left whitespace-nowrap">
                        <button
                            class="transition duration-200 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-slate-500 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-slate-800 focus:outline-none focus:bg-emerald-200 dark:focus:bg-slate-900 focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 ring-inset">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" class="w-4 h-4 inline-block align-text-top">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <NuxtLink to="/" class="inline-block ml-1">Home Page</NuxtLink>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

</script>