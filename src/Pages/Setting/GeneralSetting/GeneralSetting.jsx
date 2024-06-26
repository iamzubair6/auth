import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextEditor from '../../../Components/Shared/TextEditor';
import axiosApi from '../../../Utils/axiosApi';
import ViewGeneralSetting from '../ViewGeneralSetting/ViewGeneralSetting';

const GeneralSetting = () => {
  const [generalId, setGeneralId] = useState(null);

  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  const { data: generalSettingData = {} } = useQuery(
    [`/api/dashboard/general/settings/${generalId}/`],
    {
      onSuccess: (generalSettingData) => {
        setValue('description', generalSettingData?.description);
        setValue('app_description', generalSettingData?.app_description);
      },
      enabled: Boolean(generalId),
      cacheTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    }
  );

  const {
    mutate: editGeneralSettingMutation,
    isLoading: editGeneralSettingMutationLoading,
  } = useMutation(
    (payload) =>
      axiosApi.patch(`/api/dashboard/general/settings/${generalId}/`, payload),
    {
      onSuccess: ({ data }) => {
        reset();
        setGeneralId(null);
        queryClient.invalidateQueries(['/api/dashboard/general/settings/']);
        enqueueSnackbar('সাধারণ ইনফরমেশন সফল ভাবে এডিট হয়েছে', {
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
    editGeneralSettingMutation(data);
  };

  const { control, handleSubmit, reset, setValue } = useForm();
  return (
    <Box component='form' onSubmit={handleSubmit(getData)}>
      {Boolean(generalId) ? (
        <Box>
          <TextEditor
            control={control}
            title='করবেল সম্পর্কে লিখুন'
            helperText='বর্ণনা প্রয়োজন'
            fieldName='description'
          />
          <TextEditor
            control={control}
            title='অ্যাপ সম্পর্কে লিখুন'
            helperText='অ্যাপ বর্ণনা প্রয়োজন'
            fieldName='app_description'
          />
        </Box>
      ) : (
        <ViewGeneralSetting setGeneralId={setGeneralId} />
      )}
      <LoadingButton
        loading={editGeneralSettingMutationLoading}
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

export default GeneralSetting;
