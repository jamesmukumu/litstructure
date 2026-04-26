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
import { GetProjects } from "../../services/project";
import { APP_URL } from "../../config/configs";

export default function ProjectsManagement() {
  const toast = useRef(null);
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    description: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  /* ================= FETCH PROJECTS ================= */

  useEffect(() => {
    GetProjects()
      .then((res) => {
        setProjects(res.data ?? []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  /* ================= GLOBAL FILTER ================= */

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
          placeholder="Search projects..."
        />
      </IconField>
    </div>
  );

  /* ================= BOOL TAG ================= */

  const boolTag = (value) =>
    value ? (
      <Tag severity="success" value="Yes" />
    ) : (
      <Tag severity="warning" value="No" />
    );

  /* ================= IMAGE RENDER ================= */

  const imageTemplate = (row) =>
    row.image ? (
      <img
        src={`https://litstructure-server-master-ozffp0.laravel.cloud/storage/${row.image}`}
        alt={row.name}
        className="w-12 h-12 rounded object-cover"
      />
    ) : (
      <span className="text-gray-400">No Image</span>
    );

  /* ================= DOCUMENT RENDER ================= */

  const docTemplate = (row) =>
    row.documentation ? (
      <a
        href={`https://litstructure-server-master-ozffp0.laravel.cloud/storage/${row.documentation}`}
        target="_blank"
        className="text-blue-600 underline"
      >
        Download Documentation
      </a>
    ) : (
      <span className="text-gray-400">No File</span>
    );

  /* ================= ACTIONS ================= */

  const openEdit = (project) => {
    navigate(`/edit/project/${project.slug}`);
  };

  const deleteProject = (project) => {
    setProjects((prev) => prev.filter((p) => p.id !== project.id));

    DeleteProject(project.id)
      .then((res) => {
        toast.current?.show({
          severity: "warn",
          summary: "Deleted",
          detail: "Project removed successfully",
        });
      })
      .catch((err) => {
        console.error(err);

        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to delete project",
        });
      });
  };

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
        onClick={() => deleteProject(row)}
      />
    </div>
  );

  /* ================= UI ================= */

  return (
    <div className="card">
      <Toast ref={toast} position="bottom-right" />

      <DataTable
        value={projects}
        paginator
        rows={10}
        loading={loading}
        filters={filters}
        filterDisplay="row"
        globalFilterFields={["name", "description", "client.name"]}
        header={header}
        showGridlines
        emptyMessage="No projects found."
      >
        <Column key="name" field="name" header="Project Name" filter />

        <Column key="client.name" field="client.name" header="Client" />

        <Column key="inceptionDate" field="inceptionDate" header="Start Date" />
        <Column key="completionDate" field="completionDate" header="End Date" />

        <Column key="documentation" header="Documentation" body={docTemplate} />

        <Column
          key="completed"
          header="Completed"
          body={(r) => boolTag(r.isCompleted)}
        />
        <Column
          key="finalized"
          header="Finalized"
          body={(r) => boolTag(r.isFinalized)}
        />

        <Column key="actions" header="Actions" body={actionsTemplate} />
      </DataTable>
    </div>
  );
}
