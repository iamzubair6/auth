import { LoadingButton } from '@mui/lab';
import { Box, InputLabel, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { axiosRaw } from '../../Utils/axiosApi';

const PasswordReset = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, setError } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: resetEmailMutation, isLoading } = useMutation(
    ({ email }) =>
      axiosRaw.post('/account/user/password/reset/request', {
        email,
        // redirect_url: '/auth/update-password',
      }),
    {
      onSuccess: () => navigate('/auth/reset-confirmation'),
      onError: (error) => {
        enqueueSnackbar('Failed to reset password', { variant: 'error' });
        if (Boolean(error?.response?.data?.details)) {
          setError('email', {
            message: error?.response?.data?.details,
          });
        }
      },
    }
  );

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(resetEmailMutation)}
      sx={{
        padding: '45px',
        minWidth: '425px',
      }}
    >
      <Typography variant='h4' color='textWhite'>
        Forgot Password
      </Typography>
      <Typography variant='body1' color='textWhite' paddingTop='10px'>
        Continue to Corbel International Ltd
      </Typography>
      <Controller
        name='email'
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Email is required',
          },
        }}
        defaultValue=''
        render={({ field, fieldState: { error } }) => (
          <Box sx={{ mt: '40px' }}>
            <InputLabel
              htmlFor='email-input'
              sx={{
                color: 'textWhite',
                fontSize: '16px',
                marginBottom: '10px',
              }}
            >
              Please Enter Your Registered Email
            </InputLabel>
            <TextField
              variant='outlined'
              size='small'
              id='email-input'
              type='email'
              placeholder='Enter registered email'
              sx={{
                width: 1,
                height: '35px',
                bgcolor: 'textWhite',
                borderRadius: '5px',

                '& input': {
                  py: '6.5px !important',
                },
              }}
              error={Boolean(error)}
              helperText={Boolean(error) && error?.message}
              {...field}
            />
          </Box>
        )}
      />
      <LoadingButton
        loading={isLoading}
        type='submit'
        variant='button3'
        sx={{
          width: 1,
          height: '40px',
          mt: '50px',
          textTransform: 'unset',
          fontWeight: '700',
          fontSize: '16px',
          lineHeight: '22px',
        }}
      >
        Reset My Password
      </LoadingButton>
      <Typography
        align='center'
        color='textWhite'
        sx={{
          fontSize: '16px',
          fontWeight: 600,
          my: '20px',
        }}
      >
        or
      </Typography>
      <Typography
        component={Link}
        align='center'
        color='textWhite'
        to={`/auth`}
        sx={{
          width: 1,
          display: 'block',
          fontWeight: 500,
          textDecoration: 'unset',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        Sign In Again?
      </Typography>
    </Box>
  );
};

export default PasswordReset;
