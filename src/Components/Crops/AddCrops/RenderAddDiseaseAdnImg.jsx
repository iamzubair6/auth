import { Box, Button, InputLabel, TextField } from '@mui/material';
import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';
import { engToBdNum } from '../../../Utils/engToBng';

const RenderAddDiseaseAdnImg = ({ control, index, remove, item, arr }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'end',
        gap: '30px',
        mb: '30px',
      }}
    >
      <Box>
        <Controller
          name={`disease.${index}.title`}
          control={control}
          defaultValue={item.title}
          rules={{
            required: {
              value: true,
              message: 'বালায়ের নাম প্রয়োজন',
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Fragment>
              <InputLabel
                required
                error={Boolean(error)}
                htmlFor='form-input-diseaseName'
                sx={{
                  color: 'textBlack',
                  fontSize: '16px',
                }}
              >
                {engToBdNum(index + 1)} ফসলের বালাইের নাম
              </InputLabel>
              <TextField
                id='form-input-diseaseName'
                variant='outlined'
                type='text'
                placeholder='ফসলের বালাইের নাম'
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
      {/* upload section */}
      <Box>
        <Controller
          name={`disease.${index}.image`}
          control={control}
          defaultValue={item.image}
          rules={{
            required: {
              value: true,
              message: 'বালাইের ছবি প্রয়োজন',
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <Fragment>
              <InputLabel
                required
                error={Boolean(error)}
                htmlFor='form-input-diseaseImage'
                sx={{
                  color: 'textBlack',
                  fontSize: '16px',
                }}
              >
                ফসলের বালাইের ছবি
              </InputLabel>
              <TextField
                id='form-input-diseaseImage'
                variant='outlined'
                type='file'
                accept='image/*'
                onChange={(e) => field.onChange(e.target.files[0])}
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
        {/* -------end------- */}
      </Box>
      <Button
        variant='button4'
        type='button'
        onClick={() => remove(index)}
        sx={{
          height: '40px',
          color: 'textWhite',
          display: arr.length > 1 ? 'block' : 'none',
        }}
      >
        ডিলিট
      </Button>
    </Box>
  );
};

export default RenderAddDiseaseAdnImg;
