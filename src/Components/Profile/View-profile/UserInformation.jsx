import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { FaPen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserInformation = ({ currentUser }) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={6}>
      <Paper
        sx={{
          padding: '42px',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          minHeight: '257px',
        }}
      >
        <Box
          sx={{
            justifyContent: 'space-between',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography
            variant='body6'
            sx={{
              position: 'relative',
              '&:after': {
                content: `""`,
                position: 'absolute',
                width: '72px',
                height: '2px',
                bgcolor: 'textBlack',
                bottom: '-8px',
                left: 0,
                mx: 'auto',
              },
            }}
          >
            অ্যাডমিন তথ্য
          </Typography>
          <Button
            onClick={() => navigate('/profile/edit')}
            variant='button1'
            sx={{
              gap: '9px',
              fontSize: '16px',
              py: '5px',
              px: ' 10px',
              color: 'textWhite',
            }}
          >
            <FaPen />
            এডিট
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: ' 6px',
              }}
            >
              <Typography
                variant='body1'
                sx={{
                  coor: 'textBlack',
                  fontWeight: 600,
                }}
              >
                ইমেইল :
              </Typography>
              <Typography variant='body6' color={'textBlack'}>
                {currentUser?.email}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: ' 6px',
              }}
            >
              <Typography
                variant='body1'
                sx={{
                  coor: 'textBlack',
                  fontWeight: 600,
                }}
              >
                জয়েন্ট ডেট :
              </Typography>
              <Typography variant='body1' color={'textBlack'}>
                {moment(currentUser?.date_joined).format('ll')}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: ' 6px',
              }}
            >
              <Typography
                variant='body1'
                sx={{
                  coor: 'textBlack',
                  fontWeight: 600,
                }}
              >
                লিঙ্গ :
              </Typography>
              <Typography
                variant='body1'
                color={'textBlack'}
                sx={{ textTransform: 'capitalize' }}
              >
                {currentUser?.gender}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: ' 6px',
              }}
            >
              <Typography
                variant='body1'
                sx={{
                  coor: 'textBlack',
                  fontWeight: 600,
                }}
              >
                ফোন :
              </Typography>
              <Typography variant='body1' color={'textBlack'}>
                {currentUser?.phone_number}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: ' 6px',
              }}
            >
              <Typography
                variant='body1'
                sx={{
                  coor: 'textBlack',
                  fontWeight: 600,
                }}
              >
                স্টাটাস :
              </Typography>
              <Typography variant='body1' color={'textBlack'}>
                {Boolean(currentUser?.is_active) ? 'Active' : 'Inactive'}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: ' 6px',
              }}
            >
              <Typography
                variant='body1'
                sx={{
                  coor: 'textBlack',
                  fontWeight: 600,
                }}
              >
                জন্ম তারিখ :
              </Typography>
              <Typography variant='body1' color={'textBlack'}>
                {moment(currentUser?.birth_date).format('ll')}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default UserInformation;
