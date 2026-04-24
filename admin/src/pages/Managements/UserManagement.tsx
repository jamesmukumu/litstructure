import { useEffect, useState, useRef } from "react";
import { DeleteUser, UpdateUser, Usermanagement } from "../../services/admin";

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

import 'primeicons/primeicons.css';
        
export default function UserManagement() {
  const toast = useRef(null);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);
  const [editDialog, setEditDialog] = useState(false);

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    phonenumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  /* ================= FETCH USERS ================= */

  useEffect(() => {
    Usermanagement()
      .then((data) => {
        setUsers(data.data ?? []);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  /* ================= FILTER ================= */

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;

    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => (
    <div className="flex justify-content-end">
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Search users..."
        />
      </IconField>
    </div>
  );

  /* ================= USER TYPE ================= */

  const adminViewer = (user) => {
    return user.superAdmin ? (
      <Tag severity="success" value="Super Admin" />
    ) : (
      <Tag severity="danger" value="Normal User" />
    );
  };

 

  const openEdit = (user) => {
    setSelectedUser({ ...user });
    setEditDialog(true);
  };

  const hideDialog = () => {
    setEditDialog(false);
  };

  const onInputChange = (e, field) => {
    const value = e.target.value;
    setSelectedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveUser = () => {
    let updatedUsers = users.map((u) =>
      u.id === selectedUser.id ? selectedUser : u
    );
    
      
    UpdateUser(selectedUser).then((data)=>{
     if(data.message === 'User Updated'){
      toast.current.show({
      severity: "success",
      summary: "Updated",
      detail: "User updated successfully",
    });
     }
    }).catch((err)=>{
    console.error(err)
      toast.current.show({
      severity: "error",
      summary: "Failed",
      detail: "Something has gone wrong",
    });
    })
    setUsers(updatedUsers);
    setEditDialog(false);

 
  };

  /* ================= DELETE ================= */

  const deleteUser = (user) => {
    const filtered = users.filter((u) => u.id !== user.id);
    setUsers(filtered);
     DeleteUser(user.id).then((data)=>{
      if(data.message === "User Deleted Successfully"){
    toast.current.show({
      severity: "warn",
      summary: "Deleted",
      detail: "User removed",
    });
      }
     }).catch((err)=>{
      console.error(err)
      toast.current.show({
      severity: "error",
      summary: "Failed",
      detail: "Something has gone wrong",
    });
     })


  };

 

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          rounded
          severity="info"
          onClick={() => openEdit(rowData)}
        />

        <Button
          icon="pi pi-trash"
          rounded
          severity="danger"
          onClick={() => deleteUser(rowData)}
        />
      </div>
    );
  };

  const header = renderHeader();

  /* ================= RENDER ================= */

  return (
    <div className="card">
      <Toast ref={toast} position="bottom-right" />

      <DataTable
        value={users}
        paginator
        rows={10}
        loading={loading}
        filters={filters}
        filterDisplay="row"
        globalFilterFields={["name", "email", "phonenumber"]}
        header={header}
        showGridlines
        emptyMessage="No users found."
      >
        <Column
          field="name"
          header="Name"
          filter
          filterPlaceholder="Search name"
          style={{ minWidth: "12rem" }}
        />

        <Column
          field="email"
          header="Email"
          filter
          filterPlaceholder="Search email"
          style={{ minWidth: "16rem" }}
        />

        <Column
          field="phonenumber"
          header="Phone"
          filter
          filterPlaceholder="Search phone"
          style={{ minWidth: "12rem" }}
        />

        <Column header="Type" body={adminViewer} />

        <Column
          header="Actions"
          body={actionBodyTemplate}
          style={{ minWidth: "10rem" }}
        />
      </DataTable>

      

      <Dialog
        visible={editDialog}
        style={{ width: "450px" }}
        header="Edit User"
        modal
        className="p-fluid"
        onHide={hideDialog}
      >
        {selectedUser && (
          <div className="">
            <div>
              <label>Name</label>
              <InputText
                value={selectedUser.name}
                onChange={(e) => onInputChange(e, "name")}
              />
            </div>

            <div>
              <label>Email</label>
              <InputText
                value={selectedUser.email}
                onChange={(e) => onInputChange(e, "email")}
              />
            </div>

            <div>
              <label>Phone</label>
              <InputText
                value={selectedUser.phonenumber}
                onChange={(e) => onInputChange(e, "phonenumber")}
              />
            </div>
                  <div>
              <label>Password</label>
              <InputText
              type="password"
                value={selectedUser.password }
                onChange={(e) => onInputChange(e, "password")}
              />
            </div>

            <div className="flex justify-content-end gap-2 mt-4">
              <Button
                label="Cancel"
                icon="pi pi-times"
                severity="secondary"
                onClick={hideDialog}
              />

              <Button
                label="Save"
                icon="pi pi-check"
                onClick={saveUser}
              />
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}