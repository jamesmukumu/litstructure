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
import { sendEmail } from "../../services/email";
import { useSearchParams } from "react-router";
export default function SendEmail() {
  const editor = useRef(null);
  const toastRef = useRef<any>(null);
    const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(false);
let email = searchParams.get("email") ?? ''
  // ---------------- FORM ----------------
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      recepient:email,
      cc: [] as string[],
      attachments: [] as File[],
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .required("Email title is required")
        .min(3, "Title must be at least 3 characters"),
        recepient:Yup.string().email().required("Please Give a recepient email"),


      body: Yup.string()
        .required("Email body is required")
        .min(10, "Body must be at least 10 characters"),

      cc: Yup.array().of(Yup.string().email("Invalid email")),

      attachments: Yup.array().of(Yup.mixed()),
    }),

    onSubmit: async (values) => {
    try {
      let {message} = await sendEmail(values)
      if(message === "Email sent"){
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

  // ---------------- ADD FILES ----------------
  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);

    formik.setFieldValue("attachments", [
      ...formik.values.attachments,
      ...newFiles,
    ]);
  };

  // ---------------- REMOVE FILE ----------------
  const removeFile = (index: number) => {
    const updated = [...formik.values.attachments];
    updated.splice(index, 1);
    formik.setFieldValue("attachments", updated);
  };

  return (
    <div className="w-full bg-white shadow-xl rounded-xl p-8">
      <Toast ref={toastRef} position="bottom-right" />

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Send Email</h2>

       
        <div>
          <Label>Email Title *</Label>
          <Input
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          <Error name="title" />
        </div>


     <div>
          <Label>Recepient *</Label>
          <Input
            name="recepient"
            value={formik.values.recepient}
            onChange={formik.handleChange}
          />
          <Error name="recepient" />
        </div>
        {/* BODY */}
        <div>
          <Label>Email Body *</Label>
          <JoditEditor
            ref={editor}
            value={formik.values.body}
            onChange={(content) =>
              formik.setFieldValue("body", content)
            }
          />
          <Error name="body" />
        </div>

        {/* CC (CHIPS) */}
        <div>
          <Label>CC (optional)</Label>
          <Chips
            value={formik.values.cc}
            onChange={(e) => formik.setFieldValue("cc", e.value)}
            separator=","
            className="w-full"
            placeholder="Type email and press Enter"
          />
          <p className="text-xs text-gray-500 mt-1">
            Add multiple emails separated by Enter or comma
          </p>
        </div>

        {/* ATTACHMENTS (MULTIPLE) */}
        <div>
          <Label>Attachments</Label>
          <FileInput
            multiple
            onChange={(e) => handleFiles(e.target.files)}
          />

          {/* Preview list */}
          {formik.values.attachments.length > 0 && (
            <ul className="mt-3 space-y-2">
              {formik.values.attachments.map((file, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-sm bg-gray-100 p-2 rounded"
                >
                  <span>{file.name}</span>
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => removeFile(index)}
                  >
                    remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* SUBMIT */}
        <Button type="submit" size="sm" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Sending..." : "Send Email"}
        </Button>
      </form>
    </div>
  );
}