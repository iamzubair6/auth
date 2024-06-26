import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import SalesFieldsAndSearch from '../../../Components/CooperativeOrganizations/Shared/SalesFieldsAndSearch';
import SalesTable from '../../../Components/CooperativeOrganizations/Shared/SalesTable';

const Warehouse = () => {
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [deleteId, setDeleteId] = useState(null);

  const pointType = 'warehouse';

  const {
    data: { results: warehouseData = [], count = 0 } = {},
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
  // console.log('warehouseData', warehouseData);

  // search
  const searchedData = warehouseData?.filter(
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
        module={'ওয়্যার হাউজ'}
        modulePath={'/cooperative-organizations/warehouse/add-warehouse'}
      />
      <SalesTable
        salesData={searchedData}
        salesDataLoading={allSalesTerritoryLoading}
        division={division}
        district={district}
        deleteId={deleteId}
        deleteURL={'/api/sales/service/sale/point/'}
        editURL={'/cooperative-organizations/warehouse/edit-warehouse'}
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

export default Warehouse;
