import { Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <Typography
      variant='body1'
      color={'textBlack'}
      sx={{
        my: '25px',
        textAlign: 'center',
      }}
    >
      &#169; All Rights Reserved by Corbel International Ltd. Powered by
      Techsist Ltd.
    </Typography>
  );
};

export default Footer;
