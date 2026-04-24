import { useFormik } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import FileInput from "../../components/form/input/FileInput";
import Button from "../../components/ui/button/Button";
import { Toast } from "primereact/toast";

import { GetService, UpdateService } from "../../services/services";

export default function EditService() {
  const { slug } = useParams();

  const editorRef = useRef(null);
  const toastRef = useRef<any>(null);

  const [initialValues, setInitialValues] = useState<any | null>(null);

  
  useEffect(() => {
    if (!slug) return;

    GetService(slug)
      .then((res) => {
        if (res?.message == 'Service found') {
          const service = res.data;

          setInitialValues({
            id: service.id || "",
            name: service.name || "",
            description: service.description || "",
            image: null,
          });
        }
      })
      .catch(console.error);
  }, [slug]);

  // ---------------- VALIDATION ----------------
  const schema = Yup.object({
    name: Yup.string().required("Service name is required"),

    description: Yup.string()
      .required("Service description is required")
      .min(20, "Description must be at least 20 characters"),

    image: Yup.mixed().nullable(),
  });

  // ---------------- FORM ----------------
  const formik = useFormik({
    enableReinitialize: true,

    initialValues:
      initialValues || {
        id: "",
        name: "",
        description: "",
        image: null,
      },

    validationSchema: schema,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { message } = await UpdateService(values, values.id);

        if (message === "Service updated successfully") {
          toastRef.current.show({
            severity: "success",
            detail: message,
            sticky: true,
          });
        } else {
          toastRef.current.show({
            severity: "error",
            detail: message,
            sticky: true,
          });
        }
      } catch (error) {
        console.error(error);

        toastRef.current.show({
          severity: "error",
          detail: "Something went wrong",
          sticky: true,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  // ---------------- ERROR COMPONENT ----------------
  const Error = ({ name }: any) => {
    const error = formik.errors[name];

    if (!formik.touched[name] || !error) return null;

    if (typeof error === "string") {
      return <p className="text-red-500 text-sm mt-1">{error}</p>;
    }

    return null;
  };

  // ---------------- UI ----------------
  return (
    <div className="w-full bg-white shadow-xl rounded-xl p-8">
      <Toast ref={toastRef} position="bottom-right" />

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-center">
          Edit Service
        </h2>

        {/* NAME */}
        <div>
          <Label>Service Name *</Label>

          <Input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />

          <Error name="name" />
        </div>

        {/* DESCRIPTION */}
        <div>
          <Label>Service Description *</Label>

          <JoditEditor
            ref={editorRef}
            value={formik.values.description}
            onChange={(content) =>
              formik.setFieldValue(
                "description",
                typeof content === "string"
                  ? content
                  : String(content)
              )
            }
          />

          <Error name="description" />
        </div>

        {/* IMAGE */}
        <div>
          <Label>Service Image</Label>

          <FileInput
            onChange={(e) =>
              formik.setFieldValue(
                "image",
                e.target.files?.[0] || null
              )
            }
          />

          <Error name="image" />
        </div>

        {/* SUBMIT */}
        <Button
          type="submit"
          size="sm"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting
            ? "Updating..."
            : "Update Service"}
        </Button>
      </form>
    </div>
  );
}