import { Box, Tooltip, Typography } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import DataTable from '../../Shared/DataTable';
import { useNavigate } from 'react-router-dom';
import DeleteDialog from '../../Shared/DeleteDialog';

const NearestServiceCenterTable = ({
  allServiceCenter,
  allServiceCenterLoading,
  setPage,
  pageSize,
  setPageSize,
  refetch,
  count,
}) => {
  const navigate = useNavigate();

  const [deleteId, setDeleteId] = useState(null);

  const serviceCenterTableColumn = [
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
          }}
          color={'textBlack'}
        >
          {value}
        </Typography>
      ),
    },
    {
      field: 'name',
      headerName: 'প্রতিনিধির নাম ',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      //   minWidth: 200,
      renderCell: ({ value }) => (
        <Typography color={'textBlack'}>{value}</Typography>
      ),
    },
    {
      field: 'designation',
      headerName: 'প্রতিনিধির ধরন',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      //   minWidth: 200,
      renderCell: ({ value }) => (
        <Typography color={'textBlack'}>
          {value == 'manager' ? 'সেলস্ ম্যানেজার' : 'সেলস্ অফিসার'}
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
              onClick={() =>
                navigate(
                  `/cooperative-organizations/edit-sales-person/${row?.designation}/${row?.id}`
                )
              }
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
          columns={serviceCenterTableColumn}
          rows={allServiceCenter}
          autoHeight
          isLoading={allServiceCenterLoading}
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
        deleteURL={`/api/sales/service/sales/person/${deleteId}/`}
      />
    </Box>
  );
};

export default NearestServiceCenterTable;
