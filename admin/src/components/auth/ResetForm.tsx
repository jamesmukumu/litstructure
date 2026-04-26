import { useState,useRef } from "react";
import { Link } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toast } from "primereact/toast";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { LoginUser, resetPassword } from "../../services/admin";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { update } from "../../redux/admin.reducer";
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),


});

export default function ResetForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading,setLoading] = useState(false)
let dispatch = useDispatch()
  let navigate = useNavigate()
  let toastRef = useRef(null)
  const formik = useFormik({
    initialValues: {
      email: "",
  
    },
    validationSchema,
    onSubmit: async (values) => {
    
    let payload = {
    "email":values.email,
   
    }
    let {message,status} =  await resetPassword(payload)
     if(message === "Password reset link sent" && status){
         toastRef.current?.show({
      detail:"",
      severity:"success",
      summary:`Password Reset Link Sent to ${values.email}`,
      sticky:true
     })

     }else{
     toastRef.current?.show({
      detail:message,
      severity:"error",
      summary:"Failed",
      sticky:true
     })
     }
    },
  });

  return (
    <div className="flex flex-col flex-1">
      <Toast ref={toastRef} position="top-left" />
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/signin"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to Signin
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Reset Password
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email
            </p>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="space-y-6">

              {/* EMAIL */}
              <div>
                <Label>
                  Email <span className="text-error-500">*</span>
                </Label>

                <Input
                  name="email"
                  placeholder="info@gmail.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

            

            

              {/* SUBMIT */}
              <div>
                <Button
                  className="w-full"
                  size="sm"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Reseting..." : "Reset"}
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Don&apos;t have an account?{" "}
              <Link
                to="/signin"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}