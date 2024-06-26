import { LoadingButton } from '@mui/lab';
import { Button, Paper } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../../../Utils/axiosApi';
import AddSalesComponentsField from '../../../Components/CooperativeOrganizations/Shared/AddSalesComponentsField.jsx';
import AddRetailerPointFields from '../../../Components/CooperativeOrganizations/RetailerPoint/AddRetailerPointFields';

const AddRetailerPoint = () => {
  const navigate = useNavigate();

  const { data: divisions = [] } = useQuery(['/api/sales/service/division/']);

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      retailerPoint: [
        {
          division: '',
          district: '',
          address: '',
          point_name: '',
          phone: '+880',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'retailerPoint',
  });

  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  const {
    mutate: salesTerritoryMutation,
    isLoading: salesTerritoryMutationLoading,
  } = useMutation(
    (payload) => axiosApi.post('/api/sales/service/retailer/point/', payload),
    {
      onSuccess: ({ data }) => {
        // console.log('postdata', data);
        reset();
        navigate(`/cooperative-organizations/retailer-point/`);
        queryClient.invalidateQueries(['/api/sales/service/retailer/point/']);
        enqueueSnackbar('রিটেইলার পয়েন্ট সফল ভাবে যোগ হয়েছে', {
          variant: 'success',
        });
      },
      onError: (err) => {
        // console.log('error', err);
        enqueueSnackbar('কোনো একটি সমস্যা হয়েছে', {
          variant: 'error',
        });
      },
    }
  );

  const getData = (data) => {
    // console.log('payload', data?.retailerPoint);

    salesTerritoryMutation(data?.retailerPoint);
  };

  return (
    <Paper
      sx={{ padding: '45px' }}
      component={'form'}
      onSubmit={handleSubmit(getData)}
    >
      {fields.map((item, index, arr) => {
        return (
          <AddRetailerPointFields
            fieldName="retailerPoint"
            key={item?.id}
            index={index}
            control={control}
            remove={remove}
            append={append}
            divisions={divisions}
            watch={watch}
            arr={arr}
          />
        );
      })}
      <Button
        variant="button1"
        type="button"
        sx={{ gap: '8px', color: 'textWhite', mt: '50px' }}
        onClick={() =>
          append({
            division: '',
            district: '',
            address: '',
            point_name: '',
            phone: '+880',
          })
        }
      >
        <AiOutlinePlusCircle />
        আরো যোগ করুন
      </Button>
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
        সাবমিট করুন
      </LoadingButton>
    </Paper>
  );
};

export default AddRetailerPoint;
