import { Box, Chip, Divider, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { engToBdNum } from '../../../Utils/engToBng';

const ViewMedicineAdditionalDetails = ({ singleMedicineData }) => {
  return (
    <Paper
      sx={{
        padding: '45px',
        mt: '30px',
      }}
    >
      {singleMedicineData?.medicine_uses.map((item, idx, arr) => {
        return (
          <Grid key={idx} container columnSpacing={'45px'} rowGap={'30px'}>
            <Grid item xs={4}>
              <Typography variant='body6' color='textBlack'>
                {engToBdNum(idx + 1)} {''}ফসলের এর নাম
              </Typography>
              <Typography
                variant='body6'
                color='textBlack'
                sx={{
                  border: 1,
                  borderColor: 'primary.main',
                  width: 1,
                  overflowX: 'auto',
                  borderRadius: '5px',
                  padding: '7px 11px',
                  mt: '10px',
                  height: '40px',
                }}
              >
                {item?.crop?.title}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant='body6' color='textBlack'>
                বালাই সমূহের নাম
              </Typography>
              <Box
                sx={{
                  border: 1,
                  display: 'flex',

                  alignItems: 'center',
                  gap: '8px',
                  overflowX: 'auto',
                  borderColor: 'primary.main',
                  height: '40px',
                  borderRadius: '5px',
                  px: '11px',
                  mt: '10px',
                }}
              >
                {item?.disease?.map(({ title }, index) => {
                  return (
                    <Box key={index}>
                      <Chip
                        label={title}
                        variant='outlined'
                        sx={{
                          height: '30px',
                          minWidth: '40px',

                          borderRadius: '6px',
                          '& .MuiChip-label': {
                            padding: ' 6px',
                            fontSize: '16px',
                            color: 'textBlack',
                          },
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='body6' color='textBlack'>
                প্রয়োগ মাত্রা (প্রতি লিটার পানিতে)
              </Typography>
              <Typography
                variant='body6'
                color='textBlack'
                sx={{
                  border: 1,
                  borderColor: 'primary.main',
                  width: 1,
                  overflowX: 'auto',
                  borderRadius: '5px',
                  padding: '7px 11px',
                  mt: '10px',
                  height: '40px',
                }}
              >
                {item?.appliance_level}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='body6' color='textBlack'>
                একর প্রতি মাত্রা
              </Typography>
              <Typography
                variant='body6'
                color='textBlack'
                sx={{
                  border: 1,
                  borderColor: 'primary.main',
                  width: 1,
                  overflowX: 'auto',
                  borderRadius: '5px',
                  padding: '7px 11px',
                  mt: '10px',
                  height: '40px',
                }}
              >
                {item?.acre_level}
              </Typography>
            </Grid>
            {Boolean(idx < arr.length - 1) && (
              <Divider
                sx={{
                  mb: '30px',
                  width: 1,
                }}
              />
            )}
          </Grid>
        );
      })}
    </Paper>
  );
};

export default ViewMedicineAdditionalDetails;
