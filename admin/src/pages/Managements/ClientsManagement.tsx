import { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { FilterMatchMode } from "primereact/api";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

import { ManageClients } from "../../services/client";
import { UpdateUser, DeleteUser } from "../../services/admin";
import { useNavigate } from "react-router";

export default function ClientManagement() {
  const toast = useRef(null);
  let navigate = useNavigate()

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedClient, setSelectedClient] = useState(null);
  const [editDialog, setEditDialog] = useState(false);

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    phonenumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  /* ================= FETCH ================= */
  useEffect(() => {
    ManageClients()
      .then((res) => {
        setClients(res.data ?? []);
        setLoading(false);
      })
      .catch(console.error);
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
    <div className="flex justify-content-end">
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Search clients..."
        />
      </IconField>
    </div>
  );

  /* ================= BOOL BADGES ================= */
  const boolTag = (value) =>
    value ? (
      <Tag severity="success" value="Yes" />
    ) : (
      <Tag severity="danger" value="No" />
    );

  /* ================= ACTIONS ================= */
  const openEdit = (client) => {
   navigate(`/edit/client/${client.slug}`)
  };

  const onInputChange = (e, field) => {
    const value = e.target.value;
    setSelectedClient((prev) => ({ ...prev, [field]: value }));
  };

  const saveClient = () => {
    UpdateUser(selectedClient)
      .then((res) => {
        if (res.message === "User Updated") {
          toast.current.show({
            severity: "success",
            summary: "Updated",
            detail: "Client updated successfully",
          });
        }
      })
      .catch(() => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Update failed",
        });
      });

    setClients((prev) =>
      prev.map((c) => (c.id === selectedClient.id ? selectedClient : c))
    );

    setEditDialog(false);
  };

  const deleteClient = (client) => {
    setClients((prev) => prev.filter((c) => c.id !== client.id));

    DeleteUser(client.id)
      .then((res) => {
        if (res.message === "User Deleted Successfully") {
          toast.current.show({
            severity: "warn",
            summary: "Deleted",
            detail: "Client removed",
          });
        }
      })
      .catch(() => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Delete failed",
        });
      });
  };

  const actionsTemplate = (row) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" rounded severity="info" onClick={() => openEdit(row)} />
      <Button icon="pi pi-trash" rounded severity="danger" onClick={() => deleteClient(row)} />
    </div>
  );

 
  return (
    <div className="card">
      <Toast ref={toast} position="bottom-right" />

      <DataTable
        value={clients}
        paginator
        rows={10}
        loading={loading}
        filters={filters}
        filterDisplay="row"
        globalFilterFields={["name", "email", "phonenumber"]}
        header={header}
        showGridlines
        emptyMessage="No clients found."
      >
        <Column field="name" header="Name" filter />
        <Column field="email" header="Email" filter />
        <Column field="phonenumber" header="Phone" filter />
        <Column field="contactIndividual" header="Contact Person" />

        <Column header="Hosting" body={(r) => boolTag(r.hasHosting)} />
        <Column field="domainName" header="Domain" />
        <Column header="Domain Active" body={(r) => boolTag(r.domainActive)} />

        <Column header="System" body={(r) => boolTag(r.hasSystem)} />
        <Column field="systemMode" header="System Mode" />
        <Column header="System Active" body={(r) => boolTag(r.systemActive)} />

        <Column header="Actions" body={actionsTemplate} />
      </DataTable>

      {/* ================= EDIT DIALOG ================= */}
      <Dialog
        visible={editDialog}
        style={{ width: "500px" }}
        header="Edit Client"
        modal
        onHide={() => setEditDialog(false)}
      >
        {selectedClient && (
          <div className="p-fluid space-y-3">

            <InputText value={selectedClient.name} onChange={(e) => onInputChange(e, "name")} placeholder="Name" />
            <InputText value={selectedClient.email} onChange={(e) => onInputChange(e, "email")} placeholder="Email" />
            <InputText value={selectedClient.phonenumber} onChange={(e) => onInputChange(e, "phonenumber")} placeholder="Phone" />
            <InputText value={selectedClient.contactIndividual} onChange={(e) => onInputChange(e, "contactIndividual")} placeholder="Contact Person" />

            <InputText value={selectedClient.domainName || ""} onChange={(e) => onInputChange(e, "domainName")} placeholder="Domain Name" />
            <InputText value={selectedClient.systemMode || ""} onChange={(e) => onInputChange(e, "systemMode")} placeholder="System Mode" />

            <InputText value={selectedClient.systemYearMade || ""} onChange={(e) => onInputChange(e, "systemYearMade")} placeholder="System Year" />

            <div className="flex justify-end gap-2 mt-4">
              <Button label="Cancel" severity="secondary" onClick={() => setEditDialog(false)} />
              <Button label="Save" icon="pi pi-check" onClick={saveClient} />
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}