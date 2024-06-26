import { Avatar, Box, Tooltip, Typography } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import React from 'react';
import { FaPen } from 'react-icons/fa';
import { engToBdNum } from '../../Utils/engToBng';
import DataTable from '../Shared/DataTable';

const EditMedicineCategoryTable = ({
  medicineCategoryData,
  medicineCategoryLoading,
  setOpenEditor,
}) => {
  const tableColumn = [
    {
      field: 'id',
      headerName: 'সিরিয়াল নং',
      headerAlign: 'center',
      align: 'center',
      minWidth: 200,
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
      headerName: 'ক্যাটাগরি ছবি',
      flex: 1,
      alignItems: 'flex-start',
      headerAlign: 'center',
      align: 'center',
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
      field: 'title',
      headerName: 'টাইটেল',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      minWidth: 150,
      renderCell: ({ value }) => {
        return (
          <Typography variant='body6' color={'textBlack'}>
            {value}
          </Typography>
        );
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'একশন',
      minWidth: 200,
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
              onClick={() => setOpenEditor(row?.id)}
            />
          </Tooltip>,
        ];
      },
    },
  ];
  return (
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
        rows={medicineCategoryData}
        autoHeight
        isLoading={medicineCategoryLoading}
        hideFooterPagination
        rowHeight={120}
      />
    </Box>
  );
};

export default EditMedicineCategoryTable;
