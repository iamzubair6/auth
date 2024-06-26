import { Box, Typography } from '@mui/material';
import React, { Fragment, useState } from 'react';
import AllMedicineTable from '../Shared/AllMedicineTable';
import SearchField from '../Shared/SearchField';
import { useQuery } from '@tanstack/react-query';

const MedicineList = () => {
  // all state management
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [searchItem, setSearchItem] = useState('');
  // ---end---
  // quary
  const {
    data: { results: allMedicine = [], count = 0 } = {},
    isLoading: allMedicineLoading,
    refetch,
  } = useQuery([
    `/api/corbel/medicines/?page=${page}&page_size=${pageSize}`,
    page,
    pageSize,
  ]);
  const search = allMedicine?.filter(
    (item) =>
      item?.title?.toLowerCase().includes(searchItem?.toLowerCase()) ||
      item?.disease?.some((ds) =>
        ds?.title?.toLowerCase().includes(searchItem?.toLowerCase())
      )
  );
  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: '40px',
          mt: '60px',
        }}
      >
        <Box>
          <Typography sx={{ fontSize: '18px' }} variant='body5'>
            ফসলের ঔষধ তালিকা
          </Typography>
        </Box>
        <SearchField borderVariant setSearchItem={setSearchItem} />
      </Box>
      <AllMedicineTable
        count={count}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        refetch={refetch}
        allMedicine={search}
        allMedicineLoading={allMedicineLoading}
      />
    </Fragment>
  );
};

export default MedicineList;
