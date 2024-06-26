import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

const ViewCharacteristics = ({ singleMedicineData }) => {
  return (
    <Paper
      sx={{
        padding: '45px',
        mt: '30px',
      }}
    >
      <Box>
        <Typography variant='body6' color='textBlack'>
          ঔষধের কার্যকারিতা / বৈশিষ্ট্য
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
          {singleMedicineData?.characteristic?.replace(
            /<[^>]*>|&[A-Za-z0-9#]+;/gi,
            ' '
          )}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ViewCharacteristics;
