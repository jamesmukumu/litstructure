import { useFormik } from "formik";
import * as Yup from "yup";
import JoditEditor from "jodit-react";
import { useRef } from "react";

import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import FileInput from "../../components/form/input/FileInput";
import Button from "../../components/ui/button/Button";

export default function CreateProject() {
  const editor = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      logo: null,
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required("Project name is required"),

      description: Yup.string()
        .required("Project description is required")
        .min(20, "Description must be at least 20 characters"),

      logo: Yup.mixed()
        .required("Project logo is required")
        .test(
          "fileType",
          "Only image files are allowed",
          (value) =>
            value &&
            ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
              value.type
            )
        )
        .test(
          "fileSize",
          "File size must be less than 2MB",
          (value) => value && value.size <= 2 * 1024 * 1024
        ),
    }),

    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="w-full">
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-6">

          {/* Project Name */}
          <div>
            <Label>
              Name <span className="text-error-500">*</span>
            </Label>

            <Input
              name="name"
              placeholder="Project name"
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
              Project Description <span className="text-error-500">*</span>
            </Label>

            <JoditEditor
              ref={editor}
              value={formik.values.description}
              onChange={(content) =>
                formik.setFieldValue("description", content)
              }
            />

            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* Logo Upload */}
          <div>
            <Label>
              Project Image <span className="text-error-500">*</span>
            </Label>

            <FileInput
              name="logo"
              onChange={(event) => {
                formik.setFieldValue(
                  "logo",
                  event.currentTarget.files[0]
                );
              }}
              onBlur={() => formik.setFieldTouched("logo", true)}
            />

            {formik.touched.logo && formik.errors.logo && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.logo}
              </p>
            )}
          </div>

          {/* Submit */}
          <div>
            <Button type="submit" size="sm">
              Create Project
            </Button>
          </div>

        </div>
      </form>
    </div>
  );
}