import { Box } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
import ArchiveFeedbackTable from '../../Components/CustomerFeedback/ArchiveFeedbackTable';
import ArchiveFieldsAndSearch from '../../Components/CustomerFeedback/ArchiveFieldsAndSearch';
import axiosApi from '../../Utils/axiosApi';

const ArchiveCustomerFeedback = () => {
  const queryClient = useQueryClient();

  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [deleteId, setDeleteId] = useState(null);
  // archive
  const [selected, setSelected] = useState([]);

  const { mutate: archiveMutation, isLoading: archiveLoading } = useMutation(
    (payload) =>
      axiosApi.post(
        '/api/dashboard/user/crops/archive/?is_archived=false',
        payload
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['/api/dashboard/user/crops/diseases/']);
        setSelected([]);
        refetch();
        enqueueSnackbar('সফল ভাবে আন আর্কাইভ হয়েছে', {
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
    if (selected.includes(id)) {
      setSelected((prev) => prev.filter((item) => item !== id));
    } else {
      setSelected((prev) => [...prev, id]);
    }
  };

  const handleArchive = () => {
    archiveMutation({ usercropsdiseases: selected });
  };
  // archive end

  const {
    data: { results: archiveFeedbackData = [], count = 0 } = {},
    isLoading: allSalesTerritoryLoading,
    refetch,
  } = useQuery(
    [
      `/api/dashboard/user/crops/diseases/?is_archived=true&district=${district}&division=${division}&page=${page}&page_size=${pageSize}`,
      page,
      pageSize,
    ],
    {
      cacheTime: 0,
      refetchOnMount: true,
    }
  );
  // console.log('archiveFeedbackData', archiveFeedbackData);

  // search
  const searchedData = archiveFeedbackData?.filter(
    (item) =>
      item?.phone?.toLowerCase().includes(searchItem?.toLowerCase()) ||
      item?.name?.toLowerCase().includes(searchItem?.toLowerCase()) ||
      item?.division?.name?.toLowerCase().includes(searchItem?.toLowerCase()) ||
      item?.district?.name?.toLowerCase().includes(searchItem?.toLowerCase())
  );
  // --- search end---

  return (
    <Box>
      <ArchiveFieldsAndSearch
        division={division}
        selected={selected}
        setDivision={setDivision}
        setDistrict={setDistrict}
        setSearchItem={setSearchItem}
        handleArchive={handleArchive}
        archiveLoading={archiveLoading}
      />
      <ArchiveFeedbackTable
        salesData={searchedData}
        salesDataLoading={allSalesTerritoryLoading}
        division={division}
        district={district}
        deleteId={deleteId}
        deleteURL={'/api/dashboard/user/crops/diseases/'}
        viewURL={'/customer-feedback/'}
        setDeleteId={setDeleteId}
        refetch={refetch}
        count={count}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        selected={selected}
        handleChecked={handleChecked}
      />
    </Box>
  );
};

export default ArchiveCustomerFeedback;
