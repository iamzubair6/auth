import { LoadingButton } from '@mui/lab';
import { Box, InputLabel, Paper, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../../Utils/axiosApi';

const AddNotification = () => {
  const { control, handleSubmit, reset } = useForm();

  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: notificationMutation,
    isLoading: notificationMutationLoading,
  } = useMutation(
    (payload) => axiosApi.post('/api/sales/service/notification/', payload),
    {
      onSuccess: ({ data }) => {
        // console.log('postdata', data);
        reset();
        navigate(`/notification`);
        queryClient.invalidateQueries(['/api/sales/service/notification/']);
        enqueueSnackbar('নোটিফিকেশন সফল ভাবে যোগ হয়েছে', {
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

    notificationMutation(data);
  };

  return (
    <Box component={'form'} onSubmit={handleSubmit(getData)}>
      <Box>
        {/* শিরোনাম */}
        <Paper sx={{ padding: '40px' }}>
          <Controller
            name={'title'}
            control={control}
            defaultValue={''}
            rules={{
              required: {
                value: true,
                message: 'শিরোনাম প্রয়োজন',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <InputLabel
                  required
                  error={Boolean(error)}
                  htmlFor='form-input-title'
                  sx={{
                    color: 'textBlack',
                    fontSize: '18px',
                  }}
                >
                  শিরোনাম
                </InputLabel>
                <TextField
                  id='form-input-title'
                  variant='outlined'
                  type='text'
                  placeholder='শিরোনাম লিখুন'
                  error={Boolean(error)}
                  helperText={Boolean(error) && error?.message}
                  sx={{
                    border: 1,
                    borderColor: 'primary.main',
                    width: { xs: '250px', xl: '350px' },
                    borderRadius: '5px',
                    mt: '10px',
                    height: '40px',
                    '& .MuiInputBase-input': {
                      padding: '7px',
                    },
                  }}
                  {...field}
                />
              </>
            )}
          />
        </Paper>
        {/* নোটিফিকেশন এর বর্ণনা */}
        {/* <TextEditor
          control={control}
          title="নোটিফিকেশন এর বর্ণনা"
          helperText="নোটিফিকেশন এর বর্ণনা প্রয়োজন"
          fieldName="description"
        /> */}
        <Paper sx={{ padding: '40px', mt: '30px' }}>
          <Controller
            name={'description'}
            control={control}
            defaultValue={''}
            rules={{
              required: {
                value: true,
                message: 'নোটিফিকেশন এর বর্ণনা প্রয়োজন',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <InputLabel
                  required
                  error={Boolean(error)}
                  htmlFor='form-input-description'
                  sx={{
                    color: 'textBlack',
                    fontSize: '18px',
                  }}
                >
                  নোটিফিকেশন এর বর্ণনা
                </InputLabel>
                <TextField
                  id='form-input-description'
                  variant='outlined'
                  type='text'
                  placeholder='নোটিফিকেশন এর বর্ণনা'
                  error={Boolean(error)}
                  helperText={Boolean(error) && error?.message}
                  sx={{
                    border: 1,
                    borderColor: 'primary.main',
                    width: { xs: '300px', xl: 1 },
                    borderRadius: '5px',
                    mt: '10px',
                    height: '250px',
                    '& .MuiInputBase-input': {
                      padding: '7px',
                    },
                  }}
                  {...field}
                />
              </>
            )}
          />
        </Paper>
      </Box>
      <LoadingButton
        loading={notificationMutationLoading}
        variant='button2'
        type='submit'
        fullWidth
        sx={{
          color: 'textWhite',
          fontSize: '16px',
          height: '40px',
          mt: '30px',
        }}
      >
        সাবমিট করুন
      </LoadingButton>
    </Box>
  );
};

export default AddNotification;
