import { Box, Button, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaPen } from 'react-icons/fa';
import LoadingIndicator from '../../../Components/Shared/LoadingIndicator';

const ViewGeneralSetting = ({ setGeneralId }) => {
  const {
    data: generalSettingData = {},
    isLoading: generalSettingDataLoading,
  } = useQuery(['/api/dashboard/general/settings/'], {
    cacheTime: 0,
    refetchOnMount: true,
  });
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '22px',
          mb: '20px',
        }}
      >
        <Button
          onClick={() => setGeneralId(generalSettingData?.id)}
          variant='button2'
          sx={{
            gap: '8px',
            color: 'textWhite',
          }}
        >
          <FaPen />
          এডিট করুন
        </Button>
      </Box>
      {Boolean(generalSettingDataLoading) ? (
        <LoadingIndicator height={'50vh'} />
      ) : (
        <Paper sx={{ p: '45px' }}>
          <Box>
            <Typography variant='body6' color='textBlack'>
              করবেল সম্পর্কে লিখুন
            </Typography>
            <Typography
              variant='body6'
              color='textBlack'
              sx={{
                height: '300px',
                mt: '16px',
                width: 1,
                border: 1,
                overflowY: 'scroll',
                borderRadius: '5px',
                padding: '11px',
              }}
            >
              {generalSettingData?.description?.replace(
                /<[^>]*>|&[A-Za-z0-9#]+;/gi,
                ' '
              )}
            </Typography>
          </Box>
          <Box sx={{ mt: '40px' }}>
            <Typography variant='body6' color='textBlack'>
              অ্যাপ সম্পর্কে লিখুন
            </Typography>
            <Typography
              variant='body6'
              color='textBlack'
              sx={{
                height: '300px',
                mt: '16px',
                width: 1,
                border: 1,
                overflowY: 'scroll',
                borderRadius: '5px',
                padding: '11px',
              }}
            >
              {generalSettingData?.app_description?.replace(
                /<[^>]*>|&[A-Za-z0-9#]+;/gi,
                ' '
              )}
            </Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default ViewGeneralSetting;
