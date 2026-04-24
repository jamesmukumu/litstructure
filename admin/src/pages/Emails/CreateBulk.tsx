import { useFormik } from "formik";
import * as Yup from "yup";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";

import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { SaveBulk } from "../../services/client";

export default function CreateBulk() {
  const toastRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);

  // ---------------- TYPES ----------------
  const userTypes = [
    "client",
    "it technician",
    "manager",
    "hr manager",
    "other",
  ];

  // ---------------- FORM ----------------
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      type: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(2, "Name too short"),

      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

      phoneNumber: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9+ ]+$/, "Invalid phone number").min(10,"Invalid phone format"),

      type: Yup.string()
        .required("Type is required")
        .oneOf(userTypes, "Invalid type selected"),
    }),

    onSubmit: (values,{resetForm}) => {
      SaveBulk(values).then((data)=>{
      if(data.message === "Bulk mails added"){
        toastRef.current.show({
          sticky:true,
          severity:"success",
          detail:data.message
        })
          resetForm()
      }else{
      
            toastRef.current.show({
          sticky:true,
          severity:"error",
          detail:data.message
        })
      }
      }).catch((err)=>{
       console.error(err)
             toastRef.current.show({
          sticky:true,
          severity:"error",
          detail:"something has gone wrong"
        })
      })
    },
  });

  // ---------------- ERROR ----------------
  const Error = ({ name }: any) =>
    formik.touched[name] && formik.errors[name] ? (
      <p className="text-red-500 text-sm mt-1">
        {String(formik.errors[name])}
      </p>
    ) : null;

  return (
    <div className="w-full bg-white shadow-xl rounded-xl p-8">
      <Toast ref={toastRef} position="bottom-right" />

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-center">
          Create Bulk User
        </h2>

        {/* NAME */}
        <div>
          <Label>Name *</Label>
          <Input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <Error name="name" />
        </div>

        {/* EMAIL */}
        <div>
          <Label>Email *</Label>
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <Error name="email" />
        </div>

        {/* PHONE */}
        <div>
          <Label>Phone Number *</Label>
          <Input
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
          />
          <Error name="phoneNumber" />
        </div>

        {/* TYPE */}
        <div>
          <Label>Type *</Label>
          <select
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="">Select type</option>

            {userTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <Error name="type" />
        </div>

        {/* SUBMIT */}
        <Button type="submit" size="sm" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Creating..." : "Create User"}
        </Button>
      </form>
    </div>
  );
}