import { useState,useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";

import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { Toast } from "primereact/toast";
import { CreateUser } from "../../services/admin";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  let toastRef = useRef(null)
  let navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber:""
    },

    validationSchema: Yup.object({
      fname: Yup.string().required("First name is required"),
      lname: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
        phoneNumber:Yup.string().min(10,'Please Use a Valid phonenumber').max(12,"Please use a valid phonenumber").required("Please Give a phone number"),
      password: Yup.string()
        .min(7, "Password must be at least 7 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm your password"),
    }),

    onSubmit: async(values) => {
      if (!isChecked) {
        alert("You must accept the terms and conditions");
        return;
      }
      let {message} = await CreateUser(values)
      if(message === "User Saved"){
       toastRef.current.show({
      severity:"success",
      detail:"User Added Successfully",
      sticky:true
       })
       setTimeout(()=>{
        navigate("/")
       },2000)
      }else{
          toastRef.current.show({
      severity:"error",
      detail:message,
      sticky:true
       })
      }
    },
  });

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <Toast ref={toastRef} position="top-left"/>
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-5">

            {/* First + Last Name */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Label>First Name*</Label>
                <Input
                  name="fname"
                  value={formik.values.fname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your first name"
                />
                {formik.touched.fname && formik.errors.fname && (
                  <p className="text-red-500 text-sm">{formik.errors.fname}</p>
                )}
              </div>

              <div>
                <Label>Last Name*</Label>
                <Input
                  name="lname"
                  value={formik.values.lname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your last name"
                />
                {formik.touched.lname && formik.errors.lname && (
                  <p className="text-red-500 text-sm">{formik.errors.lname}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <Label>Email*</Label>
              <Input
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your email"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

 <div>
                <Label>Phone Number*</Label>
                <Input
                type="number"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your phone number"
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <p className="text-red-500 text-sm">{formik.errors.phoneNumber}</p>
                )}
              </div>
            {/* Password */}
            <div>
              <Label>Password*</Label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeIcon className="size-5" />
                  ) : (
                    <EyeCloseIcon className="size-5" />
                  )}
                </span>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label>Confirm Password*</Label>
              <Input
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Confirm your password"
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-3">
              <Checkbox
                className="w-5 h-5"
                checked={isChecked}
                onChange={setIsChecked}
              />
              <p className="text-sm text-gray-500">
                By creating an account you agree to the Terms and Privacy Policy
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 text-white bg-brand-500 rounded-lg hover:bg-brand-600"
            >
              Sign Up
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}