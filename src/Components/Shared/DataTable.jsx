import { Box } from '@mui/material';
import MuiPagination from '@mui/material/Pagination';
import {
  DataGrid,
  gridPageCountSelector,
  GridPagination,
  GridToolbar,
  useGridApiContext,
  useGridSelector,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import React, { useState } from 'react';

function Pagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      shape='rounded'
      variant='outlined'
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
      }}
      sx={{
        '& .MuiPaginationItem-root.Mui-selected': {
          backgroundColor: 'color1.main',
          color: 'white',
          '&:hover': {
            color: 'white',
            backgroundColor: 'color1.main',
          },
        },
      }}
    />
  );
}

function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}
const DataTable = ({
  columns = [],
  rows = [],
  autoHeight = false,
  rowHeight = 80,
  invoice = false,
  isLoading = false,
  ...dataGridProps
}) => {
  const [pageSize, setPageSize] = useState(6);

  return (
    <Box sx={{ height: autoHeight ? 'unset' : 635, width: '100%' }}>
      <DataGrid
        sx={{
          border: 0,

          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: invoice ? 'none' : 'color1.main',
            color: invoice ? 'black' : 'white',
            textTransform: 'uppercase',
            '@media print': {
              width: 'fit-content',
              fontSize: '10px',
              height: 'fit-content',
              overflow: 'visible',
            },
          },
          '& .MuiDataGrid-iconSeparator': {
            display: 'none',
          },
          '& .MuiDataGrid-virtualScrollerContent': {
            // padding: '15px',
          },
          '& .MuiDataGrid-main': {
            border: invoice ? '0' : '1px solid rgba(224, 224, 224, 1)',
            // marginTop: '20px',
            '@media print': {
              width: 'fit-content',
              fontSize: '10px',
              height: 'fit-content',
              overflow: 'visible',
            },
          },
          '& .MuiDataGrid-cell': {
            border: invoice ? '1' : '0 !important',
            '&:focus': {
              outline: 'none',
            },
          },
          '& .MuiDataGrid-cell:focus-within': {
            outline: 'none !important',
          },
          '& .MuiDataGrid-columnHeader:focus-within': {
            outline: 'none !important',
          },
          '& .MuiDataGrid-row': {
            '&:hover': {
              backgroundColor: 'unset',
            },
            '&:nth-of-type(even)': {
              backgroundColor: '#EFF1F4',
              '@media print': {
                backgroundColor: 'unset',
              },
            },
          },
          '& .MuiDataGrid-cellContent': {
            color: 'textBlack',
            fontSize: '14px',
          },
        }}
        rows={rows}
        loading={isLoading}
        columns={columns}
        pageSize={pageSize}
        disableSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnMenu
        rowHeight={rowHeight}
        autoHeight={autoHeight}
        // hideFooterPagination
        hideFooterSelectedRowCount
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[1, 5, 6, 7, 10, 20, 35, 50, 70, 100]}
        components={{
          Pagination: CustomPagination,
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        {...dataGridProps}
      />
    </Box>
  );
};

export default DataTable;
