import { useFormik } from "formik";
import * as Yup from "yup";

import Label from "../../components/form/Label";
import FileInput from "../../components/form/input/FileInput";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";

export default function CreateClient() {

  const formik = useFormik({
    initialValues: {
      name: "",
      logo: null,
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required("Client name is required"),

      logo: Yup.mixed()
        .required("Logo is required"),
    }),

    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-6">

          {/* Name */}
          <div>
            <Label>
              Name <span className="text-error-500">*</span>
            </Label>

            <Input
              name="name"
              placeholder="company abcd"
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

          {/* Logo */}
          <div>
            <Label>
              Logo <span className="text-error-500">*</span>
            </Label>

            <FileInput
              name="logo"
              onChange={(event) => {
                formik.setFieldValue(
                  "logo",
                  event.currentTarget.files[0]
                );
              }}
            />

            {formik.touched.logo && formik.errors.logo && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.logo}
              </p>
            )}
          </div>

          {/* Submit */}
          <div>
            <Button
              type="submit"
              className="w-full"
              size="sm"
            >
              Create Client
            </Button>
          </div>

        </div>
      </form>
    </div>
  );
}