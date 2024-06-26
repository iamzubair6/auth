import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ReatailerPointTable from '../../../Components/CooperativeOrganizations/RetailerPoint/ReatailerPointTable';
import SalesFieldsAndSearch from '../../../Components/CooperativeOrganizations/Shared/SalesFieldsAndSearch';

const RetailerPoint = () => {
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [deleteId, setDeleteId] = useState(null);

  const {
    data: { results: retailerPointData = [], count = 0 } = {},
    isLoading: allSalesTerritoryLoading,
    refetch,
  } = useQuery(
    [
      `/api/sales/service/retailer/point/?district=${district}&division=${division}&page=${page}&page_size=${pageSize}`,
      page,
      pageSize,
    ],
    {
      cacheTime: 0,
      refetchOnMount: true,
    }
  );
  // console.log('retailerPointData', retailerPointData);

  // search
  const searchedData = retailerPointData?.filter(
    (item) =>
      item?.phone?.toLowerCase().includes(searchItem?.toLowerCase()) ||
      item?.address?.toLowerCase().includes(searchItem?.toLowerCase()) ||
      item?.point_name?.toLowerCase().includes(searchItem?.toLowerCase())
  );
  // --- search end---

  return (
    <Box>
      <SalesFieldsAndSearch
        division={division}
        setDivision={setDivision}
        setDistrict={setDistrict}
        setSearchItem={setSearchItem}
        module={'রিটেইলার পয়েন্ট'}
        modulePath={
          '/cooperative-organizations/retailer-point/add-retailer-point'
        }
      />
      <ReatailerPointTable
        salesData={searchedData}
        salesDataLoading={allSalesTerritoryLoading}
        division={division}
        district={district}
        deleteId={deleteId}
        deleteURL={'/api/sales/service/retailer/point/'}
        editURL={
          '/cooperative-organizations/retailer-point/edit-retailer-point'
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

export default RetailerPoint;
