<template>
  <div>
<section class="relative bg-white overflow-hidden py-4 md:py-24">
  <!-- subtle background glow -->
  <div class="absolute inset-0 -z-10">
    <div class="absolute top-10 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-60"></div>
  </div>

  <div
    class="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12"
  >
    <!-- Text Content -->
    <div class="md:w-1/2 md:pr-10">
      <h1
        class="text-3xl md:text-5xl font-bold text-text-pr leading-tight tracking-tight"
      >
        Building Smarter Solutions for a Connected Future
      </h1>

      <p class="mt-6 text-lg text-gray-600 leading-relaxed">
        Litstructure Technology Limited is a top information technology and web design company in Kenya that provides information communication technology (ICT) solutions, products and services using ultra-modern technologies.
we provide timely business information solutions. 
      </p>
      

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
        src="/images/Home/top-view-unrecognizable-hacker-performing-cyberattack-night_1098-18706.jpg"
        alt="software development"
        class="w-full max-w-lg rounded-2xl shadow-2xl object-cover transform md:scale-105 hover:scale-105 transition duration-500"
      />
    </div>
  </div>
</section>
<section>
<Clients :clients="clients"/>
</section>

<section class="bg-[#E9E5DA] py-20" id="about-us">
    <div class="max-w-5xl mx-auto text-center px-6">

        <!-- Title -->
        <h1 class="text-3xl md:text-4xl font-semibold text-blue-900 leading-snug">
            Information Technology in  Kenya |
            <span class="font-bold">Litstructure Technology</span>
        </h1>

        <!-- Description -->
        <p class="mt-6 text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            Liststructure is a tech-solutions company built by passionate individuals,
            dedicated to helping our clients continuously create value for their customers.
            We believe in transforming ideas into reality through technology.Our capacities involve web design & hosting, development, software development, wireless technology, enterprise networking solutions, enterprise management, integration security technology, business intelligence, strategic delivery capabilities and a host of other ICT related services.
We also provide Strategic Business Trainings in digital marketing, Customer targeting as well as Direct Digital marketing Concept.
        </p>

        <!-- Stats Cards -->
        <div class="mt-12 flex flex-col md:flex-row justify-center gap-8">

            <!-- Projects -->
            <div class="bg-blue-900 text-white rounded-2xl px-12 py-10 shadow-lg">
                <h2 class="text-4xl font-bold">100+</h2>
                <p class="mt-2 text-lg">Projects completed</p>
            </div>

            <!-- Clients -->
            <div class="bg-yellow-500 text-white rounded-2xl px-12 py-10 shadow-lg">
                <h2 class="text-4xl font-bold">200+</h2>
                <p class="mt-2 text-lg">Happy Clients</p>
            </div>

              <div class="bg-green-400 text-white rounded-2xl px-12 py-10 shadow-lg">
                <h2 class="text-4xl font-bold">100%</h2>
                <p class="mt-2 text-lg">Satisfaction Rate</p>
            </div>

        </div>

    </div>
</section>


<section id="services">
<Services :services="services"/>
</section>

<section id="projects">
<RecentProjects :projects="projects"/>
</section>
  </div>
</template>

<script setup>

let {data,error,pending} = await useFetch("/api/home")
let clients = ref(data.value.data.clients ?? [])
let projects = ref(data.value.data.projects ?? [])
let services = ref(data.value.data.services ?? [])


useSeoMeta({
  title: 'Litstructure Technology Limited',
  ogTitle: 'Litstructure Technology Limited',
  description: 'Litstructure Technology Limited is a top information technology and web design company in Kenya that provides information communication technology (ICT) solutions, products and services using ultra-modern technologies.',
  ogDescription: 'Litstructure Technology Limited is a top information technology and web design company in Kenya that provides information communication technology (ICT) solutions, products and services using ultra-modern technologies.',
  ogImage: '/images/logo_lit.png',
  twitterCard: '',
  twitterTitle:"Litstructure Technology Limited",
  ogUrl:"https://www.litstructure.com/",
  ogSiteName:"Litstructure",
  ogType:"website"
})

</script>
