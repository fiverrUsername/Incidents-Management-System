import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { CustomFooter } from './Footer';
import { useState } from 'react';
import React from 'react';

export interface TableProps<T> {
    columns: GridColDef[];
    rows: Array<T>,
}
export const PAGE_SIZE =5;

const Table = <T extends object>({ columns, rows }: TableProps<T>) => {

    const [paginationModel, setPaginationModel] = useState({
        pageSize: PAGE_SIZE,
        page: 0,
    });
    return (
        <DataGrid
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            slots={{
                footer: CustomFooter,
                columnSortedDescendingIcon: ExpandMoreIcon,
                columnSortedAscendingIcon: ExpandLessIcon,

            }}

            disableColumnMenu
            columns={columns}
            rows={rows}
            sx={{
                '.MuiDataGrid-iconButtonContainer': {
                    visibility: 'visible',
                },
                '.MuiDataGrid-sortIcon': {
                    opacity: 'inherit !important',
                },
                borderRadius: '25px',
            }}


        />
    );
}
export default Table;


