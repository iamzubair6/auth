import { Box, Checkbox, Tooltip, Typography } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import React from 'react';
import { FaEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import DataTable from '../Shared/DataTable';
import DeleteDialog from '../Shared/DeleteDialog';

const ArchiveFeedbackTable = ({
  salesData,
  salesDataLoading,
  deleteId,
  setDeleteId,
  deleteURL,
  viewURL,
  refetch,
  count,
  setPage,
  pageSize,
  setPageSize,
  selected,
  handleChecked,
}) => {
  const navigate = useNavigate();

  const salesTableColumn = [
    {
      field: 'id',
      headerName: 'একাধিক সিলেক্ট করুন',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ value }) => (
        <Typography color={'textBlack'}>
          <Checkbox
            checked={Boolean(selected.includes(value))}
            onChange={() => handleChecked(value)}
            sx={{ padding: 0, mr: '3px' }}
          />
        </Typography>
      ),
    },
    {
      field: 'name',
      headerName: 'গ্রাহকের নাম',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      //   minWidth: 200,
      renderCell: ({ value }) => (
        <Typography color={'textBlack'}>{value}</Typography>
      ),
    },
    {
      field: 'address',
      headerName: 'ঠিকানা',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      //   width: 50,
      renderCell: ({ row }) => (
        <Typography color={'textBlack'}>
          {row?.division?.name}, {row?.district?.name}
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
          <Tooltip title="View" placement="top">
            <GridActionsCellItem
              icon={
                <Box
                  component={FaEye}
                  sx={{
                    fontSize: '15px',
                    color: 'textBlack',
                  }}
                />
              }
              label="View"
              onClick={() => navigate(`${viewURL}${row?.id}`)}
            />
          </Tooltip>,
          <Tooltip title="Delete" placement="top">
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
              label="Delete"
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
          paginationMode="server"
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

export default ArchiveFeedbackTable;
