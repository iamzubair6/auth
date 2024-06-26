import { LoadingButton } from '@mui/lab';
import {
  Box,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { useSnackbar } from 'notistack';
import React, { Fragment } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useGlobalContext } from '../../Global/GlobalContext';
import axiosApi from '../../Utils/axiosApi';

const EditProfile = () => {
  const { control, handleSubmit, reset, setError } = useForm();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  const { currentUser } = useGlobalContext();

  const { mutate: profileMutation, isLoading: profileUpdateLoading } =
    useMutation(
      (payload) =>
        axiosApi.patch('/account/update-profile/', payload, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['/account/my-profile/']);
          navigate('/profile');
          enqueueSnackbar('একাউন্ট ডিটেলস সফলভাবে আপডেটেড হয়েছে', {
            variant: 'success',
          });
          reset();
        },
        onError: () =>
          enqueueSnackbar('একাউন্ট ডিটেলস আপডেট ব্যর্থ হয়েছে', {
            variant: 'error',
          }),
      }
    );

  const formInput = [
    {
      name: 'full_name',
      defaultValue: currentUser?.full_name ?? '',
      rules: {
        required: {
          value: true,
          message: 'Name is required',
        },
      },
      inputComponent: TextField,
      inputLabel: 'Name',
      inputType: 'text',
    },
    {
      name: 'phone_number',
      defaultValue: currentUser?.phone_number ?? '+880',
      rules: {
        validate: {
          required: (value) => {
            if (!Boolean(value)) {
              return 'Phone number required';
            }
            if (matchIsValidTel(value)) {
              return true;
            }
            return 'Phone number invalid';
          },
        },
      },
      inputComponent: MuiTelInput,
      inputLabel: 'Phone Number',
      inputType: 'tel',
      disablePadding: true,
    },
    {
      name: 'gender',
      defaultValue: currentUser?.gender ?? '',
      rules: {
        required: {
          value: true,
          message: 'Gender is required',
        },
      },
      inputComponent: TextField,
      inputLabel: 'Gender',
      inputType: 'text',
      isSelect: true,
      options: ['male', 'female'],
    },
    {
      name: 'birth_date',
      defaultValue: currentUser?.birth_date ?? moment().format('YYYY-MM-DD'),
      rules: {
        required: {
          value: true,
          message: 'Birth Date is required',
        },
      },
      dateInput: true,
      inputComponent: TextField,
      inputLabel: 'Birth Date',
      inputType: 'text',
    },
  ];

  const handleProfileUpdate = (data) => {
    const payloadForm = new FormData();
    formInput.forEach((input) =>
      payloadForm.append(input.name, data[input.name] ?? '')
    );

    Boolean(data?.profile_pic) &&
      payloadForm.append('profile_pic', data?.profile_pic);

    Boolean(data?.gender) && payloadForm.append('gender', data?.gender);

    Boolean(data?.phone_number) &&
      payloadForm.append('phone_number', data?.phone_number);

    Boolean(data?.birth_date) &&
      payloadForm.append('birth_date', data?.birth_date);

    profileMutation(payloadForm);
  };

  return (
    <Paper
      component='form'
      onSubmit={handleSubmit(handleProfileUpdate)}
      sx={{ padding: '30px' }}
    >
      <Typography
        variant='body3'
        sx={{
          position: 'relative',
          '&:after': {
            content: `""`,
            position: 'absolute',
            width: '72px',
            height: '2px',
            bgcolor: 'textBlack',
            bottom: '-10px',
            left: 0,
            mx: 'auto',
          },
        }}
      >
        এডিট অ্যাডমিন ইনফরমেশন
      </Typography>
      <Grid
        container
        columnSpacing={'40px'}
        rowGap={'30px'}
        sx={{ mt: '28px' }}
      >
        {formInput.map(
          (
            {
              name,
              defaultValue,
              rules,
              inputComponent: InputField,
              inputLabel,
              inputType,
              dateInput = false,
              disablePadding = false,
              isSelect = false,
              options = [],
            },
            idx
          ) => {
            return (
              <Grid item xs={4} key={`form-input-${idx}`}>
                <Controller
                  name={name}
                  control={control}
                  defaultValue={defaultValue}
                  rules={rules}
                  render={({ field, fieldState: { error } }) => (
                    <Box>
                      <InputLabel
                        error={Boolean(error)}
                        sx={{ fontSize: '16px', color: 'textBlack' }}
                        htmlFor={`form-input-${name}`}
                      >
                        {inputLabel}
                      </InputLabel>
                      {Boolean(dateInput) ? (
                        <DatePicker
                          inputFormat='LL'
                          disableMaskedInput
                          value={field.value}
                          onChange={(date) =>
                            field.onChange(moment(date).format('YYYY-MM-DD'))
                          }
                          renderInput={(params) => (
                            <InputField
                              {...params}
                              id={`form-input-${name}`}
                              inputProps={{
                                ...params.inputProps,
                                readOnly: true,
                              }}
                              // sx={{
                              //   width: "100%",
                              //   height: "40px",
                              //   mt: "4px",
                              //   outline: 0,
                              //   border: "0.5px solid #3D464D",
                              //   borderRadius: "5px",
                              //   "& .MuiInputBase-input": {
                              //     fontSize: "14px",
                              //     paddingLeft: disablePadding ? "0" : "24px",
                              //     paddingY: { xs: "9px", md: "14px" },
                              //     color: "textBlack",
                              //   },
                              // }}
                              sx={{
                                border: 1,
                                borderColor: 'primary.main',
                                width: 1,
                                height: '40px',
                                borderRadius: '5px',
                                mt: '10px',
                                '& .MuiInputBase-input': {
                                  padding: '7px',
                                },
                              }}
                              error={Boolean(error)}
                              helperText={error && error?.message}
                              {...field}
                            >
                              {Boolean(isSelect) &&
                                options?.map((option, index) => (
                                  <MenuItem key={index} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                            </InputField>
                          )}
                        />
                      ) : (
                        <InputField
                          id={`form-input-${name}`}
                          select={isSelect}
                          type={inputType}
                          autoComplete='true'
                          // sx={{
                          //   width: "100%",
                          //   height: "40px",
                          //   mt: "10px",
                          //   outline: 0,
                          //   border: "0.5px solid #3D464D",
                          //   borderRadius: "5px",
                          //   "& .MuiInputBase-input": {
                          //     fontSize: "14px",
                          //     paddingLeft: disablePadding ? "0" : "24px",
                          //     paddingY: { xs: "9px", md: "14px" },
                          //     color: "textBlack",
                          //   },
                          // }}
                          sx={{
                            border: 1,
                            borderColor: 'primary.main',
                            width: 1,
                            height: '40px',
                            borderRadius: '5px',
                            mt: '10px',
                            '& .MuiInputBase-input': {
                              padding: '7px',
                            },
                          }}
                          error={Boolean(error)}
                          helperText={error && error?.message}
                          {...field}
                        >
                          {Boolean(isSelect) &&
                            options?.map((option, index) => (
                              <MenuItem key={index} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                        </InputField>
                      )}
                    </Box>
                  )}
                />
              </Grid>
            );
          }
        )}
        <Grid item xs={4}>
          <Controller
            name='profile_pic'
            control={control}
            defaultValue=''
            render={({ field: { onChange } }) => (
              <Fragment>
                <InputLabel
                  htmlFor='form-input-thumnail'
                  sx={{
                    color: 'textBlack',
                    fontSize: '16px',
                  }}
                >
                  Picture
                </InputLabel>
                <TextField
                  fullWidth
                  id='form-input-thumnail'
                  type={'file'}
                  variant='outlined'
                  onChange={(e) => {
                    onChange(e.target.files[0]);
                  }}
                  sx={{
                    border: 1,
                    borderColor: 'primary.main',
                    width: 1,
                    height: '40px',
                    borderRadius: '5px',
                    mt: '10px',
                    '& .MuiInputBase-input': {
                      padding: '7px',
                    },
                  }}
                />
              </Fragment>
            )}
          />
        </Grid>
      </Grid>
      <LoadingButton
        loading={profileUpdateLoading}
        variant='button2'
        type='submit'
        sx={{ mt: '40px', color: 'textWhite' }}
      >
        আপডেট
      </LoadingButton>
    </Paper>
  );
};

export default EditProfile;
