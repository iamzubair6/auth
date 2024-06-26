import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { Fragment, useState } from 'react';
import AllCropsTable from '../Shared/AllCropsTable';
import SearchField from '../Shared/SearchField';

const CropList = () => {
  // all state management
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [searchItem, setSearchItem] = useState('');
  // ---end---
  // quary
  const {
    data: { results: allCrops = [], count = 0 } = {},
    isLoading: allCropsLoading,
    refetch,
  } = useQuery([
    `/api/corbel/crops/?page=${page}&page_size=${pageSize}`,
    page,
    pageSize,
  ]);
  // quary end

  // search crops
  const search = allCrops?.filter(
    (item) =>
      item?.title?.toLowerCase().includes(searchItem?.toLowerCase()) ||
      item?.disease?.some((ds) =>
        ds?.title?.toLowerCase().includes(searchItem?.toLowerCase())
      )
  );
  // ---end---
  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: '40px',
        }}
      >
        <Box>
          <Typography sx={{ fontSize: '18px' }} variant='body5'>
            ফসলের তালিকা
          </Typography>
        </Box>
        <SearchField setSearchItem={setSearchItem} borderVariant />
      </Box>
      <AllCropsTable
        allCrops={search}
        count={count}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        refetch={refetch}
        allCropsLoading={allCropsLoading}
      />
    </Fragment>
  );
};

export default CropList;
