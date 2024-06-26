import { LoadingButton } from '@mui/lab';
import { Button, Paper } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../../../Utils/axiosApi';
import AddSalesOfficerFields from '../../../Components/CooperativeOrganizations/NearestServiceCenter/AddSalesOfficerFields';

const AddSalesOfficer = () => {
  const navigate = useNavigate();
  const [division, setDivision] = useState('');
  // console.log(division);

  const { data: divisions = [] } = useQuery(['/api/sales/service/division/']);

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      officer: [
        {
          division: '',
          district: '',
          name: '',
          phone: '+880',
          address: '',
          designation: 'officer',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'officer',
  });

  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  const { mutate: managerMutation, isLoading: managerMutationLoading } =
    useMutation(
      (payload) => axiosApi.post('/api/sales/service/sales/person/', payload),
      {
        onSuccess: ({ data }) => {
          // console.log('postdata', data);
          reset();
          navigate(`/cooperative-organizations`);
          queryClient.invalidateQueries(['/api/sales/service/sales/person/']);
          enqueueSnackbar('ম্যানেজার সফল ভাবে যোগ হয়েছে', {
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
    // console.log('payload', data);

    managerMutation(data?.officer);
  };

  return (
    <Paper
      sx={{ padding: '45px' }}
      component={'form'}
      onSubmit={handleSubmit(getData)}
    >
      {fields.map((item, index, arr) => {
        return (
          <AddSalesOfficerFields
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
            name: '',
            phone: '+880',
            address: '',
            designation: 'officer',
          })
        }
      >
        <AiOutlinePlusCircle />
        আরো যোগ করুন
      </Button>
      <LoadingButton
        loading={managerMutationLoading}
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

export default AddSalesOfficer;
