import { Box, Button, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import SearchField from '../../Shared/SearchField';

const MedicineTabsAndSearch = ({ selected, setSelected, setSearchItem }) => {
  const { data: medicineCategories = [] } = useQuery(
    ['/api/corbel/medicines-category/'],
    {
      onSuccess: (data) => {
        setSelected(data[0]?.id);
      },
    }
  );
  const navigate = useNavigate();
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'color2.main',
          width: 1,
        }}
      >
        {medicineCategories.map(({ title, id }, idx) => {
          return (
            <Button
              key={idx}
              onClick={() => {
                setSelected(id);
                // setFilters((filters) => {
                //   return { ...filters, status: value };
                // });
              }}
              variant='text'
              sx={{
                width: 1,
                height: '54px',
                fontWeight: 600,
                fontSize: '16px',
                transition: '.50s ease',
                borderRadius: 0,
                backgroundColor: selected === id ? 'color1.main' : 'unset',
                color: selected === id ? 'textWhite' : 'unset',
                '&:hover': {
                  backgroundColor: selected === id ? 'color1.main' : 'unset',
                  color: selected === id ? 'textWhite' : 'unset',
                },
              }}
            >
              {title}
            </Button>
          );
        })}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          my: '45px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <Typography variant='body6'>ফসলের ঔষধ তালিকা </Typography>
          <Button
            variant='button1'
            sx={{ gap: '8px', color: 'textWhite' }}
            onClick={() => navigate('/crops-medicine/add-medicine')}
          >
            <AiOutlinePlusCircle /> ঔষধ যোগ করুন
          </Button>
        </Box>
        <SearchField borderVariant setSearchItem={setSearchItem} />
      </Box>
    </Box>
  );
};

export default MedicineTabsAndSearch;
