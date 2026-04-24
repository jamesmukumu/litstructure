import axios from "axios";
import { APP_URL } from "../config/configs";
import Cookies from "js-cookie";

export async function sendEmail(payload:any){
try {
let token = Cookies.get("auth_token")
let formData = new FormData()

Object.keys(payload).forEach((key) => {
  const value = payload[key];

  if (value === null || value === undefined) return;

  // ✅ FIX: handle file arrays properly
  if (key === "attachments" && Array.isArray(value)) {
    value.forEach((file) => {
      formData.append("attachments[]", file);
    });
    return;
  }

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

let response = await axios.post(`${APP_URL}/send/email`,formData,{
headers:{
"Authorization":`Bearer ${token}`
}
})

return response.data

} catch (error) {
return error
}
}