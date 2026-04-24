import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

import Label from "../../components/form/Label";
import FileInput from "../../components/form/input/FileInput";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import { GetClient, UpdateClient } from "../../services/client";

import { Toast } from "primereact/toast";
import JoditEditor from "jodit-react";

export default function EditClient() {

  const toastRef = useRef(null);
  const editor = useRef(null);
  const param = useParams();

  const [clientData, setClientData] = useState(null);

  /* ---------------- FETCH CLIENT ---------------- */

  useEffect(() => {
    GetClient(param.slug ?? "")
      .then(res => {
        if (res.message === "Client Found") {

          const c = res.data;

          setClientData({
            id: c.id, 
            name: c.name || "",
            email: c.email || "",
            phonenumber: c.phonenumber || "",
            contactIndividual: c.contactIndividual || "",
            description: c.description || "",
            image: null,

            hasHosting: Boolean(c.hasHosting),
            domain: c.domainName || "",
            domainActive: Boolean(c.domainActive),
            domainExpired: Boolean(c.domainExpired),
            domainExpiry: c.domainExpiry || "",

            hasSystem: Boolean(c.hasSystem),
            systemMode: c.systemMode || "",
            systemActive: Boolean(c.systemActive),
            systemByUs: Boolean(c.systemDoneByUs),
            yearManufacture: c.systemYearMade || "",
            language: c.systemRuntime || ""
          });

        }
      })
      .catch(console.error);

  }, [param.slug]);

  /* ---------------- OPTIONS ---------------- */

  const contactPersons = [
    "Manager", "HR Manager", "IT Specialist", "Other"
  ];

  const runtimes = [
    "PHP (Laravel)",
    "PHP (Codeigniter)",
    "Node JS",
    "Golang",
    "Spring Boot",
    "Other"
  ];

  /* ---------------- VALIDATION ---------------- */

  const schema = Yup.object({
    name: Yup.string().required("Client name required"),

    email: Yup.string()
      .email("Invalid email")
      .required("Email required"),

    phonenumber: Yup.string().required("Phone required"),

    contactIndividual: Yup.string()
      .required("Contact person required"),

    description: Yup.string()
      .required("Description required"),

    image: Yup.mixed().nullable(),

    domain: Yup.string().when("hasHosting", {
      is: true,
      then: s => s.required("Domain required")
    }),

    domainExpiry: Yup.string().when(
      ["hasHosting", "domainExpired"],
      {
        is: (hosting, expired) => hosting && expired,
        then: s => s.required("Expiry date required")
      }
    ),

    systemMode: Yup.string().when("hasSystem", {
      is: true,
      then: s => s.required("System mode required")
    })
  });

  /* ---------------- FORMIK ---------------- */

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: clientData || {
      id: "", // ✅ FIX: keep id inside form
      name: "",
      email: "",
      phonenumber: "",
      contactIndividual: "",
      description: "",
      image: null,

      hasHosting: true,
      domain: "",
      domainActive: true,
      domainExpired: false,
      domainExpiry: "",

      hasSystem: false,
      systemMode: "",
      systemActive: true,
      systemByUs: false,
      yearManufacture: "",
      language: ""
    },

    validationSchema: schema,

    onSubmit: async (values, { setSubmitting }) => {
      try {

        const { message } = await UpdateClient(values, values.id);

        toastRef.current?.show({
          severity: message.includes("success") ? "success" : "error",
          detail: message,
          sticky: true
        });

      } catch (err) {

        console.error(err);

        toastRef.current?.show({
          severity: "error",
          detail: "Something went wrong",
          sticky: true
        });

      } finally {
        setSubmitting(false);
      }
    }
  });

  /* ---------------- HELPERS ---------------- */

  const Error = ({ name }) =>
    formik.touched[name] && formik.errors[name] && (
      <p className="text-red-500 text-sm mt-1">
        {formik.errors[name]}
      </p>
    );

  const BooleanField = ({ name, label }) => (
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

  /* ---------------- UI ---------------- */

  return (
    <div className="w-full bg-white shadow-xl rounded-xl p-8">

      <Toast ref={toastRef} position="bottom-right" />

      <form onSubmit={formik.handleSubmit} className="space-y-10">

        <h2 className="text-2xl font-bold text-center">
          Basic Client Information
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
            name="phonenumber"
            value={formik.values.phonenumber}
            onChange={formik.handleChange}
          />
          <Error name="phonenumber" />
        </div>

        {/* CONTACT */}
        <div>
          <Label>Contact Person *</Label>
          <select
            name="contactIndividual"
            value={formik.values.contactIndividual}
            onChange={formik.handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="">Select</option>
            {contactPersons.map(p => (
              <option key={p}>{p}</option>
            ))}
          </select>
          <Error name="contactIndividual" />
        </div>

        {/* DESCRIPTION */}
        <div>
          <Label>Description *</Label>
          <JoditEditor
            ref={editor}
            value={formik.values.description}
            onBlur={() => formik.setFieldTouched("description")}
            onChange={c => formik.setFieldValue("description", c)}
          />
          <Error name="description" />
        </div>

        {/* HOSTING */}
        <h2 className="text-2xl font-bold text-center">
          Hosting Information
        </h2>

        <BooleanField name="hasHosting" label="Is Hosting Available?" />

        {formik.values.hasHosting && (
          <div className="border rounded-lg p-6 space-y-4">

            <Input
              name="domain"
              value={formik.values.domain}
              onChange={formik.handleChange}
            />

            <BooleanField name="domainActive" label="Domain Active?" />
            <BooleanField name="domainExpired" label="Domain Expired?" />

            <Input
              name="domainExpiry"
              value={formik.values.domainExpiry}
              onChange={formik.handleChange}
            />

          </div>
        )}

        {/* SYSTEM */}
        <h2 className="text-2xl font-bold text-center">
          System Information
        </h2>

        <BooleanField name="hasSystem" label="Has System?" />

        {formik.values.hasSystem && (
          <div className="border rounded-lg p-6 space-y-4">

            <Input
              name="systemMode"
              value={formik.values.systemMode}
              onChange={formik.handleChange}
            />

            <BooleanField name="systemActive" label="System Active?" />
            <BooleanField name="systemByUs" label="Built By Us?" />

            <Input
              name="yearManufacture"
              value={formik.values.yearManufacture}
              onChange={formik.handleChange}
            />

            <select
              name="language"
              value={formik.values.language}
              onChange={formik.handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="">Select Runtime</option>
              {runtimes.map(r => (
                <option key={r}>{r}</option>
              ))}
            </select>

          </div>
        )}

        {/* IMAGE */}
        <div>
          <Label>Logo</Label>
          <FileInput
            onChange={(e) =>
              formik.setFieldValue(
                "image",
                e.target.files?.[0] || null
              )
            }
          />
        </div>

        <Button
          type="submit"
          size="sm"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          {formik.isSubmitting ? "Updating..." : "Update Client"}
        </Button>

      </form>
    </div>
  );
}