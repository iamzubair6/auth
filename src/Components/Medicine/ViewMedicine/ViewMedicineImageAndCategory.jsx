import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

const ViewMedicineImageAndCategory = ({ singleMedicineData }) => {
  return (
    <Paper
      sx={{
        padding: '45px',
        // mt: '20px',
      }}
    >
      <Box sx={{ display: 'flex', gap: '45px' }}>
        <Box>
          <Typography variant='body6' color='textBlack'>
            ঔষধ এর নাম
          </Typography>
          <Typography
            variant='body6'
            color='textBlack'
            sx={{
              border: 1,
              borderColor: 'primary.main',
              width: '300px',
              overflowX: 'auto',
              borderRadius: '5px',
              padding: '7px 11px',
              mt: '10px',
              height: '40px',
            }}
          >
            {singleMedicineData?.title}
          </Typography>
        </Box>
        <Box>
          <Typography variant='body6' color='textBlack'>
            ক্যাটাগরি
          </Typography>
          <Typography
            variant='body6'
            color='textBlack'
            sx={{
              border: 1,
              borderColor: 'primary.main',
              width: '300px',
              overflowX: 'auto',
              borderRadius: '5px',
              padding: '7px 11px',
              mt: '10px',
              height: '40px',
            }}
          >
            {singleMedicineData?.category?.title}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ my: '40px' }}>
        <Typography variant='body6' color='textBlack'>
          ঔষধ এর ছবি
        </Typography>
        <Box
          component='img'
          src={singleMedicineData?.image}
          sx={{
            mt: '16px',
            height: '110px',
            width: '110px',
            borderRadius: '5px',
            boxShadow: '0px 1px 4px',
            bgcolor: '#FCFCFC',
          }}
        />
      </Box>
      <Box>
        <Typography variant='body6' color='textBlack'>
          ঔষধের বর্ণনা
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
          {singleMedicineData?.description?.replace(
            /<[^>]*>|&[A-Za-z0-9#]+;/gi,
            ' '
          )}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ViewMedicineImageAndCategory;
