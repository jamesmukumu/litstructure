import { useFormik } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-react";
import { useRef } from "react";

import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";

export default function CreateService() {
  const editor = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required("Service name is required"),

      description: Yup.string()
        .required("Service description is required")
        .min(20, "Description must be at least 20 characters"),
    }),

    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="w-full">
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
              onBlur={(newContent) =>
                formik.setFieldValue("description", newContent)
              }
            />

            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* Submit */}
          <div>
            <Button type="submit"  size="sm">
              Create Service
            </Button>
          </div>

        </div>
      </form>
    </div>
  );
}