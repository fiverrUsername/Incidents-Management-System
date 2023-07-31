import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid, GridColDef, GridColumnVisibilityModel, GridOverlays, GridRowSelectionModel, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { CustomNoRowsOverlay } from "./customNoRowsOverlay";
import { CustomFooter } from "./footer";
import React from "react";
import LinearProgress from '@mui/material/LinearProgress';
import theme from "../../theme";

import { useNavigate } from 'react-router-dom';
export interface TableProps<T> {
  columns: GridColDef[];
  rows: Array<T>;
  isLoading: boolean;
  visibilityModel: GridColumnVisibilityModel | undefined
}

export const PAGE_SIZE = 6;

const Table = <T extends object>({ columns, rows, isLoading, visibilityModel }: TableProps<T>) => {
  const navigate = useNavigate();

  const [paginationModel, setPaginationModel] = useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState<GridColumnVisibilityModel>(visibilityModel!);

  const handleSelectionChange = (rowSelectionModel: GridRowSelectionModel) => {
    const timelineUrl = `/timeline/${rowSelectionModel[0]}`;
    navigate(timelineUrl);
  };

  return (
    <>
      <DataGrid style={{ height: 540, width: "98%" }}
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
        getRowId={(row) => row.id}
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
          border: 'none',
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: theme.palette.secondary.light
          },
          marginLeft:2,
          marginRight:2,
          '& .MuiDataGrid-toolbarContainer': {
            marginBottom: '10px', // Add margin to the toolbar container
          },
          // "& .MuiDataGrid-row": {
          //   borderRight:`1px solid ${theme.palette.grey[300]}`,
          //   borderLeft:`1px solid ${theme.palette.grey[300]}`
          // },
        }}
      />
    </>
  );
};
export default Table;
