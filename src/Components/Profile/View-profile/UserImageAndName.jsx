import { Avatar, Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';

const UserImageAndName = ({ currentUser }) => {
  return (
    <Grid item xs={4}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          py: '30px',
          minHeight: '257px',
        }}
      >
        <Avatar
          src={currentUser?.profile_pic}
          sx={{ height: '120px', width: '120px' }}
        />
        <Box
          sx={{
            display: ' flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Typography
            variant="body1"
            color="textBlack"
            sx={{ fontFamily: 'Poppins' }}
          >
            ব্যবহারকারী আইডি: #{currentUser?.id}
          </Typography>
          <Typography
            variant="body4"
            sx={{ color: 'textBlack', fontWeight: 600, fontFamily: 'Poppins' }}
          >
            {currentUser?.full_name}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

export default UserImageAndName;
