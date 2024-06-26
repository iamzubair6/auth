import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import EditCropsCategoryImg from '../EditCropsCategoryImg/EditCropsCategoryImg';
import EditMedicineCategoryImg from '../EditMedicineCategoryImg/EditMedicineCategoryImg';

const EditCategoryImg = () => {
  const [selected, setSelected] = useState(0);

  const categoryTab = [
    {
      title: 'ফসল',
      component: EditCropsCategoryImg,
    },
    {
      title: 'ফসলের ঔষধ ',
      component: EditMedicineCategoryImg,
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
          mb: '50px',
        }}
      >
        {categoryTab.map(({ title }, idx) => {
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
              {title}
            </Button>
          );
        })}
      </Box>
      <Box>
        {categoryTab.map(({ component: Component }, idx) => {
          return Boolean(idx === selected) && <Component key={idx} />;
        })}
      </Box>
    </Box>
  );
};

export default EditCategoryImg;
