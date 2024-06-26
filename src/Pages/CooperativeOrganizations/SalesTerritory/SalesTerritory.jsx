import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import SalesFieldsAndSearch from '../../../Components/CooperativeOrganizations/Shared/SalesFieldsAndSearch';
import SalesTable from '../../../Components/CooperativeOrganizations/Shared/SalesTable';

const SalesTerritory = () => {
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [deleteId, setDeleteId] = useState(null);

  const pointType = 'territory';

  const {
    data: { results: salesTerritoryData = [], count = 0 } = {},
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
  // console.log('salesTerritoryData', salesTerritoryData);

  // search
  const searchedData = salesTerritoryData?.filter(
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
        module={'সেলস্ টেরিটরি'}
        modulePath={
          '/cooperative-organizations/sales-territory/add-sales-territory'
        }
      />
      <SalesTable
        salesData={searchedData}
        salesDataLoading={allSalesTerritoryLoading}
        division={division}
        district={district}
        deleteId={deleteId}
        deleteURL={'/api/sales/service/sale/point/'}
        editURL={
          '/cooperative-organizations/sales-territory/edit-sales-territory'
        }
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

export default SalesTerritory;
