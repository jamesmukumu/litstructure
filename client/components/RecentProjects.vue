<template>
  <section class="bg-gray-50 py-16">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <h2 class="text-3xl text-[#003a66] font-bold  mb-12 text-center">Recent Projects</h2>
      
      <!-- First project: image left, text right -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <!-- Left side: large image -->
        <div class="flex justify-center items-center">
          <img 
            src="https://www.jamesmukumu.co.ke/_vercel/image?url=%2Fhero%2Fcloseup-programmer-man-hand-typing-website-script-computer-working-remote-from-home-african-american-hacker-worker-programming-binary-code-using-network-security-system-concept-coding.jpg&w=640&q=100" 
            alt="Project Showcase" 
            class="w-full max-w-lg rounded-2xl shadow-xl border border-gray-200 object-cover"
          >
        </div>
        
        <!-- Right side: descriptive text -->
        <div class="flex flex-col justify-center h-full">
          <h3 class="text-2xl font-semibold text-gray-900 mb-4">Mobile Application</h3>
          <p class="text-gray-600 mb-6">Why Choose Us for Your Mobile App Development?</p>
          <ul class="space-y-4">
            <li class="flex items-start">
              <span class="text-blue-600 font-bold mr-2">•</span>
              <p><span class="font-semibold">User-Centric Design:</span> We prioritize your users, building apps that are intuitive, engaging, and easy to navigate.</p>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 font-bold mr-2">•</span>
              <p><span class="font-semibold">Performance & Reliability:</span> Our apps are engineered for speed, stability, and seamless functionality across devices.</p>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 font-bold mr-2">•</span>
              <p><span class="font-semibold">Tailored Solutions:</span> From concept to launch, we develop custom apps that perfectly align with your business goals and unique requirements.</p>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 font-bold mr-2">•</span>
              <p><span class="font-semibold">Cross-Platform Expertise:</span> Reach a wider audience with apps built for both iOS and Android, or opt for native experiences.</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- Second project: text left, image right -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left side: descriptive text -->
        <div class="flex flex-col justify-center h-full">
          <h3 class="text-2xl font-semibold text-gray-900 mb-4">Web Platform</h3>
          <p class="text-gray-600 mb-6">Delivering scalable and secure web solutions tailored to your business needs.</p>
          <ul class="space-y-4">
            <li class="flex items-start">
              <span class="text-blue-600 font-bold mr-2">•</span>
              <p><span class="font-semibold">Modern Frameworks:</span> Built with the latest technologies for speed and maintainability.</p>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 font-bold mr-2">•</span>
              <p><span class="font-semibold">Responsive Design:</span> Optimized for all devices to ensure accessibility and usability.</p>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 font-bold mr-2">•</span>
              <p><span class="font-semibold">Secure Architecture:</span> Protecting your data with industry-standard security practices.</p>
            </li>
          </ul>
        </div>

        <!-- Right side: large image -->
        <div class="flex justify-center items-center">
          <img 
            src="https://www.glitexsolutions.co.ke/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fni03o3xm%2Fproduction%2Fb225a84b5e54ad5233b72a11b67f534da54b4c9d-669x776.png&w=640&q=75" 
            alt="Web Platform Showcase" 
            class="w-full max-w-lg rounded-2xl shadow-xl border border-gray-200 object-cover"
          >
        </div>
      </div>
    </div>
  </section>
</template>
