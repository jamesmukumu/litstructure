// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxt/ui', '@nuxt/icon'],
  css:["~/assets/css/main.css"],
  app:{
  head:{
  link:[
    {
    rel:"stylesheet",
    href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    }
  ]
  }
  }
})