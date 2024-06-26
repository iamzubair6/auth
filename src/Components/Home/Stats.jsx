import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Stats = () => {
  const { data: statsApiData = {} } = useQuery(
    [`/api/dashboard/user/crops/object/count/`],
    {
      refetchOnMount: true,
    }
  );

  const statsData = [
    {
      title: 'সেলস্ টেরিটরি',
      count: `${statsApiData?.sales_territory ?? 0}`,
    },
    {
      title: 'রিটেইলার পয়েন্ট',
      count: `${statsApiData?.retailer_point ?? 0}`,
    },
    {
      title: 'সেলস্ এরিয়া',
      count: `${statsApiData?.sales_area ?? 0}`,
    },
    {
      title: 'ওয়্যার হাউজ',
      count: `${statsApiData?.sales_warehouse ?? 0}`,
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mb: '40px',
        gap: '15px',
      }}
    >
      {statsData.map(({ title, count }, idx) => {
        return (
          <Box
            key={idx}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              padding: '20px',
              width: 1,
              height: '130px',
              borderRadius: '10px',
              backgroundColor: 'color2.main',
              color: 'textBlack',
              '&:hover': {
                backgroundColor: 'color1.main',
                color: 'textWhite',
                transition: '.3s ease',
                cursor: 'pointer',
              },
            }}
          >
            <Typography variant="body6">{title}</Typography>
            <Typography
              sx={{ fontSize: '24px', fontWeight: 600, lineHeight: '33px' }}
            >
              {count}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default Stats;
