import { LoadingButton } from '@mui/lab';
import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toFormData } from 'multipart-object';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import UploadImage from '../../../Components/Shared/UploadImage';
import axiosApi from '../../../Utils/axiosApi';

const AddPromotionalProduct = () => {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  // hook form
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      promotional: [{ image: '' }],
    },
  });
  // hook form end

  //field array
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'promotional',
  });
  //field array end

  //promotional product mutation

  const { mutate: promotionalMutation, isLoading: promotionalMutationLoading } =
    useMutation(
      (payload) =>
        axiosApi.post('/api/corbel/promotion/', payload, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }),
      {
        onSuccess: ({ data }) => {
          reset();
          queryClient.invalidateQueries(['/api/corbel/promotion/']);
          navigate('/promotional-product');
          enqueueSnackbar('প্রোডাক্ট প্রমোশন এর ছবি সফল ভাবে যোগ হয়েছে', {
            variant: 'success',
          });
        },
        onError: (err) => {
          enqueueSnackbar('কোনো একটি সমস্যা হয়েছে', {
            variant: 'error',
          });
        },
      }
    );
  const getData = (data) => {
    const nestedData = toFormData(data, {
      separator: 'mixedDot',
    });

    promotionalMutation(nestedData);
  };
  return (
    <Box component={'form'} onSubmit={handleSubmit(getData)}>
      <Paper sx={{ padding: '45px' }}>
        <Box>
          <Typography variant='body6' color='textBlack'>
            প্রোডাক্ট প্রমোশন এর ছবি
          </Typography>
          <Typography
            variant='body6'
            color={'textGray'}
            sx={{ mt: '22px', color: 'textGray', mb: '30px' }}
          >
            ছবিটি পণ্যের বিবরণ পৃষ্ঠার কভারে প্রদর্শিত হবে। আকার 330x330 এবং
            2000x2000px এর মধ্যে।
          </Typography>
        </Box>
        {fields.map((item, index, arr) => {
          return (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                alignItems: 'flex-start',
              }}
            >
              {/* ------end------ */}
              {/* upload section */}
              <Grid container columnGap={'35px'} rowGap={'35px'}>
                <UploadImage
                  control={control}
                  fieldName={`promotional.[${index}].image`}
                  helperText='প্রোডাক্ট প্রমোশন এর ছবি প্রয়োজন'
                  required={true}
                />
              </Grid>
              <Button
                variant='button4'
                type='button'
                // disabled={index === 0}
                onClick={() => remove(index)}
                sx={{
                  height: '40px',
                  color: 'textWhite',
                  width: '160px',
                  display: arr.length > 1 ? 'block' : 'none',
                }}
              >
                ডিলিট
              </Button>
              {Boolean(index < arr.length - 1) && (
                <Divider
                  sx={{
                    my: '30px',
                    width: 1,
                  }}
                />
              )}
            </Box>
          );
        })}

        <Button
          variant='button1'
          type='button'
          sx={{ gap: '8px', color: 'textWhite', mt: '65px' }}
          onClick={() => append({ image: '' })}
        >
          <AiOutlinePlusCircle />
          আরো যোগ করুন
        </Button>
      </Paper>
      <LoadingButton
        loading={promotionalMutationLoading}
        variant='button2'
        type='submit'
        fullWidth
        sx={{
          color: 'textWhite',
          fontSize: '16px',
          height: '40px',
          mt: '30px',
        }}
      >
        সাবমিট করুন
      </LoadingButton>
    </Box>
  );
};

export default AddPromotionalProduct;
