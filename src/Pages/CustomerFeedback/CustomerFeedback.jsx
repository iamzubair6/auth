import { Box } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
import CustomerFeedbackFieldsAndSearch from '../../Components/CustomerFeedback/CustomerFeedbackFieldsAndSearch';
import CustomerFeedbackTable from '../../Components/CustomerFeedback/CustomerFeedbackTable';
import axiosApi from '../../Utils/axiosApi';

const CustomerFeedback = () => {
  const queryClient = useQueryClient();

  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  // archive
  const [selected, setSelected] = useState([]);
  // console.log('selected', selected);

  const { mutate: archiveMutation, isLoading: archiveLoading } = useMutation(
    (payload) =>
      axiosApi.post(
        '/api/dashboard/user/crops/archive/?is_archived=true',
        payload
      ),
    {
      onSuccess: () => {
        setSelected([]);
        refetch();
        queryClient.invalidateQueries(['/api/dashboard/user/crops/diseases/']);
        enqueueSnackbar('সফল ভাবে আর্কাইভ হয়েছে', {
          variant: 'success',
        });
      },
      onError: (err) => {
        enqueueSnackbar('কোনো একটি সমস্যা হয়েছে', {
          variant: 'error',
        });
      },
    }
  );

  const handleChecked = (id) => {
    if (selected?.includes(id)) {
      setSelected((prev) => prev?.filter((item) => item !== id));
    } else {
      setSelected((prev) => [...prev, id]);
    }
  };

  const handleArchive = () => {
    archiveMutation({ usercropsdiseases: selected });
  };

  const handleDelete = () => {
    archiveMutation({ usercropsdiseases: selected });
  };
  // archive end

  const {
    data: { results: feedbackData = [], count = 0 } = {},
    isLoading: allSalesTerritoryLoading,
    refetch,
  } = useQuery(
    [
      `/api/dashboard/user/crops/diseases/?is_archived=false&district=${district}&division=${division}&page=${page}&page_size=${pageSize}`,
      page,
      pageSize,
    ],
    {
      cacheTime: 0,
      refetchOnMount: true,
    }
  );
  // console.log('feedbackData', feedbackData);

  // search
  const searchedData = feedbackData?.filter(
    (item) =>
      item?.phone?.toLowerCase().includes(searchItem?.toLowerCase()) ||
      item?.name?.toLowerCase().includes(searchItem?.toLowerCase()) ||
      item?.division?.name?.toLowerCase().includes(searchItem?.toLowerCase()) ||
      item?.district?.name?.toLowerCase().includes(searchItem?.toLowerCase())
  );
  // --- search end---

  return (
    <Box>
      <CustomerFeedbackFieldsAndSearch
        division={division}
        district={district}
        selected={selected}
        setDivision={setDivision}
        setDistrict={setDistrict}
        setSearchItem={setSearchItem}
        handleArchive={handleArchive}
        archiveLoading={archiveLoading}
      />
      <CustomerFeedbackTable
        salesData={searchedData}
        salesDataLoading={allSalesTerritoryLoading}
        division={division}
        viewURL={'/customer-feedback'}
        refetch={refetch}
        count={count}
        page={page}
        setPage={setPage}
        setSelected={setSelected}
        pageSize={pageSize}
        setPageSize={setPageSize}
        selected={selected}
        handleChecked={handleChecked}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default CustomerFeedback;
