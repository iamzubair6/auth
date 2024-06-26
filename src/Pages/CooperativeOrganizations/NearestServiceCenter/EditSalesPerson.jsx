import { LoadingButton } from '@mui/lab';
import { Box, Paper } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import EditSalesPersonFields from '../../../Components/CooperativeOrganizations/NearestServiceCenter/EditSalesPersonFields';
import axiosApi from '../../../Utils/axiosApi';

const EditSalesPerson = () => {
  let { paramsId, paramsDesignation } = useParams();
  const { control, handleSubmit, setValue, watch } = useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { data: salesPersonData = {} } = useQuery(
    [`/api/sales/service/sales/person/${paramsId}/`],
    {
      onSuccess: (salesPersonData) => {
        setValue('name', salesPersonData?.name);
        setValue('phone', salesPersonData?.phone);
        setValue('address', salesPersonData?.address);
        setValue('designation', salesPersonData?.designation);
        setValue('division', salesPersonData?.division?.id);
        setValue('district', salesPersonData?.district?.id);
      },
      enabled: Boolean(paramsId),
      cacheTime: 0,
      refetchOnMount: true,
    }
  );

  const { data: divisions = [] } = useQuery(['/api/sales/service/division/'], {
    cacheTime: 0,
  });

  const { data: districts = [] } = useQuery(
    [`/api/sales/service/district/?division=${watch(`division`)}`],
    {
      enabled: Boolean(watch(`division`)),
    }
  );

  const { mutate: patchSalesPerson, isLoading: mutationLoading } = useMutation(
    (payload) =>
      axiosApi.patch(`/api/sales/service/sales/person/${paramsId}/`, payload, {
        headers: {
          'content-type': 'application/json',
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          `/api/sales/service/sales/person/${paramsId}/`,
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
    patchSalesPerson(data);
  };

  return (
    <Box component={'form'} onSubmit={handleSubmit(patchData)}>
      <Paper sx={{ padding: '45px' }}>
        <EditSalesPersonFields
          control={control}
          paramsDesignation={paramsDesignation}
          divisions={divisions}
          districts={districts}
        />
      </Paper>
      <LoadingButton
        loading={mutationLoading}
        variant='button2'
        type='submit'
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

export default EditSalesPerson;
