import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import MedicineTabsAndSearch from '../../../Components/Medicine/ManageMedicine/MedicineTabsAndSearch';
import AllMedicineTable from '../../../Components/Shared/AllMedicineTable';

const ManageMedicine = () => {
  const [selected, setSelected] = useState(1);
  const [searchItem, setSearchItem] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const {
    data: { results: allMedicine = [], count = 0 } = {},
    isLoading: allMedicineLoading,
    refetch,
  } = useQuery([
    `/api/corbel/medicines/?page=${page}&page_size=${pageSize}&category=${selected}`,
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
    <Box>
      <MedicineTabsAndSearch
        selected={selected}
        setSelected={setSelected}
        setSearchItem={setSearchItem}
      />
      <AllMedicineTable
        count={count}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        refetch={refetch}
        allMedicine={search}
        allMedicineLoading={allMedicineLoading}
      />
    </Box>
  );
};

export default ManageMedicine;
