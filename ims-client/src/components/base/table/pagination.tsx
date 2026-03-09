import { StyledComponent } from "@emotion/styled";
import { Pagination, PaginationProps } from "@mui/material";
import { styled, Theme } from "@mui/material/styles";
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import React from "react";
import { MUIStyledCommonProps } from '@mui/system';
import { GridApiCommunity } from "@mui/x-data-grid/internals";

export const PaginationComponent = () => {
  const StyledPagination: StyledComponent<PaginationProps & MUIStyledCommonProps<Theme>, {}, {}>
    = styled(Pagination)(({ theme }) => ({
      "& .MuiPaginationItem-root:hover, & .MuiPaginationItem-root.Mui-selected": {
        color: "white",
        backgroundColor: theme.palette.secondary.main,
      },
    }));

  const apiRef: React.MutableRefObject<GridApiCommunity> = useGridApiContext();
  const page: number = useGridSelector(apiRef, gridPageSelector);
  const pageCount: number = useGridSelector(apiRef, gridPageCountSelector);

  return (

    <StyledPagination
      page={page + 1}
      count={pageCount}
      onChange={(_event: React.ChangeEvent<unknown>, value: number) =>
        apiRef.current.setPage(value - 1)
      }
    />
  );
};