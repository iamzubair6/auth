import { Box, Button, FormHelperText, Grid } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { Controller } from 'react-hook-form';
import cloudUpload from '../../Assets/cloudUpload.png';

const UploadImage = ({
  control,
  fieldName = '',
  helperText = '',
  required = false,
  category,
}) => {
  const [image, setImage] = useState(null);
  if (!Boolean(control)) {
    return;
  }

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={{
        required: {
          value: required,
          message: `${helperText}`,
        },
      }}
      defaultValue={''}
      render={({ field, fieldState: { error } }) => (
        <Fragment>
          {Boolean(image) && (
            <Grid
              item
              xs={Boolean(category) ? 2.6 : 1.3}
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
                  src={URL.createObjectURL(image)}
                  sx={{
                    width: 1,
                    aspectRatio: '1/1',
                    borderRadius: '5px',
                    boxShadow: '0px 1px 4px',
                    bgcolor: '#FCFCFC',
                  }}
                />
                {/* <IconButton
                  onClick={() => {
                    const filtered = fieldName.filter(
                      (item) => item?.image !== image
                    );
                    onChange(filtered);
                  }}
                  sx={{
                    position: 'absolute',
                    top: '10px',
                    right: '3px',
                    backgroundColor: 'rgb(255 255 255 / 70%)',
                    padding: '3px !importrant',
                    '&:hover': {
                      backgroundColor: 'rgb(255 255 255 / 90%)',
                    },
                  }}
                >
                  <RxCross2 style={{ color: '#3D464D', fontSize: '17px' }} />
                </IconButton> */}
              </Box>
            </Grid>
          )}
          <Grid
            item
            xs={Boolean(category) ? 2.6 : 1.3}
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
  );
};

export default UploadImage;
