<template>
<div class="h-full">
<footer class="bg-[#003a66] dark:bg-gray-900">
    <div class="container px-6 py-8 mx-auto">
        <div class="flex flex-col items-center text-center">
            <NuxtLink to="/">
                <img class="w-auto h-7" src="/images/logo_lit.png" alt="logo">
            </NuxtLink>

            <div class="flex flex-wrap justify-center mt-6 -mx-4">
                <NuxtLink to="/" class="mx-4 text-xl text-white transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" aria-label="Reddit"> Home </NuxtLink>
       <NuxtLink href="/#services" class="mx-4 text-xl text-white transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" aria-label="Reddit"> Services </NuxtLink>

              <NuxtLink href="/#about-us" class="mx-4 text-xl text-white transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" aria-label="Reddit"> About Us</NuxtLink>

                     <NuxtLink to="/#projects" class="mx-4 text-xl text-white transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" aria-label="Reddit"> Projects</NuxtLink>

            </div>

        </div>

        <hr class="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

        <div class="flex flex-col items-center sm:flex-row sm:justify-between">
            <p class="text-m text-white dark:text-gray-300">© Copyright {{ year }}. All Rights Reserved.</p>

         
        </div>
    </div>
</footer>
</div>

</template>


<script setup>
let year = new Date().getFullYear()

</script>