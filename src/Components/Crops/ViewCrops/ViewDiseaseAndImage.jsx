import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { engToBdNum } from '../../../Utils/engToBng';

const ViewDiseaseAndImage = ({ singleCropsData }) => {
  return (
    <Paper
      sx={{
        padding: '45px',
        mt: '30px',
      }}
    >
      <Grid container columnSpacing={'40px'} rowGap={'40px'}>
        {singleCropsData?.disease?.map((item, idx) => {
          return (
            <Grid
              key={idx}
              item
              xs={4}
              sx={{ display: 'flex', justifyContent: 'start' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '30px',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Typography variant='body6' color='textBlack'>
                    {engToBdNum(idx + 1)} ফসলের বালাইের নাম
                  </Typography>
                  <Typography
                    variant='body6'
                    color='textBlack'
                    sx={{
                      border: 1,
                      borderColor: 'primary.main',
                      width: '270px',
                      overflowX: 'auto',
                      borderRadius: '5px',
                      padding: '7px 11px',
                      mt: '10px',
                      height: '40px',
                    }}
                  >
                    {item?.title}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    component='img'
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
                  <Typography variant='body6' color='textBlack'>
                    ফসলের বালাইের ছবি
                  </Typography>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default ViewDiseaseAndImage;
