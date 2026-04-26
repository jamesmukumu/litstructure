import axios from "axios"
import { APP_URL } from "../config/configs"
import Cookie from "js-cookie"

export async function LoginUser(payload:any){
try{
let response = await axios.post(`${APP_URL}/login/user`,payload)
if(response.data.message === "Successful Login"){
let token = response.headers['authorization']
Cookie.set("auth_token",token,{
  expires:59/1440
})
return response.data
}else{
return response.data
}

}catch(err){
return err

}}



export async function resetPassword(payload:any){
try{
let response = await axios.post(`${APP_URL}/reset/password`,payload)
return response.data
}catch(err){
return err

}}



export async function doresetPassword(payload:any){
try{
let response = await axios.put(`${APP_URL}/do/reset/password/${payload.uuid}`,payload)
return response.data
}catch(err){
return err

}}

export async function CreateUser(payload:any){
try {
let formData = new FormData()
let token = Cookie.get('auth_token')

formData.append("name",`${payload.fname} ${payload.lname}`)
formData.append('email',payload.email)
formData.append('password',payload.password)
formData.append('phoneNumber',payload.phoneNumber)
let response = await axios.post(`${APP_URL}/create/new/user`,formData,{
    headers:{
    "Authorization":`Bearer ${token}`
    }
})
return response.data
} catch (error) {
return error
}

}





export async function UpdateUser(payload:any){
try {
let formData = new FormData()
let token = Cookie.get("auth_token")
let appender = (key,value)=>{
if(key != undefined && value != undefined && key != "" && value != ""){
formData.append(key,value)
}
}
appender("name",`${payload.name}`)
appender('email',payload.email)
appender('password',payload.password)
appender('phoneNumber',payload.phoneNumber)
let response = await axios.put(`${APP_URL}/update/user`,formData,{
    headers:{
    "Authorization":`Bearer ${token}`
    },
    params:{
    "id":payload.id
    }
})
return response.data
} catch (error) {
return error
}}



export async function Usermanagement(){
try {
let token = Cookie.get("auth_token")
let response = await axios.get(`${APP_URL}/manage/users`,{
headers:{
"Authorization":`Bearer ${token}`
}
})
return response.data
} catch (error) {
return error
}
}


export async function DeleteUser(user_id:any){
try {
let token = Cookie.get("auth_token")
let response = await axios.delete(`${APP_URL}/delete/admin`,{
headers:{
"Authorization":`Bearer ${token}`
},
params:{
"user_id":user_id
}
})
return response.data
} catch (error) {
return error
}}




export async function GetSettings(){
try {
let token = Cookie.get("auth_token")
let response = await axios.get(`${APP_URL}/get/settings`,{
headers:{
"Authorization":`Bearer ${token}`
}
})
return response.data
} catch (error) {
return error
}


}



export async function SaveSettings(payload){
try {
let token= Cookie.get('auth_token')
let formData = new FormData()


    Object.keys(payload).forEach((key) => {
      const value = payload[key];

      if (value === null || value === undefined) return;

      if (value instanceof File) {
        formData.append(key, value);
        return;
      }

   
      if (typeof value === "boolean") {
        formData.append(key, value ? "1" : "0");
        return;
      }

      formData.append(key, value);
    });

    let response = await axios.post(`${APP_URL}/make/settings`,formData,{
    headers:{
    "Authorization":`Bearer ${token}`
    }
    })
    return response
} catch (error) {
return error
}


}


export async function GetEnquiries(){
try {
let token = Cookie.get("auth_token")
let response = await axios.get(`${APP_URL}/get/enquiries`,{
headers:{
"Authorization":`Bearer ${token}`
}
})
return response.data
} catch (error) {
return error
}
}


export async function GetProfile(){
try {
let token = await Cookie.get('auth_token')
let response = await axios.get(`${APP_URL}/get/profile`,{
headers:{
"Authorization":`Bearer ${token}`
}
})
return response.data
} catch (error) {
return error
}
}