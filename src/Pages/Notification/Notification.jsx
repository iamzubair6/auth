import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import NotificationFieldsAndSearch from '../../Components/Notification/NotificationFieldsAndSearch';
import NotificationTable from '../../Components/Notification/NotificationTable';

const Notification = () => {
  const [searchItem, setSearchItem] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [deleteId, setDeleteId] = useState(null);
  const [date, setDate] = useState('');

  const {
    data: { results: notificationData = [], count = 0 } = {},
    isLoading: notificationDataLoading,
    refetch,
  } = useQuery(
    [
      `/api/sales/service/notification/?page=${page}&page_size=${pageSize}&created_at=${date}`,
      page,
      pageSize,
      date,
    ],
    {
      cacheTime: 0,
      refetchOnMount: true,
    }
  );
  // console.log('notificationData', notificationData);

  // search
  const searchedData = notificationData?.filter((item) =>
    item?.title?.toLowerCase().includes(searchItem?.toLowerCase())
  );
  // --- search end---

  return (
    <Box>
      <NotificationFieldsAndSearch
        setSearchItem={setSearchItem}
        module={'নোটিফিকেশন'}
        modulePath={'/add-notification'}
        setDate={setDate}
        date={date}
      />
      <NotificationTable
        notificationData={searchedData}
        notificationDataLoading={notificationDataLoading}
        deleteId={deleteId}
        deleteURL={'/api/sales/service/notification/'}
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

export default Notification;
