import { useFormik } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-react";
import { useRef } from "react";

import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { SaveService } from "../../services/services";
import { Toast } from "primereact/toast";
import FileInput from "../../components/form/input/FileInput";

export default function CreateService() {
  const editor = useRef(null);
  let toastRef = useRef(null)
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image:null
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required("Service name is required"),

      description: Yup.string()
        .required("Service description is required")
        .min(20, "Description must be at least 20 characters"),

        image:Yup.mixed().required("Service Image is needed"),
    }),

    onSubmit: async(values) => {
     let payload = {
     name:values.name,
     description:values.description,
     image:values.image
     }
     try{
     let {message} = await SaveService(payload)
      if(message === "Service Added"){
       toastRef.current?.show({
       severity:"success",
       detail:message,
       sticky:true
       })
      }else if(message == "Validation Failed"){
    toastRef.current?.show({
       severity:"error",
       detail:"Kindly Fill out all required fields",
       sticky:true
       })
      }else{
    toastRef.current?.show({
       severity:"error",
       detail:message,
       sticky:true
       })
      }
     }catch(err){
      console.error(err)
    toastRef.current?.show({
       severity:"error",
       detail:"Something Went Wrong",
       sticky:true
       })
     }
    },
  });



  //error component here
  return (
    <div className="w-full bg-white shadow-xl rounded-xl p-8">
      <Toast ref={toastRef} position="bottom-right"/>
      <h1 className="text-bold text-2xl text-center">Service Section</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-6">

          {/* Service Name */}
          <div>
            <Label>
              Name <span className="text-error-500">*</span>
            </Label>

            <Input
              name="name"
              placeholder="Service name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label>
              Service Description <span className="text-error-500">*</span>
            </Label>

            <JoditEditor
              ref={editor}
              value={formik.values.description}
              onBlur={(newContent) =>{
                console.log(newContent) 
                formik.setFieldValue("description", newContent)
              }
              }
            />

            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>



  <div>
            <Label>
              Service Picture <span className="text-error-500">*</span>
            </Label>

                  <FileInput
                onChange={(e) =>
                  formik.setFieldValue(
                    "image",
                    e.target.files?.[0] || null
                  )
                }
              />

            {formik.touched.image && formik.errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.image}
              </p>
            )}
          </div>
          {/* Submit */}
          <div>
            <Button type="submit"disabled={formik.isSubmitting}  size="sm">
              {
              formik.isSubmitting ? 'Saving' :'Create Service'
              }
            </Button>
          </div>

        </div>
      </form>
    </div>
  );
}