import { LoadingButton } from '@mui/lab';
import { Box, InputLabel, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
import { axiosRaw } from '../../../Utils/axiosApi';

const ForgetPassword = () => {
  const [updated, setUpdated] = useState('');
  const { mutate: resetEmailMutation, isLoading } = useMutation(
    ({ email }) =>
      axiosRaw.post('/account/user/password/reset/request', {
        email,
      }),
    {
      onSuccess: () => {
        setUpdated('');
        enqueueSnackbar('অনুগ্রহ করে আপনার মেইল চেক করুন', {
          variant: 'success',
        });
      },
      onError: (error) => {
        enqueueSnackbar('কোনো একটি সমস্যা হয়েছে', { variant: 'error' });
        if (Boolean(error?.response?.data?.details)) {
          setError('email', {
            message: error?.response?.data?.details,
          });
        }
      },
    }
  );

  const handleEmailReset = () => {
    const payload = {
      email: updated,
    };
    resetEmailMutation(payload);
    // console.log(payload);
  };

  return (
    <Box sx={{ display: 'flex', gap: '30px' }}>
      {/* forget password */}
      <Box>
        <InputLabel
          htmlFor='form-input-email'
          sx={{
            color: 'textBlack',
          }}
        >
          Please Enter Your Registered Email
        </InputLabel>
        <TextField
          fullWidth
          name='email'
          type={'email'}
          value={updated}
          onChange={(e) => setUpdated(e.target.value)}
          id='form-input-email'
          variant='outlined'
          placeholder='Enter Your Mail '
          sx={{
            border: 1,
            borderColor: 'primary.main',
            height: '40px',
            width: '356px',
            borderRadius: '5px',
            mt: '10px',
            '& .MuiInputBase-input': {
              padding: '6px 11px 9px 11px',
            },
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'end' }}>
        <LoadingButton
          loading={isLoading}
          variant='button1'
          sx={{ height: '40px', color: 'textWhite' }}
          onClick={handleEmailReset}
        >
          Send
        </LoadingButton>
      </Box>
      {/* forget password end */}
    </Box>
  );
};

export default ForgetPassword;
