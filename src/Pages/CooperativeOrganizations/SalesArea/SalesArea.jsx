import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import SalesFieldsAndSearch from '../../../Components/CooperativeOrganizations/Shared/SalesFieldsAndSearch';
import SalesTable from '../../../Components/CooperativeOrganizations/Shared/SalesTable';

const SalesArea = () => {
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [deleteId, setDeleteId] = useState(null);

  const pointType = 'area';

  const {
    data: { results: salesAreaData = [], count = 0 } = {},
    isLoading: allSalesTerritoryLoading,
    refetch,
  } = useQuery(
    [
      `/api/sales/service/sale/point/?point_type=${pointType}&district=${district}&division=${division}&page=${page}&page_size=${pageSize}`,
      page,
      pageSize,
    ],
    {
      cacheTime: 0,
      refetchOnMount: true,
    }
  );
  // console.log('salesAreaData', salesAreaData);

  // search
  const searchedData = salesAreaData?.filter(
    (item) =>
      item?.phone?.toLowerCase().includes(searchItem?.toLowerCase()) ||
      item?.address?.toLowerCase().includes(searchItem?.toLowerCase())
  );
  // --- search end---

  return (
    <Box>
      <SalesFieldsAndSearch
        division={division}
        setDivision={setDivision}
        setDistrict={setDistrict}
        setSearchItem={setSearchItem}
        module={'সেলস্ এরিয়া'}
        modulePath={'/cooperative-organizations/sales-area/add-sales-area'}
      />
      <SalesTable
        salesData={searchedData}
        salesDataLoading={allSalesTerritoryLoading}
        division={division}
        district={district}
        deleteId={deleteId}
        deleteURL={'/api/sales/service/sale/point/'}
        editURL={'/cooperative-organizations/sales-area/edit-sales-area'}
        setDeleteId={setDeleteId}
        refetch={refetch}
        count={count}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </Box>
  );
};

export default SalesArea;
