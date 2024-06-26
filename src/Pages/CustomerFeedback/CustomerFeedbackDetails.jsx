import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosApi from '../../Utils/axiosApi';
import { enqueueSnackbar } from 'notistack';
import { HiRefresh } from 'react-icons/hi';
import { LoadingButton } from '@mui/lab';

const CustomerFeedbackDetails = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { paramsId } = useParams();

  const {
    data: singleFeedbackData = {},
    isLoading: singleFeedbackDataLoading,
    refetch,
  } = useQuery([`/api/dashboard/user/crops/diseases/${paramsId}/`], {
    onError: () => {
      navigate(-1);
    },
    cacheTime: 0,
  });
  // console.log('singleFeedbackData', singleFeedbackData);

  const { mutate: archiveMutation, isLoading: archiveLoading } = useMutation(
    (payload) =>
      axiosApi.patch(
        `/api/dashboard/user/crops/diseases/${paramsId}/`,
        payload
      ),
    {
      onSuccess: () => {
        refetch();
        enqueueSnackbar('সফল ভাবে হয়েছে', {
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

  const { mutate: deleteArchiveMutation, isLoading: deleteArchiveLoading } =
    useMutation(
      () => axiosApi.delete(`/api/dashboard/user/crops/diseases/${paramsId}/`),
      {
        onSuccess: () => {
          queryClient.invalidateQueries([
            '/api/dashboard/user/crops/diseases/',
          ]);
          enqueueSnackbar('সফল ভাবে ডিলিট হয়েছে', {
            variant: 'success',
          });
          navigate('/customer-feedback');
        },
        onError: (err) => {
          enqueueSnackbar('কোনো একটি সমস্যা হয়েছে', {
            variant: 'error',
          });
        },
      }
    );

  const handleArchive = () => {
    archiveMutation({ is_archived: true });
  };

  const handleUnArchive = () => {
    archiveMutation({ is_archived: false });
  };

  const handleDelete = () => {
    deleteArchiveMutation();
  };

  return (
    <Paper sx={{ px: '70px', py: '25px' }}>
      <Box
        sx={{
          pb: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', flex: 1 }}>
          গ্রাহকের বিস্তারিত মতামত
        </Typography>
        {Boolean(singleFeedbackData?.is_archived) ? (
          <>
            <LoadingButton
              loading={archiveLoading}
              // disabled={archiveLoading}
              onClick={handleUnArchive}
              variant="button1"
              sx={{ gap: '8px', color: 'textWhite', mr: '10px' }}
            >
              <HiRefresh />
              আনআর্কাইভ
            </LoadingButton>
            <LoadingButton
              loading={deleteArchiveLoading}
              // disabled={deleteArchiveLoading}
              onClick={handleDelete}
              variant="button4"
              sx={{ gap: '8px', color: 'textWhite' }}
            >
              <AiTwotoneDelete />
              ডিলিট
            </LoadingButton>
          </>
        ) : (
          <LoadingButton
            loading={archiveLoading}
            // disabled={archiveLoading}
            onClick={handleArchive}
            variant="button3"
            sx={{ gap: '8px', color: 'textWhite' }}
          >
            <AiTwotoneDelete />
            আর্কাইভ
          </LoadingButton>
        )}
      </Box>
      {Boolean(singleFeedbackData?.diseases?.length) && (
        <Box
          sx={{
            display: 'flex',
            gap: '30px',
            alignItems: 'center',
            pb: '50px',
          }}
        >
          {singleFeedbackData?.diseases?.map((item, idx) => (
            <Box
              key={idx}
              component="img"
              src={item?.image}
              sx={{
                mt: '16px',
                height: '110px',
                width: '110px',
                borderRadius: '5px',
                boxShadow: '0px 1px 4px',
                bgcolor: '#FCFCFC',
              }}
            />
          ))}
        </Box>
      )}
      <Box
        sx={{ display: 'flex', gap: '100px', alignItems: 'center', pb: '25px' }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            নামঃ
          </Typography>
          <Typography variant="h6">{singleFeedbackData?.name}</Typography>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            মোবাইল নম্বর :
          </Typography>
          <Typography variant="h6">{singleFeedbackData?.phone}</Typography>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            বিভাগ :
          </Typography>
          <Typography variant="h6">
            {singleFeedbackData?.division?.name}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            জেলা :
          </Typography>
          <Typography variant="h6">
            {singleFeedbackData?.district?.name}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          বিস্তারিত :
        </Typography>
        <Typography variant="h6">{singleFeedbackData?.description}</Typography>
      </Box>
    </Paper>
  );
};

export default CustomerFeedbackDetails;
