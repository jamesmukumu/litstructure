import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { GetServices } from "../../services/services";



export default function ServiceManagement() {

  /* ================= REFS ================= */

  const toast = useRef(null);
  const navigate = useNavigate();

  /* ================= STATE ================= */

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    description: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  /* ================= FETCH SERVICES ================= */

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await GetServices();
      setServices(res.data ?? []);
    } catch (error) {
      console.error(error);

      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to load services",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= GLOBAL SEARCH ================= */

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;

    setFilters((prev) => ({
      ...prev,
      global: { ...prev.global, value },
    }));

    setGlobalFilterValue(value);
  };

  const header = (
    <div className="flex justify-end">
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Search services..."
        />
      </IconField>
    </div>
  );

  /* ================= NAVIGATION ================= */

  const openEdit = (service) => {
    navigate(`/edit/service/${service.slug}`);
  };

  /* ================= DELETE ================= */

//   const deleteService = async (service) => {

//     // optimistic UI
//     setServices(prev =>
//       prev.filter(s => s.id !== service.id)
//     );

//     try {
//       await DeleteService(service.id);

//       toast.current?.show({
//         severity: "warn",
//         summary: "Deleted",
//         detail: "Service deleted successfully",
//       });

//     } catch (error) {
//       console.error(error);

//       fetchServices();

//       toast.current?.show({
//         severity: "error",
//         summary: "Error",
//         detail: "Failed to delete service",
//       });
//     }
//   };

  /* ================= ACTION BUTTONS ================= */
  let serviceDescription = (service)=>(
<div dangerouslySetInnerHTML={{ __html:service.description }}></div>
  )

  const actionsTemplate = (row) => (
    <div className="flex gap-2">

      <Button
        icon="pi pi-pencil"
        rounded
        severity="info"
        onClick={() => openEdit(row)}
      />

      <Button
        icon="pi pi-trash"
        rounded
        severity="danger"

      />

    </div>
  );

  /* ================= TABLE ================= */

  return (
    <div className="card">

      <Toast ref={toast} position="bottom-right" />

      <DataTable
        value={services}
        paginator
        rows={10}
        loading={loading}
        filters={filters}
        filterDisplay="row"
        globalFilterFields={["name", "description"]}
        header={header}
        showGridlines
        emptyMessage="No services found."
      >

        <Column
          field="name"
          header="Service Name"
         
        />

        <Column
          field="description"
          header="Description"
         
          body={serviceDescription}
        />

        <Column
          header="Actions"
          body={actionsTemplate}
        />

      </DataTable>

    </div>
  );
}