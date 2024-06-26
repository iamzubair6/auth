import {
  Box,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';
import UploadImage from '../../Shared/UploadImage';

const UploadImageAndCategory = ({ control, required = true }) => {
  const { data: categories = [] } = useQuery(['/api/corbel/crops-category/']);
  return (
    <Paper sx={{ padding: '45px' }}>
      <Box>
        {/* input field */}
        <Box
          sx={{
            display: 'flex',
            gap: '35px',
            mb: '40px',
            '& .MuiTextField-root': {
              //   marginTop: 0,
            },
          }}
        >
          {/* ফসলের নাম */}
          <Box>
            <Controller
              name={'title'}
              control={control}
              defaultValue={''}
              rules={{
                required: {
                  value: true,
                  message: 'ফসলের নাম প্রয়োজন',
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <Fragment>
                  <InputLabel
                    required
                    error={Boolean(error)}
                    htmlFor='form-input-productName'
                    sx={{
                      color: 'textBlack',
                      fontSize: '16px',
                    }}
                  >
                    ফসলের নাম
                  </InputLabel>
                  <TextField
                    id='form-input-productName'
                    variant='outlined'
                    type='text'
                    placeholder='ফসলের নাম'
                    {...field}
                    error={Boolean(error)}
                    helperText={Boolean(error) && error?.message}
                    sx={{
                      border: 1,
                      borderColor: 'primary.main',
                      width: '350px',
                      borderRadius: '5px',
                      mt: '10px',
                      height: '40px',
                      '& .MuiInputBase-input': {
                        padding: '7px',
                      },
                    }}
                  />
                </Fragment>
              )}
            />
          </Box>
          {/* ক্যাটাগরি */}
          <Box>
            <Controller
              name={'category'}
              control={control}
              defaultValue=''
              rules={{
                required: {
                  value: true,
                  message: 'ক্যাটাগরি প্রয়োজন',
                },
              }}
              render={({
                field: { value, ...field },
                fieldState: { error },
              }) => (
                <Fragment>
                  <InputLabel
                    error={Boolean(error)}
                    required
                    htmlFor='form-input-category'
                    sx={{
                      color: 'textBlack',
                      fontSize: '16px',
                    }}
                  >
                    ক্যাটাগরি
                  </InputLabel>
                  <TextField
                    id='form-input-category'
                    variant='outlined'
                    select
                    error={Boolean(error)}
                    helperText={Boolean(error) && error?.message}
                    value={Boolean(value) ? value : 'default'}
                    {...field}
                    sx={{
                      border: 1,
                      borderColor: 'primary.main',
                      width: '350px',
                      height: '40px',
                      borderRadius: '5px',
                      mt: '10px',
                      '& .MuiInputBase-input': {
                        padding: '7px',
                      },
                    }}
                  >
                    <MenuItem value='default' disabled>
                      ক্যাটাগরি
                    </MenuItem>
                    {categories?.map((item, idx) => (
                      <MenuItem key={idx} value={item?.id}>
                        {item?.title}
                      </MenuItem>
                    ))}
                  </TextField>
                </Fragment>
              )}
            />
          </Box>
        </Box>
        {/* -----end------ */}
        {/* information and title */}
        <Box>
          <Typography
            variant='body6'
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
            ফসলের ছবি
          </Typography>
          <Typography
            variant='body6'
            sx={{ mt: '22px', color: 'textGray', mb: '30px' }}
          >
            ছবিটি পণ্যের বিবরণ পৃষ্ঠার কভারে প্রদর্শিত হবে। আকার 330x330 এবং
            2000x2000px এর মধ্যে।
          </Typography>
        </Box>
        {/* ------end------ */}
        {/* upload section */}

        <Grid container columnGap={'35px'} rowGap={'35px'}>
          {/* {Boolean(previousImage?.length) &&
            previousImage?.map((file, index) => (
              <Grid
                key={index}
                item
                xs={1.3}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'left',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    pt: '8px',
                    width: 1,
                    height: 1,
                  }}
                >
                  <Box
                    component='img'
                    src={file?.image}
                    sx={{
                      width: 1,
                      aspectRatio: '1/1',
                      borderRadius: '5px',
                      boxShadow: '0px 1px 4px',
                      bgcolor: '#FCFCFC',
                    }}
                  />
                  <IconButton
                    onClick={() =>
                      setDeleteURL(
                        `/dashboard/product-image-delete/${file?.id}`
                      )
                    }
                    sx={{
                      position: 'absolute',
                      top: '10px',
                      right: '3px',
                      backgroundColor: 'rgb(255 255 255 / 80%)',
                      padding: '3px !important',
                      '&:hover': {
                        backgroundColor: 'rgb(255 255 255 / 90%)',
                      },
                    }}
                  >
                    <RxCross2 style={{ color: '#3D464D', fontSize: '17px' }} />
                  </IconButton>
                </Box>
              </Grid>
            ))} */}
          <UploadImage
            control={control}
            fieldName={'image'}
            helperText='ফসলের ছবি প্রয়োজন'
            required={required}
          />
        </Grid>
        {/* -------end------- */}
      </Box>
    </Paper>
  );
};

export default UploadImageAndCategory;
