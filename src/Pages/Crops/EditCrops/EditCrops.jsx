import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toFormData } from 'multipart-object';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import AddDiseaseAndImage from '../../../Components/Crops/AddCrops/AddDiseaseAndImage';
import EditImageAndCategory from '../../../Components/Crops/EditCrops/EditImageAndCategory';
import TextEditor from '../../../Components/Shared/TextEditor';
import axiosApi from '../../../Utils/axiosApi';

const EditCrops = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  const { cropsId } = useParams();
  const {
    data: crops = {},
    isLoading,
    refetch,
  } = useQuery([`/api/corbel/crops/${cropsId}`], {
    onSuccess: (crops) => {
      setValue('title', crops?.title);
      setValue('category', crops?.category?.id);
      setValue('description', crops?.description);
      setValue('image', crops?.image);
      setValue(
        'disease',
        crops?.disease ? crops?.disease : [{ title: '', image: '' }]
      );
    },
    enabled: Boolean(cropsId),
    refetchOnMount: true,
    cacheTime: 0,
    refetchOnWindowFocus: false,
  });
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      disease: [{ title: '', image: '' }],
    },
  });
  const { mutate: editCropsMutation, isLoading: editCropsMutationLoading } =
    useMutation(
      (payload) =>
        axiosApi.patch(`/api/corbel/crops/${cropsId}/`, payload, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }),
      {
        onSuccess: ({ data }) => {
          // reset();
          navigate(`/all-crops/${data?.id}`);
          // queryClient.invalidateQueries(['/api/corbel/crops/']);
          enqueueSnackbar('ফসল সফল ভাবে এডিট হয়েছে', {
            variant: 'success',
          });
          refetch();
        },
        onError: (err) => {
          console.log(err);
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

    editCropsMutation(nestedData);
    // console.log(data);
  };

  return (
    <Box component={'form'} onSubmit={handleSubmit(getData)}>
      <EditImageAndCategory control={control} previousImage={crops?.image} />
      <TextEditor
        control={control}
        title='ফসলের বর্ণনা'
        helperText='ফসলের বর্ণনা প্রয়োজন'
        fieldName='description'
      />
      <AddDiseaseAndImage control={control} />
      {/* submit button */}
      <LoadingButton
        loading={editCropsMutationLoading}
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

export default EditCrops;
