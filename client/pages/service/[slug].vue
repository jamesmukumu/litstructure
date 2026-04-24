<template>
  <div>
    <section class="relative bg-white overflow-hidden py-4 md:py-24">
      <!-- subtle background glow -->
      <div class="absolute inset-0 -z-10">
        <div
          class="absolute top-10 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-60"
        ></div>
      </div>

      <div
        class="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12"
      >
        <!-- Text Content -->
        <div class="md:w-1/2 md:pr-10">
          <h1
            class="text-3xl md:text-5xl font-bold text-text-pr leading-tight tracking-tight"
          >
            {{ service.name }}
          </h1>

          <div
            class="mt-6 text-lg text-gray-600 leading-relaxed"
            v-html="service.description"
          ></div>

          <a
            href="/contact"
            aria-label="contact-page"
            class="inline-flex mt-8 px-7 py-3 bg-[#003a66] hover:opacity-90 text-white font-semibold rounded-xl shadow-md transition duration-300"
          >
            Consult Us
          </a>
        </div>

        <!-- Image -->
        <div class="md:w-1/2 flex justify-center relative">
          <!-- soft decorative background behind image -->
          <div
            class="absolute -z-10 w-[90%] h-[90%] bg-blue-100 rounded-[2rem] blur-xl opacity-50"
          ></div>

          <img
            :src="`https://litstructure-server-master-ozffp0.laravel.cloud/storage/${service.image}`"
            :alt="service.name"
            class="w-full max-w-lg rounded-2xl shadow-2xl object-cover transform md:scale-105 hover:scale-105 transition duration-500"
          />
        </div>
      </div>
    </section>

    <section>
      <Clients :clients="clients" />
    </section>
  </div>
</template>

<script setup>
let route = useRoute();

let slug = route.params.slug;
let { data, error, pending } = await useFetch("/api/service", {
  query: {
    slug: slug,
  },
});

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 500,
    statusMessage: "Failed to load service",
  });
}

/*
|--------------------------------------------------------------------------
| SLUG DOES NOT EXIST
|--------------------------------------------------------------------------
*/
if (!data.value?.data) {
  throw createError({
    statusCode: 404,
    statusMessage: "Service not found",
  });
}
let service = ref(data.value.data ?? null);
let clients = ref(data.value.clients ?? []);
</script>
