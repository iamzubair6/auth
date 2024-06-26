import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from '../../../Utils/axiosApi';
import { Box, Paper } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import EditSalesComponentsField from '../../../Components/CooperativeOrganizations/Shared/EditSalesComponentsField';

const EditSalesTerritory = () => {
  const navigate = useNavigate();
  let { paramsId } = useParams();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit, setValue, watch } = useForm();

  const { data: salesData = {} } = useQuery(
    [`/api/sales/service/sale/point/${paramsId}/`],
    {
      onSuccess: (salesData) => {
        setValue('phone', salesData?.phone);
        setValue('address', salesData?.address);
        setValue('division', salesData?.division?.id);
        setValue('district', salesData?.district?.id);
      },
      cacheTime: 0,
      refetchOnMount: true,
    }
  );

  const {
    mutate: salesTerritoryMutation,
    isLoading: salesTerritoryMutationLoading,
  } = useMutation(
    (payload) =>
      axiosApi.patch(`/api/sales/service/sale/point/${paramsId}/`, payload, {
        headers: {
          'content-type': 'application/json',
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          `/api/sales/service/sale/point/${paramsId}/`,
        ]);
        enqueueSnackbar('Successfully Updated', {
          variant: 'success',
        });
        navigate(-1);
      },
      onError: () => {
        enqueueSnackbar('Something went wrong', {
          variant: 'error',
        });
      },
    }
  );

  const patchData = (data) => {
    // console.log('payload', data);
    salesTerritoryMutation(data);
  };

  return (
    <Box component={'form'} onSubmit={handleSubmit(patchData)}>
      <Paper sx={{ padding: '45px' }}>
        <EditSalesComponentsField control={control} watch={watch} />
      </Paper>
      <LoadingButton
        loading={salesTerritoryMutationLoading}
        variant="button2"
        type="submit"
        fullWidth
        sx={{
          color: 'textWhite',
          fontSize: '16px',
          height: '40px',
          mt: '40px',
        }}
      >
        আপডেট করুন
      </LoadingButton>
    </Box>
  );
};

export default EditSalesTerritory;
