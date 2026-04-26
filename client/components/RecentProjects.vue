<template>
  <section class="bg-gray-50 py-16">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <h2 class="text-3xl text-[#003a66] font-bold mb-12 text-center">
        Recent Projects
      </h2>

     
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
      >
        
        <template v-if="index % 2 === 0">
          <!-- Image -->
          <div class="flex justify-center">
            <img
              :src="
                'https://litstructure-server-master-ozffp0.laravel.cloud/storage/' +
                project.image
              "
              :alt="project.name"
              class="w-full max-w-lg rounded-2xl shadow-xl border border-gray-200 object-cover"
            />
          </div>

          <!-- Text -->
          <div class="flex flex-col justify-center">
            <h3 class="text-2xl font-semibold text-gray-900 mb-4">
              {{ project.name }}
            </h3>

            <div
              class="text-gray-600 leading-relaxed"
              v-html="project.description"
            />
          </div>
        </template>

        <!-- ODD → Image Right -->
        <template v-else>
          <!-- Text -->
          <div class="flex flex-col justify-center">
            <h3 class="text-2xl font-semibold text-gray-900 mb-4">
              {{ project.name }}
            </h3>

            <div
              class="text-gray-600 leading-relaxed"
              v-html="project.description"
            />
          </div>

          <!-- Image -->
          <div class="flex justify-center">
            <img
              :src="
                'https://litstructure-server-master-ozffp0.laravel.cloud/storage/' +
                project.image
              "
              :alt="project.name"
              class="w-full max-w-lg rounded-2xl shadow-xl border border-gray-200 object-cover"
            />
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  projects: {
    type: Array,
    required: true,
  },
});
</script>
