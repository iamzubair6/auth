import { Avatar, Box, Tooltip, Typography } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { FaPen } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import DataTable from './DataTable';
import DeleteDialog from './DeleteDialog';

const AllCropsTable = ({
  count,
  setPage,
  pageSize,
  setPageSize,
  refetch,
  allCropsLoading,
  allCrops,
}) => {
  // console.log(allCrops);
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);

  const tableColumn = [
    {
      field: 'title',
      headerName: 'ফসলের নাম',
      // flex: 1,
      headerAlign: 'center',
      minWidth: 200,
      renderCell: ({ row }) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            width: 1,
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              height: '50px',
              width: '50px',
              border: 1,
              borderColor: 'black',
              borderRadius: '5px',
            }}
          >
            <Avatar
              variant='rounded'
              src={row?.image}
              alt={row?.title}
              sx={{
                height: 1,
                width: 1,
              }}
            />
          </Box>
          <Typography variant={'body7'} color={'textBlack'}>
            {row?.title}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'disease',
      headerName: 'ফসলের বালাই সমূহ',
      flex: 1,
      alignItems: 'flex-start',
      headerAlign: 'center',
      align: 'center',
      minWidth: 200,
      renderCell: ({ value }) => {
        return (
          <Box
            sx={{
              display: 'flex',
              gap: '65px',
              overflow: 'auto',
              overflowY: 'hidden',
              '&::-webkit-scrollbar': {
                height: '0px !important',
              },
            }}
          >
            {value?.map((item, idx) => {
              return (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    width: 1,
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      height: '50px',
                      width: '50px',
                      border: 1,
                      borderColor: 'black',
                      borderRadius: '5px',
                    }}
                  >
                    <Avatar
                      variant='rounded'
                      src={item?.image}
                      alt={item?.title}
                      sx={{
                        height: 1,
                        width: 1,
                      }}
                    />
                  </Box>
                  <Typography variant={'body7'} color={'textBlack'}>
                    {item?.title}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        );
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'একশন',
      width: 150,
      getActions: ({ row }) => {
        return [
          <Tooltip title='View' placement='top'>
            <GridActionsCellItem
              icon={
                <Box
                  component={AiOutlineEye}
                  sx={{
                    fontSize: '15px',
                    color: 'textBlack',
                  }}
                />
              }
              label='View'
              onClick={() => navigate(`/all-crops/${row?.id}`)}
            />
          </Tooltip>,
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
              onClick={() => navigate(`/all-crops/edit/${row?.id}`)}
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
          columns={tableColumn}
          rows={allCrops}
          autoHeight
          isLoading={allCropsLoading}
          rowHeight={105}
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
          deleteURL={`/api/corbel/crops/${deleteId}/`}
        />
      </Box>
    </Box>
  );
};

export default AllCropsTable;
