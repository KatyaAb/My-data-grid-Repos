import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { rows } from "./mock";

export default function DataGridDemo() {
  const [expanded, setExpanded] = React.useState(-1);
  const id = expanded - 1;

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      renderCell: (params) => {
        const opened = expanded === params.value ? true : false;

        const handleExpandClick = () => {
          setExpanded(params.value);
        };

        const hasChildren =
          params.row.children && params.row.children.length > 0;

        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {hasChildren && (
              <div
                style={{
                  cursor: "pointer",
                  marginRight: "8px",
                  fontWeight: "bold"
                }}
                onClick={handleExpandClick}
              >
                {opened ? "-" : "+"}
              </div>
            )}
            {params.value}
            {opened &&
              params.row.children.map((row) => (
                <div key={row.id}>{row.id}</div>
              ))}
          </div>
        );
      }
    },
    {
      field: "countriesAndTerritories",
      headerName: "Страна",
      width: 150,
      editable: true,
      renderCell: (params) => {
        let opened = rows[id]?.firstName === params.value ? true : false;

        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {params.value}
            {opened &&
              params.row.children.map((row) => (
                <div key={row.name}>{row.name}</div>
              ))}
          </div>
        );
      }
    },

    {
      field: "cases",
      headerName: "Количество случаев",
      type: "number",
      width: 240,
      editable: true
    },
    {
      field: "deaths",
      headerName: "Количество смертей",
      type: "number",
      width: 240,
      editable: true
    }
  ];

  const getDetailPanelContent = (params) => {
    console.log(params);
    return null;
  }; // Параметр не передает данные, можно удалять
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getDetailPanelContent={getDetailPanelContent}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
