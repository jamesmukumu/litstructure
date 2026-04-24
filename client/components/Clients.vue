<template>
  <section class="bg-[#f5f5f5] py-12">
    <!-- Title -->
    <h1 class="text-3xl md:text-5xl font-bold text-gray-900 text-center mb-10">
      Our Clients
    </h1>

    <UMarquee pause-on-hover class="overflow-hidden">
      <div
        :key="client.id"
        class="flex items-center gap-14 px-6"
        v-for="client in clients"
      >
        <img
          :src="
            'https://litstructure-server-master-ozffp0.laravel.cloud/storage/' +
            client.image
          "
          class="h-20 w-auto object-contain shrink-0"
        />
      </div>
    </UMarquee>
  </section>
</template>

<script setup>
defineProps({
  clients: {
    type: Array,
    required: true,
  },
});
</script>
