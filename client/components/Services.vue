<template>
  <section class="bg-gray-100 py-20">
    <!-- Heading -->
    <div class="max-w-7xl mx-auto px-6 text-center">
      <h2 class="text-4xl md:text-5xl font-bold text-[#003a66]">What we do</h2>

      <p class="mt-4 text-lg md:text-xl text-gray-600">
        Your Imagination, Our Execution
      </p>
    </div>

    <!-- Services Grid -->
    <div
      class="max-w-7xl mx-auto px-6 mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      <!-- Card 1 -->
      <NuxtLink
        :to="`/service/${service.slug}`"
        v-for="service in services"
        :key="service.id"
        class="relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 min-h-[320px] flex flex-col justify-end"
      >
        <img
          :src="
            'https://litstructure-server-master-ozffp0.laravel.cloud/storage/' +
            service.image
          "
          :alt="service.slug ?? service.name"
          class="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition duration-500"
        />

        <div
          class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10"
        ></div>

        <!-- Content -->
        <div class="relative p-8 text-white flex flex-col">
          <h3 class="text-2xl font-semibold mb-3">
            {{ service.name }}
          </h3>

          <div
            class="mt-6 self-start border border-white/70 text-white px-6 py-2 rounded-full hover:bg-white hover:text-[#003a66] transition cursor-pointer"
          >
            View Services
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
defineProps({
  services: {
    type: Array,
    required: true,
  },
});
</script>
