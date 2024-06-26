import { Grid } from '@mui/material';
import React from 'react';
import UserImageAndName from '../../Components/Profile/View-profile/UserImageAndName';
import UserInformation from '../../Components/Profile/View-profile/UserInformation';
import { useGlobalContext } from '../../Global/GlobalContext';

const UserProfile = () => {
  const { currentUser } = useGlobalContext();
  return (
    <Grid
      container
      columnSpacing={'30px'}
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      <UserImageAndName currentUser={currentUser} />
      <UserInformation currentUser={currentUser} />
    </Grid>
  );
};

export default UserProfile;
