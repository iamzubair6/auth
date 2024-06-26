import { Box, InputLabel, MenuItem, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import React from 'react';
import { Controller } from 'react-hook-form';

const EditReatailerPointFields = ({ control, watch }) => {
  const { data: divisions = [] } = useQuery(['/api/sales/service/division/'], {
    cacheTime: 0,
  });

  const { data: districts = [] } = useQuery(
    [`/api/sales/service/district/?division=${watch(`division`)}`],
    {
      enabled: Boolean(watch(`division`)),
    }
  );

  return (
    <Box>
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
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: 'division is required',
              },
            }}
            render={({ field: { value, ...field }, fieldState: { error } }) => (
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
                  value={value || 'default'}
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
                  <MenuItem value="default" disabled>
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
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: 'district is required',
              },
            }}
            render={({ field: { value, ...field }, fieldState: { error } }) => (
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
                  value={value || 'default'}
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
                  <MenuItem value="default" disabled>
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
            defaultValue=""
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
        {/* রিটেইলার পয়েন্ট এর নাম */}
        <Box>
          <Controller
            name={`point_name`}
            control={control}
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: 'রিটেইলার পয়েন্ট এর নাম প্রয়োজন',
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <InputLabel
                  required
                  error={Boolean(error)}
                  htmlFor="form-input-point_name"
                  sx={{
                    color: 'textBlack',
                    fontSize: '16px',
                  }}
                >
                  রিটেইলার পয়েন্ট এর নাম
                </InputLabel>
                <TextField
                  id="form-input-point_name"
                  variant="outlined"
                  type="text"
                  placeholder="রিটেইলার পয়েন্ট এর নাম লিখুন"
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

export default EditReatailerPointFields;
