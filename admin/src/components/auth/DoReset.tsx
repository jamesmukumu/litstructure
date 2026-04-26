import { useState,useRef } from "react";
import { Link, useParams } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toast } from "primereact/toast";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { doresetPassword, LoginUser, resetPassword } from "../../services/admin";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { update } from "../../redux/admin.reducer";
const validationSchema = Yup.object({
  password: Yup.string().min(8,"Password should be at least 8 characters long").required("Password is required"),
  confirmPassword:Yup.string().min(8,"Password should be at least 8 characters long").required("Confirm Password in required")


});

export default function DoResetForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading,setLoading] = useState(false)
  let param = useParams()
let dispatch = useDispatch()
  let navigate = useNavigate()
  let toastRef = useRef(null)
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword:""
  
    },
    validationSchema,
    onSubmit: async (values) => {
    
    let payload = {
    "password":values.password,
    "confirmPassword":values.confirmPassword,
    "uuid":param.uuid
   
    }
    let {message,status} =  await doresetPassword(payload)
     if(status){
         toastRef.current?.show({
      detail:"Success",
      severity:"success",
      summary:`Password Updated Succesfully`,
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
              Enter your New Password
            </p>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="space-y-6">

              {/* EMAIL */}
              <div>
                <Label>
                  Password <span className="text-error-500">*</span>
                </Label>

                <Input
                  name="password"
                
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>

            
     <div>
                <Label>
                  Confirm Password <span className="text-error-500">*</span>
                </Label>

                <Input
                  name="confirmPassword"
                 
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.confirmPassword}
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