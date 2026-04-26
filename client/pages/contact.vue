<template>
  <section class="px-4 md:px-6 py-10 bg-slate-50">
    <div class="max-w-6xl mx-auto">

      <!-- HEADER -->
      <div class="max-w-3xl mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Contact us
        </h2>
        <p class="text-slate-600">
          Have a question, need support, or want to discuss your next project?
          We’re here to help.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12 items-start">

        <!-- FORM -->
        <form
          @submit.prevent="submitForm"
          class="bg-white p-8 rounded-2xl shadow-lg space-y-6"
        >

          <!-- Name -->
          <div>
            <label class="block text-sm font-medium text-slate-800 mb-2">
              Name
            </label>

            <input
              v-model="form.name"
              type="text"
              placeholder="John Doe"
              class="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm
                     shadow-sm transition-all duration-200
                     focus:border-blue-600 focus:ring-4 focus:ring-blue-100
                     hover:shadow-md outline-none"
            />

            <p v-if="errors.name" class="text-xs text-red-500 mt-1">
              {{ errors.name }}
            </p>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-slate-800 mb-2">
              Email
            </label>

            <input
              v-model="form.email"
              type="email"
              placeholder="john@example.com"
              class="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm
                     shadow-sm transition-all duration-200
                     focus:border-blue-600 focus:ring-4 focus:ring-blue-100
                     hover:shadow-md outline-none"
            />

            <p v-if="errors.email" class="text-xs text-red-500 mt-1">
              {{ errors.email }}
            </p>
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-medium text-slate-800 mb-2">
              Phone number
            </label>

            <input
              v-model="form.phone"
              type="text"
              placeholder="+1 800 259 854"
              class="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm
                     shadow-sm transition-all duration-200
                     focus:border-blue-600 focus:ring-4 focus:ring-blue-100
                     hover:shadow-md outline-none"
            />

            <p v-if="errors.phone" class="text-xs text-red-500 mt-1">
              {{ errors.phone }}
            </p>
          </div>

   
          <!-- Inquiry Type -->
          <div>
            <label class="block text-sm font-medium text-slate-800 mb-2">
              Inquiry Type
            </label>

            <select
              v-model="form.type"
              class="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm
                     shadow-sm transition-all duration-200
                     focus:border-blue-600 focus:ring-4 focus:ring-blue-100
                     hover:shadow-md outline-none"
            >
              <option value="" disabled>Select option</option>
              <option
                v-for="opt in options"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.label }}
              </option>
            </select>

            <p v-if="errors.type" class="text-xs text-red-500 mt-1">
              {{ errors.type }}
            </p>
          </div>

          <!-- Message -->
          <div>
            <label class="block text-sm font-medium text-slate-800 mb-2">
              Message
            </label>

            <textarea
              v-model="form.message"
              rows="6"
              placeholder="Write message"
              class="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm
                     shadow-sm transition-all duration-200
                     focus:border-blue-600 focus:ring-4 focus:ring-blue-100
                     hover:shadow-md outline-none"
            />

            <p v-if="errors.message" class="text-xs text-red-500 mt-1">
              {{ errors.message }}
            </p>
          </div>

          <!-- Button -->
          <button
            type="submit"
            :disabled="saving"
            class="w-full py-3 rounded-lg font-semibold text-white bg-pr shadow-md transition-all duration-200
         hover:shadow-lg hover:bg-pr
         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md"
          >
            {{ saving ? 'Saving':'Enquire' }}
          </button>

        </form>

        <!-- INFO -->
        <div class="grid gap-8 sm:grid-cols-2 max-lg:-order-1">

          <div>
            <h3 class="font-semibold text-slate-900"><UIcon size="30" name="material-symbols:add-location-alt-rounded"/> Visit office</h3>
            <a href="https://maps.app.goo.gl/ry1BwcpMbVZz87Fp8" target="_blank" class="text-m text-slate-600 mt-1">
 Gralex Plaza,Kenlands Nakuru
P.O. Box 1462 - 20100, Nakuru, Kenya
            </a>
          </div>

          <div>
            <h3 class="font-semibold text-slate-900"><UIcon size="30" name="material-symbols:wifi-calling-bar-2-rounded"/> Call us</h3>
            <a href="tel:+254 780 803490" class="text-m text-slate-600 mt-1">+254 780 803490</a>
          </div>

          <div>
            <h3 class="font-semibold text-slate-900"> <UIcon size="30" name="material-symbols:stacked-email-rounded"/> Chat to us</h3>
            <a href="mailto:info@litstructure.com" target="_blank" class="text-m text-slate-600 mt-1"> info@litstructure.com</a>
          </div>

         

        </div>

      </div>
    </div>
    
  </section>
</template>



<script setup>
import { toast } from '#build/ui';

const form = reactive({
  name: "",
  email: "",
  phone: "",

  type: "",
  message: "",
});
let config = useRuntimeConfig()
let baseUrl = config.public.baseUrl
const errors = reactive({});

const options = [
  { value: "AI", label: "AI" },
  { value: "Robotics", label: "Robotics" },
  { value: "IOT", label: "IOT" },
    { value: "ALP Systems", label: "ALP Systems" },
      { value: "Web Design", label: "Web Design" },
         { value: "Graphic Design & UI/UX", label: "Graphic design & UI/UX" },
      { value: "Digital Marketing & SEO", label: "Digital Marketing & SEO" },
      { value: "IT Consultancy", label: "IT Consultancy" },
      { value: "Capacity Building", label: "Capacity Building" },
        { value: "Other", label: "Other" },
];

const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validate = () => {
  Object.keys(errors).forEach((k) => (errors[k] = ""));

  if (!form.name) errors.name = "Name is required";
  if (!form.email) errors.email = "Email is required";
  else if (!validateEmail(form.email)) errors.email = "Invalid email";

  if (!form.phone) errors.phone = "Phone is required";

  if (!form.type) errors.type = "Select an option";
  if (!form.message) errors.message = "Message is required";

  return !Object.values(errors).some(Boolean);
};
let saving = ref(false)
const submitForm = async() => {

   
  if (!validate())return;
  saving.value = true
let res = await $fetch(`${baseUrl}/make/enquiry`,{
body:form,
method:"POST"
})
let toast = useToast()
if(res.message === 'Enquiry Added'){
toast.add({
title:"Success",
description:"Enquiry Submitted Successfully",
color:'success'
})
saving.value = false
}else{
toast.add({
title:"Failed",
description:res.message,
color:'error'
})
saving.value = false
}

  

  Object.keys(form).forEach((k) => (form[k] = ""));
};


useSeoMeta({
  title: 'Contact Us',
  ogTitle: 'Contact Us',
  description: 'Get in touch with Litstructure Technology Limited in Nakuru, Kenya for reliable ICT solutions, web design, and technology services. Call, email, or visit our office today.',
  ogDescription: 'Get in touch with Litstructure Technology Limited in Nakuru, Kenya for reliable ICT solutions, web design, and technology services. Call, email, or visit our office today.',
  ogImage: '/images/logo_lit.png',
  twitterCard: '',
  twitterTitle:"Contact",
  ogUrl:"https://www.litstructure.com/contact",
  ogSiteName:"Litstructure",
  ogType:"website"
})
</script>