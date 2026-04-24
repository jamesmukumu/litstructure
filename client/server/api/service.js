export default eventHandler((event)=>{
try{
let {slug} = getQuery(event)
let config = useRuntimeConfig()
let baseUrl = config.public.baseUrl
let response = $fetch(`${baseUrl}/get/service/${slug}`,{
method:"GET"
})
return response
}catch(err){
return err
}


})