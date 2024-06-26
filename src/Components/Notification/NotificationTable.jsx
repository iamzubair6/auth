import { Box, Tooltip, Typography } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import React from 'react';
import { MdDelete } from 'react-icons/md';
import DataTable from '../Shared/DataTable';
import DeleteDialog from '../Shared/DeleteDialog';
import moment from 'moment';

const NotificationTable = ({
  notificationData,
  notificationDataLoading,
  deleteId,
  setDeleteId,
  deleteURL,
  refetch,
  count,
  setPage,
  pageSize,
  setPageSize,
}) => {
  const salesTableColumn = [
    {
      field: 'title',
      headerName: 'নোটিফিকেশন এর শিরোনাম',
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
          {value}
        </Typography>
      ),
    },
    {
      field: 'created_at',
      headerName: 'তারিখ',
      flex: 1,
      headerAlign: 'center',
      align: 'center',

      //   minWidth: 200,
      renderCell: ({ value }) => (
        <Typography color={'textBlack'}>
          {moment(value).format('DD-MM-YYYY')}
        </Typography>
      ),
    },
    {
      field: 'updated_at',
      headerName: 'সময়',
      flex: 1,
      headerAlign: 'center',
      align: 'center',

      //   minWidth: 200,
      renderCell: ({ value }) => (
        <Typography color={'textBlack'}>
          {moment(value).format('hh:mm')}
        </Typography>
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
          rows={notificationData}
          isLoading={notificationDataLoading}
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

export default NotificationTable;
