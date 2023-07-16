import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid, GridColDef, GridColumnVisibilityModel, GridOverlays, GridRowSelectionModel, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { CustomNoRowsOverlay } from "./customNoRowsOverlay";
import { CustomFooter } from "./footer";
import React from "react";
import LinearProgress from '@mui/material/LinearProgress';
import theme from "../../theme";



export interface TableProps<T> {
  columns: GridColDef[];
  rows: Array<T>;
  isLoading: boolean;
  visibilityModel: GridColumnVisibilityModel | undefined
}

export const PAGE_SIZE = 5;

const handleSelectionChange = (rowSelectionModel: GridRowSelectionModel) => {
  console.log('Selected rows:', rowSelectionModel[0]);    // Add your logic to perform actions on the selected row(s)
};

const Table = <T extends object>({ columns, rows, isLoading, visibilityModel }: TableProps<T>) => {

  const [paginationModel, setPaginationModel] = useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });

  const [columnVisibilityModel, setColumnVisibilityModel] =
    React.useState<GridColumnVisibilityModel>(visibilityModel!);

  return (
    <>
      <DataGrid style={{  width: "100%" }}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        slots={{
          footer: CustomFooter,
          columnSortedDescendingIcon: ExpandMoreIcon,
          columnSortedAscendingIcon: ExpandLessIcon,
          loadingOverlay: LinearProgress,
          noRowsOverlay: CustomNoRowsOverlay,
          toolbar: GridToolbar
        }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibilityModel(newModel)
        }
        onRowSelectionModelChange={handleSelectionChange}
        getRowId={(row) => row._id}
        disableColumnMenu
        columns={columns}
        rows={rows}
        loading={isLoading}

        sx={{
          ".MuiDataGrid-iconButtonContainer": {
            visibility: "visible",
          },
          ".MuiDataGrid-sortIcon": {
            opacity: "inherit !important",
          },
          borderRadius: "25px",
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: theme.palette.secondary.light
          },
        }}
      />
    </>
  );
};
export default Table;
