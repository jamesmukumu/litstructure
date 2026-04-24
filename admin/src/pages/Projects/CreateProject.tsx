import { useFormik } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";

import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import FileInput from "../../components/form/input/FileInput";
import Button from "../../components/ui/button/Button";
import { GetClients, SaveProject } from "../../services/project";
import { Toast } from "primereact/toast";
import { Loader } from "../../components/loader/Loader";

export default function CreateProject() {
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<any[]>([]);

  const editor = useRef(null);
  const toastRef = useRef<any>(null);

  // ---------------- FETCH CLIENTS (SAFE) ----------------
  useEffect(() => {
    setLoading(true);

    GetClients()
      .then((res) => {
        const safeClients = Array.isArray(res?.data) ? res.data : [];
        setClients(safeClients);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // ---------------- FORM ----------------
  const formik = useFormik({
    initialValues: {
      name: "",
      clients_id: "",
      inceptionDate: "",
      completionDate: "",
      description: "",
      documentation: null,
      image: null,
      isFinalized: false,
      isCompleted: false,
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Project name is required"),
      clients_id: Yup.string().required("Please select a client"),
      inceptionDate: Yup.string().required("Inception date is required"),
      completionDate: Yup.string().required("Completion date is required"),
      description: Yup.string()
        .required("Description is required")
        .min(20, "Minimum 20 characters required"),
      documentation: Yup.mixed().required("Documentation required"),
      image: Yup.mixed().required("Image required"),
    }),

    onSubmit: async (values) => {
      try {
        const payload = {
          ...values,
          description: values.description,
        };

        const { message } = await SaveProject(payload);

        toastRef.current?.show({
          severity: message === "Project added successfully" ? "success" : "error",
          detail: message,
          sticky: true,
        });
      } catch (err) {
        toastRef.current?.show({
          severity: "error",
          detail: "Something went wrong",
          sticky: true,
        });
      }
    },
  });

  // ---------------- ERROR COMPONENT ----------------
  const Error = ({ name }: any) =>
    formik.touched[name] && formik.errors[name] ? (
      <p className="text-red-500 text-sm mt-1">
        {String(formik.errors[name])}
      </p>
    ) : null;

  // ---------------- RADIO COMPONENT ----------------
  const Radio = ({ name, label }: any) => (
    <div className="space-y-2">
      <Label>{label}</Label>

      <div className="flex gap-6">
        <label className="flex gap-2 items-center">
          <input
            type="radio"
            checked={formik.values[name] === true}
            onChange={() => formik.setFieldValue(name, true)}
          />
          Yes
        </label>

        <label className="flex gap-2 items-center">
          <input
            type="radio"
            checked={formik.values[name] === false}
            onChange={() => formik.setFieldValue(name, false)}
          />
          No
        </label>
      </div>
    </div>
  );

  return (
    <>
  
        <div className="w-full bg-white shadow-xl rounded-xl p-8">
          <Toast ref={toastRef} position="bottom-right" />

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-center">
              Create Project
            </h2>

            {/* NAME */}
            <div>
              <Label>Project Name *</Label>
              <Input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              <Error name="name" />
            </div>

            {/* CLIENT */}
            <div>
              <Label>Client *</Label>
              <select
                name="clients_id"
                value={formik.values.clients_id}
                onChange={formik.handleChange}
                className="w-full border rounded-lg p-2"
              >
                <option value="">Select client</option>

                {clients.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {typeof c.name === "object"
                      ? JSON.stringify(c.name)
                      : String(c.name)}
                  </option>
                ))}
              </select>
              <Error name="clients_id" />
            </div>

            {/* DATES */}
            <div>
              <Label>Inception Date *</Label>
              <Input
                type="date"
                name="inceptionDate"
                value={formik.values.inceptionDate}
                onChange={formik.handleChange}
              />
              <Error name="inceptionDate" />
            </div>

            <div>
              <Label>Completion Date *</Label>
              <Input
                type="date"
                name="completionDate"
                value={formik.values.completionDate}
                onChange={formik.handleChange}
              />
              <Error name="completionDate" />
            </div>

            {/* DESCRIPTION */}
            <div>
              <Label>Description *</Label>
              <JoditEditor
                ref={editor}
                value={formik.values.description}
                onChange={(content) =>
                  formik.setFieldValue("description", content)
                }
              />
              <Error name="description" />
            </div>

            {/* FLAGS */}
            <Radio name="isFinalized" label="Is Finalized" />
            <Radio name="isCompleted" label="Is Completed" />

            {/* DOCUMENTATION */}
            <div>
              <Label>Documentation *</Label>
              <FileInput
                onChange={(e) =>
                  formik.setFieldValue(
                    "documentation",
                    e.target.files?.[0] || null
                  )
                }
              />
              <Error name="documentation" />
            </div>

            {/* IMAGE */}
            <div>
              <Label>Project Image *</Label>
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
              {formik.isSubmitting ? "Saving..." : "Create Project"}
            </Button>
          </form>
        </div>
   
    </>
  );
}