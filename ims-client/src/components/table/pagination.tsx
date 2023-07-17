import { Pagination } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import React from "react";

export const PaginationComponent = () => {
  const StyledPagination = styled(Pagination)(({ theme }) => ({
    "& .MuiPaginationItem-root:hover, & .MuiPaginationItem-root.Mui-selected": {
      color: "white",
      backgroundColor: theme.palette.secondary.main,
    },
  }));

  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    
      <StyledPagination
        page={page + 1}
        count={pageCount}
        onChange={(event: React.ChangeEvent<unknown>, value: number) =>
          apiRef.current.setPage(value - 1)
        }
      />
  );
};
