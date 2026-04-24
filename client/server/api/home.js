export default defineEventHandler(async(event)=>{
try{
let config = useRuntimeConfig()
let response = await $fetch(`${config.public.baseUrl}/get/home`,{
method:"GET"
})
return response
}catch(err){
return err
}

})