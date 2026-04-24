import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";

import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import FileInput from "../../components/form/input/FileInput";
import Button from "../../components/ui/button/Button";

import { GetSettings, SaveSettings } from "../../services/admin";
import { Toast } from "primereact/toast";

export default function DoSettingsPage() {

  const toastRef = useRef(null);
  const [settingsData, setSettingsData] = useState(null);

  /* ================= FETCH SETTINGS ================= */

  useEffect(() => {
    GetSettings()
      .then(res => {
        
        if (res.settings) {
          const s = res.data ?? {};

          setSettingsData({
            email: s.email || "",
            phoneNumber: s.phoneNumber || "",
            instagram: s.instagram || "",
            facebook: s.facebook || "",
            linkedin: s.linkedin || "",
            logo: null
          });
        }
      })
      .catch(console.error);
  }, []);

  /* ================= VALIDATION ================= */

  const schema = Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),

    phoneNumber: Yup.string()
      .max(20, "Too long")
      .required("Phone number is required"),

    instagram: Yup.string()
      .required("Instagram is required"),

    facebook: Yup.string()
      .required("Facebook is required"),

    linkedin: Yup.string()
      .required("LinkedIn is required"),

    logo: Yup.mixed().nullable()
  });

  /* ================= FORMIK ================= */

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: settingsData || {
      email: "",
      phoneNumber: "",
      instagram: "",
      facebook: "",
      linkedin: "",
      logo: null
    },

    validationSchema: schema,

    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: false,

    onSubmit: async (values, { setSubmitting, setTouched }) => {

      // 🔥 force validation visibility on submit
      setTouched({
        email: true,
        phoneNumber: true,
        instagram: true,
        facebook: true,
        linkedin: true,
        logo: true
      });

      try {

       let {message} = await SaveSettings(values);
         if(message.message === 'Settings saved successfully'){
  toastRef.current?.show({
          severity: "success",
          detail: "Settings updated successfully",
          sticky: true
        });
         }else{

  toastRef.current?.show({
          severity: "error",
          detail: message.message,
          sticky: true
        });
         }
      

      } catch (err) {

        console.error(err);

        toastRef.current?.show({
          severity: "error",
          detail: "Failed to update settings",
          sticky: true
        });

      } finally {
        setSubmitting(false);
      }
    }
  });

  /* ================= ERROR COMPONENT ================= */

  const Error = ({ name }) =>
    formik.touched[name] && formik.errors[name] && (
      <p className="text-red-500 text-sm mt-1">
        {formik.errors[name]}
      </p>
    );

  /* ================= UI ================= */

  return (
    <div className="w-full bg-white shadow-xl rounded-xl p-8">

      <Toast ref={toastRef} position="bottom-right" />

      <form
        onSubmit={formik.handleSubmit}
        className="space-y-8"
      >

        <h2 className="text-2xl font-bold text-center">
         Settings
        </h2>

        {/* EMAIL */}
        <div>
          <Label>Email</Label>
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Error name="email" />
        </div>

        {/* PHONE */}
        <div>
          <Label>Phone Number</Label>
          <Input
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Error name="phoneNumber" />
        </div>

        {/* INSTAGRAM */}
        <div>
          <Label>Instagram</Label>
          <Input
            name="instagram"
            value={formik.values.instagram}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Error name="instagram" />
        </div>

        {/* FACEBOOK */}
        <div>
          <Label>Facebook</Label>
          <Input
            name="facebook"
            value={formik.values.facebook}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Error name="facebook" />
        </div>

        {/* LINKEDIN */}
        <div>
          <Label>LinkedIn</Label>
          <Input
            name="linkedin"
            value={formik.values.linkedin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Error name="linkedin" />
        </div>

        {/* LOGO */}
        <div>
          <Label>Logo</Label>

          <FileInput
            onChange={(e) =>
              formik.setFieldValue(
                "logo",
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
          {formik.isSubmitting
            ? "Saving..."
            : "Save Settings"}
        </Button>

      </form>
    </div>
  );
}