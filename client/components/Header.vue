<template>
  <header class="w-full sticky top-0 left-0 z-50 bg-white shadow-md">
    <!-- Top Bar -->
    <div class="bg-[#003a66] text-white py-2">
      <div class="container mx-auto px-4 flex justify-between items-center text-sm">
        <div class="flex items-center space-x-6">
          <div class="flex items-center space-x-2">
            <i class="fa-solid fa-phone text-lg"></i>
            <span> +254 780 803490</span>
          </div>
          <div class="hidden md:flex items-center space-x-2">
            <i class="fa-regular fa-envelope text-lg"></i>
            <a href="mailto:info@pjsafaris.com">info@litstructure.com</a>
          </div>
        </div>

        <div class="flex items-center space-x-5">
          <i class="fa-brands fa-facebook text-xl cursor-pointer"></i>
          <i class="fa-brands fa-instagram text-xl cursor-pointer"></i>
          <i class="fa-brands fa-twitter text-xl cursor-pointer"></i>
          <i class="fa-brands fa-linkedin text-xl cursor-pointer"></i>
        </div>
      </div>
    </div>

    <!-- Main Nav -->
    <div class="container mx-auto px-6 py-4 flex items-center justify-between">
      <NuxtLink to="/">
        <img
          src="/images/logo_lit.png"
          alt="Logo"
          class="h-18 w-auto object-contain"
        />
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center gap-12 text-base font-medium">
        <NuxtLink to="/" class="hover:text-pr">Home</NuxtLink>
        <NuxtLink to="/#services" class="hover:text-pr">Services</NuxtLink>
        <NuxtLink to="/#projects" class="hover:text-pr">Our Projects</NuxtLink>
     
        <NuxtLink to="/#about-us" class="hover:text-pr">About Us</NuxtLink>
          <NuxtLink
                    to="/contact"
                    class="px-6 py-2 rounded bg-pr hover:bg-pr transition text-sm font-semibold text-white"
                  >
                    Contact Us
                  </NuxtLink>
      </nav>

      <!-- Hamburger -->
      <button @click="toggleMenu" class="lg:hidden text-2xl">
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>
  </header>

  <!-- Overlay -->
  <div
    v-if="isOpen"
    @click="toggleMenu"
    class="fixed inset-0 bg-black/50 z-40 transition-opacity"
  ></div>

  <!-- Sidebar -->
  <aside
    :class="[
      'fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300',
      isOpen ? 'translate-x-0' : 'translate-x-full'
    ]"
  >
    <div class="flex justify-between items-center p-6 border-b">
      <h2 class="text-lg font-semibold">Menu</h2>
      <button @click="toggleMenu" class="text-2xl">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <ul class="flex flex-col p-6 space-y-6 text-lg font-medium">
      <li><NuxtLink to="/" @click="toggleMenu">Home</NuxtLink></li>
      <li><NuxtLink to="/#services">Services</NuxtLink></li>     
      <li><NuxtLink to="/#projects"  >Projects</NuxtLink></li>
       <li><NuxtLink to="/#about-us" >About us</NuxtLink></li>

                 <NuxtLink
                    to="/contact"
                    class="px-6 py-2 rounded bg-[#003a66] hover:bg-[#003a66] transition text-sm font-semibold text-white"
                  >
                    Contact Us
                  </NuxtLink>
    </ul>
  </aside>
</template>

<script setup>
import { ref } from "vue"

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>