import { Box, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaPen } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import ViewCharacteristics from '../../../Components/Medicine/ViewMedicine/ViewCharacteristics';
import ViewMedicineAdditionalDetails from '../../../Components/Medicine/ViewMedicine/ViewMedicineAdditionalDetails';
import ViewMedicineImageAndCategory from '../../../Components/Medicine/ViewMedicine/ViewMedicineImageAndCategory';
import LoadingIndicator from '../../../Components/Shared/LoadingIndicator';

const ViewMedicine = () => {
  const { medicineId } = useParams();
  const navigate = useNavigate();
  const { data: singleMedicineData = {}, isLoading: singleCropsDataLoading } =
    useQuery([`/api/corbel/medicines/${medicineId}/`], {
      onError: () => {
        navigate(-1);
      },
      enabled: Boolean(medicineId),
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
          onClick={() => navigate(`/crops-medicine/edit/${medicineId}`)}
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
          <ViewMedicineImageAndCategory
            singleMedicineData={singleMedicineData}
          />
          <ViewCharacteristics singleMedicineData={singleMedicineData} />
          <ViewMedicineAdditionalDetails
            singleMedicineData={singleMedicineData}
          />
        </Box>
      )}
    </Box>
  );
};
export default ViewMedicine;
