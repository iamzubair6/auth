import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toFormData } from 'multipart-object';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AddDiseaseAndImage from '../../../Components/Crops/AddCrops/AddDiseaseAndImage';
import UploadImageAndCategory from '../../../Components/Crops/AddCrops/UploadImageAndCategory';
import TextEditor from '../../../Components/Shared/TextEditor';
import axiosApi from '../../../Utils/axiosApi';

const AddCrops = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      disease: [{ title: '', image: '' }],
    },
  });

  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  const { mutate: cropsMutation, isLoading: cropsMutationLoading } =
    useMutation(
      (payload) =>
        axiosApi.post('/api/corbel/crops/', payload, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }),
      {
        onSuccess: ({ data }) => {
          reset();
          navigate(`/all-crops/${data?.id}`);
          queryClient.invalidateQueries(['/api/corbel/crops/']);
          enqueueSnackbar('ফসল সফল ভাবে যোগ হয়েছে', {
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
    // const payload = new FormData();

    // payload.append('title', data.title);
    // payload.append('image', data.image);
    // payload.append('description', data.description);
    // payload.append('category', data.category);

    // // Adding disease data to the payload
    // data.disease.forEach((disease, index) => {
    //   payload.append(`disease[${index}].title`, disease.title);
    //   payload.append(`disease[${index}].image`, disease.image);
    // });

    const nestedData = toFormData(data, {
      separator: 'mixedDot',
    });

    cropsMutation(nestedData);
    // console.log(data);
  };

  return (
    <Box component={'form'} onSubmit={handleSubmit(getData)}>
      <UploadImageAndCategory control={control} />
      <TextEditor
        control={control}
        title='ফসলের বর্ণনা'
        helperText='ফসলের বর্ণনা প্রয়োজন'
        fieldName='description'
      />
      <AddDiseaseAndImage control={control} />
      {/* submit button */}
      <LoadingButton
        loading={cropsMutationLoading}
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

export default AddCrops;
