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

import { GetClients, GetProject, SaveProject, UpdateProject } from "../../services/project";

export default function EditProject() {
  const { slug } = useParams();

  const [clients, setClients] = useState<any[]>([]);
  const [initialValues, setInitialValues] = useState<any | null>(null);

  const editorRef = useRef(null);
  const toastRef = useRef<any>(null);

  // ---------------- CLIENTS ----------------
  useEffect(() => {
    GetClients()
      .then((res) => {
        setClients(Array.isArray(res?.data) ? res.data : []);
      })
      .catch(console.error);
  }, []);

  // ---------------- PROJECT ----------------
  useEffect(() => {
    if (!slug) return;

    GetProject(slug)
      .then((res) => {
        
        if (res?.status) {
          const p = res.data;

          setInitialValues({
            id: p.id || "",
            name: p.name || "",
            clients_id: p.clients_id || "",
            inceptionDate: p.inceptionDate || "",
            completionDate: p.completionDate || "",
            description: p.description || "",
            documentation: null,
            image: null,
            isFinalized: Boolean(p.isFinalized),
            isCompleted: Boolean(p.isCompleted),
          });
        }
      })
      .catch(console.error);
  }, [slug]);

  // ---------------- VALIDATION ----------------
  const schema = Yup.object({
    name: Yup.string().required("Project name is required"),
    clients_id: Yup.string().required("Please select a client"),
    inceptionDate: Yup.string().required("Inception date is required"),
    completionDate: Yup.string().required("Completion date is required"),
    description: Yup.string()
      .required("Description is required")
      .min(20, "Minimum 20 characters required"),
    documentation: Yup.mixed().nullable(),
    image: Yup.mixed().nullable(),
  });

  // ---------------- FORM ----------------
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: initialValues || {
      id: "",
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

    validationSchema: schema,

    onSubmit: async (values, { setSubmitting }) => {
     try {
    let {message} = await UpdateProject(values,values.id)
     if(message === 'Project updated successfully'){
      toastRef.current.show({
       detail:message,
       severity:"success",
       sticky:true
      })
     }else{
  toastRef.current.show({
       detail:message,
       severity:"error",
       sticky:true
      })
     }
     } catch (error) {
        console.error(error)
          toastRef.current.show({
       detail:"Something went wrong",
       severity:"error",
       sticky:true
      })
     }
    },
  });

  // ---------------- SAFE ERROR ----------------
  const Error = ({ name }: any) => {
    const error = formik.errors[name];

    if (!formik.touched[name] || !error) return null;

    if (typeof error === "string") {
      return <p className="text-red-500 text-sm mt-1">{error}</p>;
    }

    return null;
  };

  // ---------------- RADIO ----------------
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

  // ---------------- UI ----------------
  return (
    <div className="w-full bg-white shadow-xl rounded-xl p-8">
      <Toast ref={toastRef} position="bottom-right" />

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-center">
          Edit Project
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
        </div>

        <div>
          <Label>Completion Date *</Label>
          <Input
            type="date"
            name="completionDate"
            value={formik.values.completionDate}
            onChange={formik.handleChange}
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <Label>Description *</Label>
          <JoditEditor
            ref={editorRef}
            value={formik.values.description}
            onChange={(content) =>
              formik.setFieldValue(
                "description",
                typeof content === "string" ? content : String(content)
              )
            }
          />
          <Error name="description" />
        </div>

        {/* FLAGS */}
        <Radio name="isFinalized" label="Is Finalized" />
        <Radio name="isCompleted" label="Is Completed" />

        {/* DOCUMENTATION */}
        <div>
          <Label>Documentation</Label>
          <FileInput
            onChange={(e) =>
              formik.setFieldValue(
                "documentation",
                e.target.files?.[0] || null
              )
            }
          />
        </div>

        {/* IMAGE */}
        <div>
          <Label>Project Image</Label>
          <FileInput
            onChange={(e) =>
              formik.setFieldValue(
                "image",
                e.target.files?.[0] || null
              )
            }
          />
        </div>

        {/* SUBMIT */}
        <Button
          type="submit"
          size="sm"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Updating..." : "Update Project"}
        </Button>
      </form>
    </div>
  );
}