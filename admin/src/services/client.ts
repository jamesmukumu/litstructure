import axios from "axios";
import Cookies from "js-cookie";
import { APP_URL } from "../config/configs";

export async function SaveClient(payload: any) {
  try {
    let token = Cookies.get("auth_token");

    let formData = new FormData();

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

    let response = await axios.post(
      `${APP_URL}/create/new/client`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    return err;
  }
}



export async function UpdateClient(payload: any,id:any) {
  try {
    let token = Cookies.get("auth_token");

    let formData = new FormData();

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

    let response = await axios.put(
      `${APP_URL}/update/client`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params:{
        "id":id
        }
      }
    );

    return response.data;
  } catch (err) {
    return err;
  }
}


export async function SaveBulk(payload: any) {
  try {
    let token = Cookies.get("auth_token");

    let formData = new FormData();

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

    
    let response = await axios.post(
      `${APP_URL}/save/bulk`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    return err;
  }


 

  
}


export async function ManageClients(){
   try {
    let token = Cookies.get("auth_token")
    let response = await axios.get(`${APP_URL}/manage/clients`,{
    headers:{
    "Authorization":`Bearer ${token}`
    }
    })
    return response.data
   } catch (error) {
    return error
   } }



   export async function GetClient(slug:string){
   try {
    let token = Cookies.get("auth_token")
    let response = await axios.get(`${APP_URL}/get/client/${slug}`,{
    headers:{
    "Authorization":`Bearer ${token}`
    }
    })
    return response.data
   } catch (error) {
    return error
   } }