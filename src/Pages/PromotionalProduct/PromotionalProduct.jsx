import { Box, Button, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import PromotionalProductTable from '../../Components/PromotinalProduct/PromotionalProductTable';

const PromotionalProduct = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const navigate = useNavigate();
  const {
    data: { results: promotionalData = [], count = 0 } = {},
    isLoading: promotionalDataLoading,
    refetch,
  } = useQuery(
    [
      `/api/corbel/promotion/?page=${page}&page_size=${pageSize}`,
      page,
      pageSize,
    ],
    {
      cacheTime: 0,
      refetchOnMount: true,
    }
  );
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          my: '45px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <Typography variant='body6'>প্রোডাক্ট প্রমোশন</Typography>
          <Button
            variant='button1'
            sx={{ gap: '8px', color: 'textWhite' }}
            onClick={() =>
              navigate('/promotional-product/add-promotional-product')
            }
          >
            <AiOutlinePlusCircle /> প্রোডাক্ট প্রমোশন এর ছবি যোগ করুন
          </Button>
        </Box>
      </Box>
      <PromotionalProductTable
        promotionalData={promotionalData}
        count={count}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        refetch={refetch}
        promotionalDataLoading={promotionalDataLoading}
      />
    </Box>
  );
};
export default PromotionalProduct;
