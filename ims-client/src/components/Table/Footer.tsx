import { GridFooterContainer, useGridApiContext } from "@mui/x-data-grid";
import { useState } from "react";
import { PAGE_SIZE } from "./table";
import React from 'react';
import theme from "../../theme";
import { PaginationComponent } from "./pagination";
import CustomTextField from "../customTextField/customTextfield";

export const CustomFooter = (): JSX.Element => {

    const gridApi = useGridApiContext();
    const [rowCount, setRowCount] = useState(PAGE_SIZE);

    const handleRowCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRowCount = parseInt(event.target.value, 10);
        if (newRowCount <= 100 && newRowCount >= 0) {
            setRowCount(newRowCount);
            gridApi.current?.setPageSize(newRowCount);
        }
    };

    return (
        <GridFooterContainer>
            <PaginationComponent />
            <div style={{ flexGrow: 1, textAlign: 'right' }} >
                show:
            </div>
            <CustomTextField theme={theme}
                type="number"
                value={rowCount}
                onChange={handleRowCountChange}
            />
        </GridFooterContainer>
    );
};
