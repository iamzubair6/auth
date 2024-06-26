import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { MdPrivacyTip } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';
import GeneralSetting from './GeneralSetting/GeneralSetting';
import PrivacySetting from './PrivacySetting/PrivacySetting';

const Settings = () => {
  const [selected, setSelected] = useState(0);

  const buttonData = [
    {
      title: 'সাধারণ ইনফরমেশন',
      icon: RxDashboard,
      component: GeneralSetting,
    },
    {
      title: 'নিরাপত্তা সেটিংস',
      icon: MdPrivacyTip,
      component: PrivacySetting,
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'color2.main',
          width: 1,
          mb: '30px',
        }}
      >
        {buttonData.map(({ title, icon: Icon }, idx) => {
          return (
            <Button
              key={idx}
              onClick={() => setSelected(idx)}
              variant='text'
              sx={{
                width: 1,
                height: '54px',
                fontSize: '16px',
                gap: '16px',
                fontWeight: 600,
                transition: '.50s ease',
                borderRadius: 0,
                backgroundColor: selected === idx ? 'color1.main' : 'unset',
                color: selected === idx ? 'textWhite' : 'unset',
                '&:hover': {
                  backgroundColor: selected === idx ? 'color1.main' : 'unset',
                  color: selected === idx ? 'textWhite' : 'unset',
                },
              }}
            >
              <Icon /> {title}
            </Button>
          );
        })}
      </Box>
      <Box>
        {buttonData.map(({ component: Component }, idx) => {
          return Boolean(idx === selected) && <Component key={idx} />;
        })}
      </Box>
    </Box>
  );
};

export default Settings;
