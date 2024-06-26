import { LoadingButton } from '@mui/lab';
import { Box, InputLabel, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { axiosRaw } from '../../Utils/axiosApi';

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { control, handleSubmit, reset, watch } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  // const uidb64 = searchParams.get('uidb64');
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const { mutate: passwordResetMutation, isLoading } = useMutation(
    ({ password, conf_password }) =>
      axiosRaw.post('/account/user/password/reset/', {
        password,
        conf_password,
        token,
        email,
        // uidb64,
      }),
    {
      onSuccess: () => {
        enqueueSnackbar('Password updated succesfully', { variant: 'info' });
        navigate('/auth');
      },
      onError: ({ response: { data = {} } = {} }) => {
        enqueueSnackbar('Failed to reset password', { variant: 'error' });
        reset();

        Object.entries(data)?.forEach((value) => {
          setError(value[0], {
            message: value[1][0],
          });
        });
      },
    }
  );

  const inputFields = [
    {
      name: 'password',
      label: 'New Password',
      type: 'password',
      placeholder: 'Enter your new password',
      defaultValue: '',
      rules: {
        required: {
          value: true,
          message: 'New password required',
        },
        pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
          message: 'Minimum 8 letters with a capital and a small required',
        },
      },
    },
    {
      name: 'conf_password',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Enter your confirm password',
      defaultValue: '',
      rules: {
        required: {
          value: true,
          message: 'Confirm password required',
        },
        validate: (val) => {
          if (watch('password') !== val) {
            return 'Confirm password does not match';
          }
        },
      },
    },
  ];

  return (
    <Box
      sx={{
        padding: '45px',
        minWidth: '425px',
      }}
    >
      <Typography variant='h4' color='textWhite'>
        Change Password
      </Typography>
      <Typography variant='body1' color='textWhite' paddingTop='10px'>
        Continue to Corbel International Ltd
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit(passwordResetMutation)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          mt: '50px',
        }}
      >
        {inputFields.map(
          ({
            name,
            label,
            defaultValue,
            placeholder,
            rules,
            type,
            required = true,
          }) => {
            return (
              <Controller
                name={name}
                control={control}
                rules={rules}
                defaultValue={defaultValue}
                render={({ field, fieldState: { error } }) => (
                  <Box>
                    <InputLabel
                      htmlFor={`${name}-input`}
                      error={Boolean(error)}
                      required={required}
                      sx={{
                        color: 'textWhite',
                        fontSize: '16px',
                        marginBottom: '10px',
                      }}
                    >
                      {label}
                    </InputLabel>
                    <TextField
                      variant='outlined'
                      size='small'
                      id={`${name}-input`}
                      type={type}
                      placeholder={placeholder}
                      sx={{
                        width: 1,
                        height: '37px',
                        bgcolor: 'textWhite',
                        border: '1px solid black',
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
            );
          }
        )}

        <LoadingButton
          loading={isLoading}
          variant='button3'
          type='submit'
          sx={{
            width: 1,
            height: '40px',
            textTransform: 'unset',
            fontWeight: '700',
            fontSize: '16px',
            lineHeight: '22px',
            mt: '20px',

            '&:hover': { bgcolor: 'grey3.main' },
          }}
        >
          Set New Password
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default UpdatePassword;
