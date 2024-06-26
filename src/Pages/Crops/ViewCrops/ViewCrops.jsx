import { Box, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaPen } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import ViewDiseaseAndImage from '../../../Components/Crops/ViewCrops/ViewDiseaseAndImage';
import ViewImageAndCategory from '../../../Components/Crops/ViewCrops/ViewImageAndCategory';
import LoadingIndicator from '../../../Components/Shared/LoadingIndicator';

const ViewCrops = () => {
  const { cropsId } = useParams();
  const navigate = useNavigate();
  const { data: singleCropsData = {}, isLoading: singleCropsDataLoading } =
    useQuery([`/api/corbel/crops/${cropsId}/`], {
      onError: () => {
        navigate(-1);
      },
      enabled: Boolean(cropsId),
      refetchOnMount: true,
      cacheTime: 0,
    });
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '22px',
          mb: '20px',
        }}
      >
        <Button
          onClick={() => navigate(`/all-crops/edit/${cropsId}`)}
          variant='button2'
          sx={{
            gap: '8px',
            color: 'textWhite',
          }}
        >
          <FaPen />
          এডিট করুন
        </Button>
      </Box>
      {Boolean(singleCropsDataLoading) ? (
        <LoadingIndicator height={'50vh'} />
      ) : (
        <Box>
          <ViewImageAndCategory singleCropsData={singleCropsData} />
          <ViewDiseaseAndImage singleCropsData={singleCropsData} />
        </Box>
      )}
    </Box>
  );
};

export default ViewCrops;
