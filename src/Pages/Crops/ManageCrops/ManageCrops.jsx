import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import TabsAndSearch from '../../../Components/Crops/ManageCrops/TabsAndSearch';
import AllCropsTable from '../../../Components/Shared/AllCropsTable';

const ManageCrops = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const { data: categories = [] } = useQuery(['/api/corbel/crops-category/'], {
    onSuccess: (data) => {
      setSelected(data[0]?.id);
    },
  });
  // this state is for crops page tabs
  const [selected, setSelected] = useState(1);
  // console.log('selected', selected);
  const [searchItem, setSearchItem] = useState('');
  // ---end---
  const {
    data: { results: allCrops = [], count = 0 } = {},
    isLoading: allCropsLoading,
    refetch,
  } = useQuery([
    `/api/corbel/crops/?page=${page}&page_size=${pageSize}&category=${selected}`,
    page,
    pageSize,
    selected,
  ]);

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
    <Box>
      <TabsAndSearch
        categories={categories}
        selected={selected}
        setSelected={setSelected}
        setSearchItem={setSearchItem}
      />
      <AllCropsTable
        allCrops={search}
        count={count}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        refetch={refetch}
        allCropsLoading={allCropsLoading}
        searchItem={searchItem}
      />
    </Box>
  );
};

export default ManageCrops;
