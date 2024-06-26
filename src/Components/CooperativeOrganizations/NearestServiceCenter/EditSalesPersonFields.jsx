import {
  Box,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import React from 'react';
import { Controller } from 'react-hook-form';

const EditSalesPersonFields = ({
  control,
  watch,
  paramsDesignation,
  divisions,
  districts,
}) => {
  return (
    <Box>
      <Typography
        sx={{
          mb: '25px',
        }}
        variant="h5"
      >
        {paramsDesignation === 'manager'
          ? 'সেলস্ ম্যানেজার এর ইনফরমেশন এডিট করুন'
          : 'সেলস্ অফিসার এর ইনফরমেশন এডিট করুন'}
      </Typography>
      {/* address  */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          gap: '50px',
          mb: '25px',
          flexWrap: 'wrap',
          '& .MuiTextField-root': {
            //   marginTop: 0,
          },
        }}
      >
        {/* বিভাগ নির্বাচন করুন */}
        <Box>
          <Controller
            name={`division`}
            control={control}
            defaultValue={''}
            rules={{
              required: {
                value: true,
                message: 'division is required',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <InputLabel
                  required
                  error={Boolean(error)}
                  htmlFor="form-input-division"
                  sx={{
                    color: 'textBlack',
                    fontSize: '16px',
                  }}
                >
                  বিভাগ
                </InputLabel>
                <TextField
                  id="form-input-division"
                  variant="outlined"
                  select
                  error={Boolean(error)}
                  helperText={Boolean(error) && error?.message}
                  // value={Boolean(value) ? value : ''}
                  sx={{
                    border: 1,
                    borderColor: 'primary.main',
                    width: { xs: '250px', xl: '350px' },
                    height: '40px',
                    borderRadius: '5px',
                    mt: '10px',
                    '& .MuiInputBase-input': {
                      padding: '7px',
                    },
                  }}
                  {...field}
                >
                  <MenuItem value="" disabled>
                    বিভাগ নির্বাচন করুন
                  </MenuItem>
                  {divisions?.map((division) => (
                    <MenuItem key={division?.id} value={division?.id}>
                      {division?.name}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            )}
          />
        </Box>
        {/* জেলা নির্বাচন করুন */}
        <Box>
          <Controller
            name={`district`}
            control={control}
            defaultValue={''}
            rules={{
              required: {
                value: true,
                message: 'district is required',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <InputLabel
                  required
                  error={Boolean(error)}
                  htmlFor="form-input-district"
                  sx={{
                    color: 'textBlack',
                    fontSize: '16px',
                  }}
                >
                  জেলা
                </InputLabel>
                <TextField
                  id="form-input-district"
                  variant="outlined"
                  select
                  error={Boolean(error)}
                  helperText={Boolean(error) && error?.message}
                  // value={Boolean(value) ? value : ''}
                  sx={{
                    border: 1,
                    borderColor: 'primary.main',
                    width: { xs: '250px', xl: '350px' },
                    height: '40px',
                    borderRadius: '5px',
                    mt: '10px',
                    '& .MuiInputBase-input': {
                      padding: '7px',
                    },
                  }}
                  {...field}
                >
                  <MenuItem value="" disabled>
                    জেলা নির্বাচন করুন
                  </MenuItem>
                  {districts?.map((district) => (
                    <MenuItem key={district?.id} value={district?.id}>
                      {district?.name}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            )}
          />
        </Box>
        {/* ঠিকানা */}
        <Box>
          <Controller
            name={`address`}
            control={control}
            defaultValue={''}
            rules={{
              required: {
                value: true,
                message: 'ঠিকানা প্রয়োজন',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <InputLabel
                  required
                  error={Boolean(error)}
                  htmlFor="form-input-address"
                  sx={{
                    color: 'textBlack',
                    fontSize: '16px',
                  }}
                >
                  ঠিকানা
                </InputLabel>
                <TextField
                  id="form-input-address"
                  variant="outlined"
                  type="text"
                  placeholder="ঠিকানা লিখুন"
                  {...field}
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
                />
              </>
            )}
          />
        </Box>
      </Box>
      {/* info */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'start',
          gap: '50px',
        }}
      >
        {/* সেলস্ ম্যানেজার এর নাম */}
        <Box>
          <Controller
            name={`name`}
            control={control}
            defaultValue={''}
            rules={{
              required: {
                value: true,
                message: 'নাম প্রয়োজন',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <InputLabel
                  required
                  error={Boolean(error)}
                  htmlFor="form-input-"
                  sx={{
                    color: 'textBlack',
                    fontSize: '16px',
                  }}
                >
                  {paramsDesignation === 'manager'
                    ? 'সেলস্ ম্যানেজার এর নাম'
                    : 'সেলস্ অফিসার এর নাম'}
                </InputLabel>
                <TextField
                  id="form-input-mana"
                  variant="outlined"
                  type="text"
                  placeholder={
                    paramsDesignation === 'manager'
                      ? 'সেলস্ ম্যানেজার এর নাম'
                      : 'সেলস্ অফিসার এর নাম'
                  }
                  {...field}
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
                />
              </>
            )}
          />
        </Box>
        {/* ফোন নম্বর */}
        <Box>
          <Controller
            name={`phone`}
            control={control}
            defaultValue={'+880'}
            rules={{
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
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <InputLabel
                  required
                  error={Boolean(error)}
                  htmlFor="form-input-phone"
                  sx={{
                    color: 'textBlack',
                    fontSize: '16px',
                  }}
                >
                  ফোন নম্বর
                </InputLabel>
                <MuiTelInput
                  id="form-input-phone"
                  variant="outlined"
                  type="tel"
                  placeholder="ফোন নম্বর"
                  {...field}
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
                />
              </>
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EditSalesPersonFields;
