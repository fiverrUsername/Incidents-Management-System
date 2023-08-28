import { Typography } from "@mui/material";
import { GridColumnHeaderParams } from "@mui/x-data-grid";
import React from "react";

export const ColumnHeader: React.FC<{ params: GridColumnHeaderParams }> = ({ params }) => {
  return (
    <Typography variant="bold">
      {params.colDef.headerName}
    </Typography>
  );
};

