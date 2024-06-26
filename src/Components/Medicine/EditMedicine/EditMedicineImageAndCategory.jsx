import {
  Box,
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { Fragment, useState } from 'react';
import { Controller } from 'react-hook-form';
import cloudUpload from '../../../Assets/cloudUpload.png';

const EditMedicineImageAndCategory = ({
  control,
  previousImage,
  required = true,
}) => {
  const [image, setImage] = useState(null);
  const { data: categories = [] } = useQuery([
    '/api/corbel/medicines-category/',
  ]);
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
          {/* ঔষধ এর নাম */}
          <Box>
            <Controller
              name={'title'}
              control={control}
              defaultValue={''}
              rules={{
                required: {
                  value: true,
                  message: 'ঔষধের নাম প্রয়োজন',
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
                    ঔষধ এর নাম
                  </InputLabel>
                  <TextField
                    id='form-input-productName'
                    variant='outlined'
                    type='text'
                    placeholder='ঔষধ এর নাম'
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
                  message: 'ঔষধের ক্যাটাগরি প্রয়োজন',
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
                    {categories?.map((category) => (
                      <MenuItem key={category?.slug} value={category?.id}>
                        {category?.title}
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
            ঔষধ এর ছবি
          </Typography>
          <Typography
            variant='body6'
            sx={{ mt: '22px', color: 'color11.main', mb: '30px' }}
          >
            ছবিটি পণ্যের বিবরণ পৃষ্ঠার কভারে প্রদর্শিত হবে। আকার 330x330 এবং
            2000x2000px এর মধ্যে।
          </Typography>
        </Box>
        {/* ------end------ */}
        {/* upload section */}

        <Grid container columnGap={'35px'} rowGap={'35px'}>
          <Controller
            name={'image'}
            control={control}
            rules={{
              required: {
                value: true,
                message: 'ফসলের ছবি প্রয়োজন',
              },
            }}
            defaultValue={previousImage || null}
            render={({ field, fieldState: { error } }) => (
              <Fragment>
                {Boolean(previousImage) && (
                  <Grid
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
                      }}
                    >
                      <Box
                        component='img'
                        src={
                          Boolean(image)
                            ? URL.createObjectURL(image)
                            : previousImage
                        }
                        sx={{
                          width: 1,
                          aspectRatio: '1/1',
                          borderRadius: '5px',
                          boxShadow: '0px 1px 4px',
                          bgcolor: '#FCFCFC',
                        }}
                      />
                    </Box>
                  </Grid>
                )}
                <Grid
                  item
                  xs={1.3}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'left',
                  }}
                >
                  <Button
                    component='label'
                    disableRipple
                    sx={{
                      boxShadow: '0px 1px 4px',
                      bgcolor: '#FCFCFC',
                      width: 1,
                      aspectRatio: '1/1',
                      '&:hover': {
                        bgcolor: '#FCFCFC',
                      },
                    }}
                  >
                    <input
                      type='file'
                      accept='image/*'
                      hidden
                      // onChange={(e) => {
                      //   field.onChange(
                      //     setValue(fieldName, e.target.files[0], {
                      //       shouldValidate: true,
                      //     })
                      //   );
                      //   setImage(e.target.files[0]);
                      // }}
                      onChange={(e) => {
                        const selectedImage = e.target.files[0];
                        field.onChange(selectedImage);
                        setImage(selectedImage);
                      }}
                    />

                    <Box component='img' src={cloudUpload} />
                  </Button>
                </Grid>
                {Boolean(error) && (
                  <Grid item xs={12}>
                    <FormHelperText
                      sx={{
                        color: 'error.main',
                      }}
                    >
                      {error?.message}
                    </FormHelperText>
                  </Grid>
                )}
              </Fragment>
            )}
          />
        </Grid>
        {/* -------end------- */}
      </Box>
    </Paper>
  );
};

export default EditMedicineImageAndCategory;
