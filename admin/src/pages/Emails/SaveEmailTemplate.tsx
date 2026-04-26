import { useFormik } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { Chips } from "primereact/chips";
import { Toast } from "primereact/toast";

import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import FileInput from "../../components/form/input/FileInput";
import Button from "../../components/ui/button/Button";
import { saveEmailTemplate, sendEmail } from "../../services/email";
import { useSearchParams } from "react-router";
export default function SaveEmailTemplate() {
  const editor = useRef(null);
  const toastRef = useRef<any>(null);
    const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(false);

  // ---------------- FORM ----------------
  const formik = useFormik({
    initialValues: {
      title: "",
      description: ""
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .required("Email title is required")
        .min(3, "Title must be at least 3 characters"),
        


      description: Yup.string()
        .required("Email body is required")
        .min(10, "Body must be at least 10 characters"),

    
    }),

    onSubmit: async (values) => {
    try {
      let {message,status} = await saveEmailTemplate(values)
      if(message === "Email Template Added" && status){
    toastRef.current.show({
    severity:"success",
    detail:message,
    summary:"Success",
    sticky:true
    })
      }else{
  toastRef.current.show({
    severity:"error",
    detail:message,
    summary:"Success",
    sticky:true
    })
      }
    } catch (error) {
      console.error(error)
        toastRef.current.show({
    severity:"error",
    detail:"Something went wrong",
    summary:"Success",
    sticky:true
    })
    }
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
        <h2 className="text-2xl font-bold text-center">Save Email</h2>

       
        <div>
          <Label>Email Title *</Label>
          <Input
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          <Error name="title" />
        </div>



        {/* BODY */}
        <div>
          <Label>Email Body *</Label>
          <JoditEditor
            ref={editor}
            value={formik.values.description}
            onChange={(content) =>
              formik.setFieldValue("description", content)
            }
          />
          <Error name="description" />
        </div>

    


        {/* SUBMIT */}
        <Button type="submit" size="sm" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Saving..." : "Save Email"}
        </Button>
      </form>
    </div>
  );
}