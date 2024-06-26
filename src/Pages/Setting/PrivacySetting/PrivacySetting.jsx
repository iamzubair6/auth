import { Paper, Typography } from '@mui/material';
import React from 'react';
import ChangePassword from '../../../Components/Setting/GeneralSetting/ChangePassword';
import TitleUnderLine from '../../../Components/Setting/GeneralSetting/TitleUnderLine';

const PrivacySetting = () => {
  //   const [selectedType, setSelectedType] = useState('change');
  return (
    <Paper sx={{ padding: '45px' }}>
      <TitleUnderLine title='পাসওয়ার্ড এবং নিরাপত্তা' underline />
      <Typography variant='body6' component={'p'} color='textTan'>
        সমস্ত পাসওয়ার্ড সেটিংস এবং নিরাপত্তা বিকল্প।
      </Typography>
      {/* radio button */}
      {/* <RadioGroup
        row
        aria-labelledby='demo-row-radio-buttons-group-label'
        name='row-radio-buttons-group'
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        sx={{ my: '30px' }}
      >
        <FormControlLabel
          value='change'
          control={<Radio color='color1' />}
          label='Change Password'
        />
        <FormControlLabel
          value='forget'
          control={<Radio color='color1' />}
          label='Forgot Password'
        />
      </RadioGroup> */}

      {/* radio button end */}

      {/* {Boolean(selectedType === 'change') ? ( */}
      <ChangePassword />
      {/* ) : ( */}
      {/* // <ForgetPassword /> */}
      {/* )} */}
      {/* <PasswordAndSecurity /> */}
    </Paper>
  );
};

export default PrivacySetting;
