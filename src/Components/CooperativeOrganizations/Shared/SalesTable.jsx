import { Box, Tooltip, Typography } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import React from 'react';
import { FaPen } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../Shared/DataTable';
import DeleteDialog from '../../Shared/DeleteDialog';

const SalesTable = ({
  salesData,
  salesDataLoading,
  deleteId,
  setDeleteId,
  deleteURL,
  editURL,
  refetch,
  count,
  setPage,
  pageSize,
  setPageSize,
}) => {
  const navigate = useNavigate();

  const salesTableColumn = [
    {
      field: 'division',
      headerName: 'বিভাগ এর নাম',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      //   width: 50,
      renderCell: ({ row }) => (
        <Typography color={'textBlack'}>{row?.division?.name}</Typography>
      ),
    },
    {
      field: 'district',
      headerName: 'জেলা এর নাম',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      //   width: 50,
      renderCell: ({ row }) => (
        <Typography color={'textBlack'}>{row?.district?.name}</Typography>
      ),
    },
    {
      field: 'address',
      headerName: 'ঠিকানা',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      //   width: 50,
      renderCell: ({ value }) => (
        <Typography
          sx={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            width: '150px',
            textAlign: 'center',
          }}
          color={'textBlack'}
        >
          {value || 'N/A'}
        </Typography>
      ),
    },
    {
      field: 'phone',
      headerName: 'ফোন নম্বর',
      flex: 1,
      headerAlign: 'center',
      align: 'center',

      //   minWidth: 200,
      renderCell: ({ value }) => (
        <Typography color={'textBlack'}>{value}</Typography>
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'একশন',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      //   width: 200,
      getActions: ({ row }) => {
        return [
          <Tooltip title='Edit' placement='top'>
            <GridActionsCellItem
              icon={
                <Box
                  component={FaPen}
                  sx={{
                    fontSize: '15px',
                    color: 'textBlack',
                  }}
                />
              }
              label='Edit'
              onClick={() => navigate(`${editURL}/${row?.id}`)}
            />
          </Tooltip>,
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
          columns={salesTableColumn}
          rows={salesData}
          isLoading={salesDataLoading}
          autoHeight
          rowHeight={80}
          paginationMode='server'
          rowCount={count}
          pageSize={pageSize}
          onPageSizeChange={(size) => setPageSize(size)}
          onPageChange={(page) => setPage(page + 1)}
        />
      </Box>
      <DeleteDialog
        open={!!deleteId}
        handleClose={() => setDeleteId(null)}
        successRefetch={refetch}
        deleteURL={`${deleteURL}${deleteId}/`}
      />
    </Box>
  );
};

export default SalesTable;
