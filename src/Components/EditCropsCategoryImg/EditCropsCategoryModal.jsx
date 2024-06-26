import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  IconButton,
  Modal,
  Paper,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import React, { Fragment, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import cloudUpload from '../../Assets/cloudUpload.png';
import axiosApi from '../../Utils/axiosApi';

const EditCropsCategoryModal = ({ openEditor, handleClose }) => {
  // all state manage
  const [image, setImage] = useState(null); //   all state manage end

  const queryClient = useQueryClient(); // form hook

  const { control, setValue, handleSubmit } = useForm(); //   form hook end
  //   setValue using quary

  const { data: cropsData = {} } = useQuery(
    [`/api/corbel/crops-category/${openEditor}/`],
    {
      onSuccess: (cropsData) => {
        setValue('image', cropsData?.image);
      },
      enabled: Boolean(openEditor),
      cacheTime: 0,
      refetchOnWindowFocus: false,
    }
  ); //   setValue using quary end
  // patch mutation

  const {
    mutate: editCropsCategoryMutation,
    isLoading: editCropsCategoryMutationLoading,
  } = useMutation(
    (payload) =>
      axiosApi.patch(`/api/corbel/crops-category/${openEditor}/`, payload, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }),
    {
      onSuccess: ({ data }) => {
        handleClose();
        setImage(null);
        queryClient.invalidateQueries(['/api/corbel/crops-category/']);
        enqueueSnackbar('ক্যাটাগরি সফল ভাবে এডিট হয়েছে', {
          variant: 'success',
        });
      },
      onError: (err) => {
        // console.log(err);
        enqueueSnackbar('কোনো একটি সমস্যা হয়েছে', {
          variant: 'error',
        });
      },
    }
  );

  const handleMutationSubmit = (data) => {
    editCropsCategoryMutation(data);
  }; //   patch mutation end

  return (
    <Modal open={Boolean(openEditor)} onClose={handleClose}>
      <Paper
        component={'form'}
        onSubmit={handleSubmit(handleMutationSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: '600px',
          padding: '20px',
          mt: '30px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <Box>
          <Box
            component={'div'}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant='body6' color='textBlack' fontWeight={700}>
              ক্যাটাগরি ছবি পরিবর্তন করুন
            </Typography>
            <IconButton
              onClick={() => {
                handleClose(), setImage(null);
              }}
              sx={{
                bgcolor: 'textGray',
                height: '24px',
                width: '24px',
                borderRadius: '5px',
                '&:hover': {
                  bgcolor: 'lightGray',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography
            variant='body6'
            color='textBlack'
            sx={{
              mt: '30px',
              mb: '20px',
            }}
          >
            {cropsData?.title}
          </Typography>
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
              defaultValue={cropsData?.image || null}
              render={({ field, fieldState: { error } }) => (
                <Fragment>
                  {Boolean(cropsData?.image) && (
                    <Grid item xs={2.6}>
                      <Box
                        component='img'
                        src={
                          Boolean(image)
                            ? URL.createObjectURL(image)
                            : cropsData?.image
                        }
                        sx={{
                          width: '120px',
                          height: '120px',
                          borderRadius: '5px',
                          boxShadow: '0px 1px 4px',
                          bgcolor: '#FCFCFC',
                        }}
                      />
                    </Grid>
                  )}
                  <Grid item xs={2.6}>
                    <Button
                      component='label'
                      disableRipple
                      sx={{
                        boxShadow: '0px 1px 4px',
                        bgcolor: '#FCFCFC',
                        width: '120px',
                        height: '120px',
                        '&:hover': {
                          bgcolor: '#FCFCFC',
                        },
                      }}
                    >
                      <input
                        type='file'
                        accept='image/*'
                        hidden
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
        </Box>

        <LoadingButton
          type='submit'
          loading={editCropsCategoryMutationLoading} // disabled={!Boolean(value)}
          onClick={() => handleSubmit()}
          variant='button2'
          sx={{
            mt: '35px',
            color: 'textWhite',
            borderRadius: '6px',
          }}
        >
          সাবমিট করুন
        </LoadingButton>
      </Paper>
    </Modal>
  );
};

export default EditCropsCategoryModal;
