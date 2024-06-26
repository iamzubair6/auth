import { Box } from '@mui/material';
import React from 'react';
import FilterAndSearch from '../../../Components/CooperativeOrganizations/NearestServiceCenter/FilterAndSearch';
import { useState } from 'react';
import NearestServiceCenterTable from '../../../Components/CooperativeOrganizations/NearestServiceCenter/NearestServiceCenterTable';
import { useQuery } from '@tanstack/react-query';

const NearestServiceCenter = () => {
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [designation, setDesignation] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const {
    data: { results: allServiceCenter = [], count = 0 } = {},
    isLoading: allServiceCenterLoading,
    refetch,
  } = useQuery(
    [
      `/api/sales/service/sales/person/?district=${district}&division=${division}&designation=${designation}&page=${page}&page_size=${pageSize}`,
      page,
      pageSize,
    ],
    {
      cacheTime: 0,
      refetchOnMount: true,
    }
  );
  // console.log('allServiceCenter', allServiceCenter);

  // search persons
  const searchedData = allServiceCenter?.filter(
    (item) =>
      item?.name?.toLowerCase().includes(searchItem?.toLowerCase()) ||
      item?.phone?.toLowerCase().includes(searchItem?.toLowerCase())
  );
  // ---end---

  return (
    <Box>
      <FilterAndSearch
        division={division}
        setDivision={setDivision}
        setDistrict={setDistrict}
        setDesignation={setDesignation}
        setSearchItem={setSearchItem}
      />
      <NearestServiceCenterTable
        division={division}
        district={district}
        designation={designation}
        allServiceCenter={searchedData}
        allServiceCenterLoading={allServiceCenterLoading}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        refetch={refetch}
        count={count}
      />
    </Box>
  );
};

export default NearestServiceCenter;
