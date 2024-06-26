import { Avatar, Box, Tooltip, Typography } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { engToBdNum } from '../../Utils/engToBng';
import DataTable from '../Shared/DataTable';
import DeleteDialog from '../Shared/DeleteDialog';

const PromotionalProductTable = ({
  count,
  setPage,
  pageSize,
  setPageSize,
  refetch,
  promotionalData,
  promotionalDataLoading,
}) => {
  const [deleteId, setDeleteId] = useState(null);

  const tableColumn = [
    {
      field: 'id',
      headerName: 'সিরিয়াল নং',
      flex: 1,
      // align: 'center',
      width: 100,
      renderCell: ({ value }) => (
        <Typography
          variant='body6'
          color={'textBlack'}
          sx={{
            pl: '25px',
          }}
        >
          {engToBdNum(value)}
        </Typography>
      ),
    },
    {
      field: 'image',
      headerName: 'প্রোডাক্ট প্রমোশন এর ছবি',
      flex: 1,
      minWidth: 200,
      renderCell: ({ value }) => {
        return (
          <Avatar
            variant='rounded'
            src={value}
            sx={{
              height: '100px',
              width: '100px',
              borderRadius: '5px',
            }}
          />
        );
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'একশন',
      minWidth: 150,
      getActions: ({ row }) => {
        return [
          <Tooltip title='Delete' placement='top'>
            <GridActionsCellItem
              icon={
                <Box
                  component={MdDelete}
                  sx={{
                    fontSize: '15px',
                    color: 'textBlack',
                  }}
                />
              }
              label='Delete'
              onClick={() => setDeleteId(row?.id)}
            />
          </Tooltip>,
        ];
      },
    },
  ];
  return (
    <Box sx={{ mt: '0px' }}>
      <Box
        sx={{
          '& .MuiDataGrid-virtualScrollerContent': {
            // padding: '0 15px 0 15px',
          },
          '& .MuiDataGrid-columnHeaders': {
            // padding: '0 15px 0 15px',
          },
        }}
      >
        <DataTable
          columns={tableColumn}
          rows={promotionalData}
          autoHeight
          isLoading={promotionalDataLoading}
          rowHeight={120}
          paginationMode='server'
          rowCount={count}
          pageSize={pageSize}
          onPageSizeChange={(size) => setPageSize(size)}
          onPageChange={(page) => setPage(page + 1)}
        />

        <DeleteDialog
          open={Boolean(deleteId)}
          handleClose={() => setDeleteId(null)}
          successRefetch={refetch}
          deleteURL={`/api/corbel/promotion/${deleteId}/`}
        />
      </Box>
    </Box>
  );
};

export default PromotionalProductTable;
