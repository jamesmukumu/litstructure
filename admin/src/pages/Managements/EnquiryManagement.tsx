import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

import { GetEnquiries,} from "../../services/admin";

export default function EnquiryManagement() {

  const toast = useRef(null);
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
    type: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  /* ================= FETCH ================= */

  useEffect(() => {
    GetEnquiries()
      .then((res) => {
        console.log(res)
        setEnquiries(res.data ?? []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  /* ================= FILTER ================= */

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    const _filters = { ...filters };

    _filters.global.value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const header = (
    <div className="flex justify-end">
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Search enquiries..."
        />
      </IconField>
    </div>
  );

  /* ================= TAGS ================= */

  const respondedTag = (value) =>
    value ? (
      <Tag severity="success" value="Responded" />
    ) : (
      <Tag severity="warning" value="Pending" />
    );

  const typeTag = (type) => (
    <Tag severity="info" value={type.type || "unknown"} />
  );

  /* ================= MESSAGE (NEW) ================= */
let dateBody = (enquiry)=>(
<p>{new Date(enquiry.created_at).toLocaleDateString()}</p>
)
  const messageTemplate = (row) => (
    <textarea
      readOnly
      value={row.message || ""}
      rows={3}
      className="
        w-full 
        min-w-[250px] 
        resize-y 
        border 
        rounded-md 
        p-2 
        text-sm 
        bg-gray-50
        focus:outline-none
      "
    />
  );

  /* ================= ACTIONS ================= */

  const openView = (row) => {
    navigate(`/send/new/email/?email=${row.email}`);
  };

  const deleteEnquiry = (row) => {

    setEnquiries(prev => prev.filter(e => e.id !== row.id));

   
  };

  const actionsTemplate = (row) => (
    <div className="flex gap-2">

      <Button
        icon="pi pi-eye"
        rounded
        severity="info"
        onClick={() => openView(row)}
      />

      <Button
        icon="pi pi-trash"
        rounded
        severity="danger"
        onClick={() => deleteEnquiry(row)}
      />

    </div>
  );

  /* ================= UI ================= */

  return (
    <div className="card">
   <h1 className="text-2xl text-bold">View Enquiries</h1>
      <Toast ref={toast} position="bottom-right" />

      <DataTable
        value={enquiries}
        paginator
        rows={10}
        loading={loading}
        filters={filters}
        filterDisplay="row"
        globalFilterFields={["name", "email", "phone", "type", "message"]}
        header={header}
        showGridlines
        emptyMessage="No enquiries found."
      >
        <Column field="created_at" body={dateBody} header="Date" />

        <Column field="name" header="Name" filter />
        <Column field="email" header="Email" filter />
        <Column field="phone" header="Phone" filter />
        <Column field="type" header="Type" body={typeTag} />

        {/* 🔥 NEW MESSAGE COLUMN */}
        <Column header="Message" body={messageTemplate} />

        <Column
          field="isResponded"
          header="Status"
          body={(r) => respondedTag(r.isResponded)}
        />


        <Column header="Actions" body={actionsTemplate} />

      </DataTable>

    </div>
  );
}