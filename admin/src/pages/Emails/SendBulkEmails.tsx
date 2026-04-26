import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { GetEmailTemplates, sendBulkEmails } from "../../services/email";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

import { Toast } from "primereact/toast";
import { FilterMatchMode } from "primereact/api";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

import "primeicons/primeicons.css";
import Button from "../../components/ui/button/Button";

export default function SendBulkEmails() {
  const toast = useRef(null);

  /* ================= STATE ================= */

  const [templates, setTemplates] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipients, setSelectedRecipients] = useState([]);

  const [loading, setLoading] = useState(true);

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetEmailTemplates();

        setTemplates(res?.data ?? []);
        setRecipients(res?.bulks ?? []);
      } catch (err) {
        console.error(err);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to load data",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ================= FILTER ================= */

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;

    const _filters = { ...filters };
    _filters.global.value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const tableHeader = (
    <div className="flex justify-content-between align-items-center">
      <h3 className="m-0">Recipients</h3>

      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Search recipients..."
        />
      </IconField>
    </div>
  );

  /* ================= FORM ================= */

  const formik = useFormik({
    initialValues: {
      template_id: "",
    },

    validationSchema: Yup.object({
      template_id: Yup.string().required(
        "Email template is required"
      ),
    }),

    onSubmit: async (values, { resetForm }) => {
      if (!selectedRecipients.length) {
        toast.current.show({
          severity: "error",
          sticky:true,
          summary: "No Recipients",
          detail: "Please select at least one recipient",
        });
        return;
      }

      try {
        const payload = {
          template_id: values.template_id,
          recepients: selectedRecipients.map((r) => r.id),
        };

        const {message,status} = await sendBulkEmails(payload);
        if(message == "Emails Sent" && status ){
                 toast.current.show({
          severity: "success",
          summary: "Success",
          detail:  "Emails sent successfully",
        });
        }else{
                            toast.current.show({
          severity: "error",
          summary: "Failed",
          detail:  "Emails Not Sent Successfully",
        }); 
        }

   

        setSelectedRecipients([]);
        resetForm();
      } catch (err) {
        console.error(err);

        toast.current.show({
          severity: "error",
          summary: "Failed",
          detail: "Bulk email sending failed",
        });
      }
    },
  });

  const Error = ({ name }) =>
    formik.touched[name] && formik.errors[name] ? (
      <small className="p-error block mt-1">
        {formik.errors[name]}
      </small>
    ) : null;


  return (
    <div className="card p-6">
      <Toast ref={toast} position="bottom-right" />

      <form onSubmit={formik.handleSubmit} className="space-y-6">

        {/* TITLE */}
        <h1 className="text-center text-3xl font-bold">
          Send Bulk Emails
        </h1>

        {/* TEMPLATE SELECT */}
        <div className="field">
          <label className="font-semibold">
            Email Template *
          </label>

          <select
            name="template_id"
            value={formik.values.template_id}
            onChange={formik.handleChange}
            className="w-full border rounded-lg p-2 mt-2"
          >
            <option value="">Select template</option>

            {templates.map((tpl) => (
              <option key={tpl.id} value={tpl.id}>
                {tpl.title}
              </option>
            ))}
          </select>

          <Error name="template_id" />
        </div>

        {/* RECIPIENT TABLE */}
        <DataTable
          value={recipients}
          paginator
          rows={10}
          loading={loading}
          dataKey="id"
          showGridlines
          filters={filters}
          filterDisplay="row"
          globalFilterFields={["name", "email"]}
          header={tableHeader}
          selection={selectedRecipients}
          onSelectionChange={(e) =>
            setSelectedRecipients(e.value)
          }
          emptyMessage="No recipients available"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          />

          <Column
            field="name"
            header="Name"
            filter
            filterPlaceholder="Search name"
          />

          <Column
            field="email"
            header="Email"
            filter
            filterPlaceholder="Search email"
          />
        </DataTable>

        <div className="flex justify-content-end">
          <Button
            type="submit"
            
            label={`Send Emails (${selectedRecipients.length})`}
            severity="success"
          >
            Send Email
          </Button>
        </div>
      </form>
    </div>
  );
}