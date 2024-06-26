import CircleIcon from '@mui/icons-material/Circle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Drawer,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BiMove } from 'react-icons/bi';
import { BsFileImage } from 'react-icons/bs';
import { GiHighGrass } from 'react-icons/gi';
import { IoIosNotifications } from 'react-icons/io';
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdGroup, MdOutlineSettingsSuggest } from 'react-icons/md';
import { RiMedicineBottleLine } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerMenus = [
  {
    title: 'ড্যাশবোর্ড',
    icon: AiOutlineHome,
    path: '',
  },
  {
    title: 'সকল ফসল',
    icon: GiHighGrass,
    path: 'all-crops',
  },

  {
    title: 'ফসলের ঔষধ',
    icon: RiMedicineBottleLine,
    path: 'crops-medicine',
  },
  {
    title: 'ক্যাটাগরি ছবি',
    icon: BsFileImage,
    path: 'edit-category-img',
  },
  {
    title: 'প্রোডাক্ট প্রমোশন',
    icon: BiMove,
    path: 'promotional-product',
  },
  {
    title: 'সহযোগী প্রতিষ্ঠান সমূহ',
    icon: LuLayoutDashboard,
    path: 'cooperative-organizations',
    children: [
      {
        title: 'নিকটস্থ সার্ভিস সেন্টার',
        path: '',
      },
      {
        title: 'সেলস্ টেরিটরি',
        path: 'sales-territory',
      },
      {
        title: 'রিটেইলার পয়েন্ট',
        path: 'retailer-point',
      },
      {
        title: 'সেলস্ এরিয়া',
        path: 'sales-area',
      },
      {
        title: 'ওয়্যার হাউজ',
        path: 'warehouse',
      },
    ],
  },

  {
    title: 'গ্রাহকের মতামত',
    icon: MdGroup,
    path: 'customer-feedback',
  },
  {
    title: 'নোটিফিকেশন',
    icon: IoIosNotifications,
    path: 'notification',
  },
  {
    title: 'সেটিংস',
    icon: MdOutlineSettingsSuggest,
    path: 'settings',
  },
];

const SideDrawer = ({ drawerWidth }) => {
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleExpandedMenu = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : null);
  };

  const handleMenu = (path) => {
    setExpanded(null);
    navigate(path);
  };

  useEffect(() => {
    const pathNames = pathname?.split('/');
    const parentNav = pathNames[1] ?? '';
    if (Boolean(parentNav)) {
      drawerMenus?.forEach((item, index) => {
        if (Boolean(item?.path === parentNav)) {
          setExpanded(`panel${index}`);
        }
      });
    }
    return () => {};
  }, []);

  return (
    <Drawer
      sx={{
        zIndex: 1000,
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          bgcolor: 'primary.main',
          color: 'white',
          width: drawerWidth,
          boxSizing: 'border-box',
        },
        '& svg': {
          color: 'white',
        },
        // scrollbar
        '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
          width: '3px',
        },
      }}
      variant='permanent'
      anchor='left'
    >
      <Toolbar />
      <Box
        sx={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          maxHeight: 'calc(100vh - 75px)',
          overflowY: 'auto',

          // child styles
          '& .MuiButtonBase-root': {
            p: '0px 12px !important',
            fontSize: '14px',
            gap: '12px',
            height: '42px',
            borderRadius: '2px',
            justifyContent: 'flex-start',
          },
          '& .MuiPaper-root': {
            color: 'inherit',
            bgcolor: 'inherit',
          },
          '& .MuiAccordionSummary-root': {
            minHeight: 'unset !important',
            gap: '12px',

            '& .MuiAccordionSummary-content': {
              gap: '12px',
            },
            '& .MuiAccordionSummary-expandIconWrapper': {
              transform: 'rotate(270deg)',
            },
            '& .Mui-expanded.MuiAccordionSummary-expandIconWrapper': {
              transform: 'rotate(0deg)',
            },
          },
          '& .MuiAccordionDetails-root': {
            padding: '5px 0 0 2px !important',
          },
        }}
      >
        <Typography variant='body1' sx={{ mb: '20px' }}>
          অ্যাপ্লিকেশন সমূহ{' '}
        </Typography>
        {drawerMenus?.map(
          ({ title, icon: Icon, path = '', children = '' }, idx) => {
            return (
              <Box key={`drawer-menu-${idx}`}>
                {Boolean(children?.length) ? (
                  <Accordion
                    expanded={expanded === `panel${idx}`}
                    onChange={handleExpandedMenu(`panel${idx}`)}
                    elevation={0}
                  >
                    <AccordionSummary
                      aria-controls={`panel${idx}d-content`}
                      id={`panel${idx}d-header`}
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Icon style={{ fontSize: '18px' }} />
                      <Box component='span'>{title}</Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      {children.map(
                        ({ title: childTitle, path: childPath }, idx) => {
                          return (
                            <Button
                              key={`drawer-sub-menu-${idx}`}
                              size='small'
                              onClick={() =>
                                navigate(
                                  `/${path}${childPath ? `/${childPath}` : ''}`
                                )
                              }
                              fullWidth
                              variant='text'
                              sx={{
                                bgcolor: Boolean(
                                  `/${path}${
                                    childPath ? `/${childPath}` : ''
                                  }` === pathname
                                )
                                  ? 'white'
                                  : 'transparent',
                                color: Boolean(
                                  `/${path}${
                                    childPath ? `/${childPath}` : ''
                                  }` === pathname
                                )
                                  ? 'black'
                                  : 'white',
                                '& path': {
                                  color: Boolean(
                                    `/${path}${
                                      childPath ? `/${childPath}` : ''
                                    }` === pathname
                                  )
                                    ? 'black'
                                    : 'white',
                                },

                                '&:hover': {
                                  bgcolor: 'white',
                                  color: 'black',
                                  '& path': {
                                    color: 'black',
                                  },
                                },
                              }}
                            >
                              <CircleIcon
                                sx={{
                                  height: '8px',
                                  width: '8px',
                                  ml: '7px',
                                  mr: '3px',
                                }}
                              />
                              <Box component='span'>{childTitle}</Box>
                            </Button>
                          );
                        }
                      )}
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  <Button
                    fullWidth
                    variant='text'
                    onClick={() => handleMenu(`/${path}`)}
                    sx={{
                      bgcolor: Boolean(`/${path}` === pathname)
                        ? 'white'
                        : 'transparent',
                      color: Boolean(`/${path}` === pathname)
                        ? 'black'
                        : 'white',
                      '& path': {
                        color: Boolean(`/${path}` === pathname)
                          ? 'black'
                          : 'white',
                      },

                      '&:hover': {
                        bgcolor: 'white',
                        color: 'black',
                        '& path': {
                          color: 'black',
                        },
                      },
                    }}
                  >
                    <Icon
                      style={{
                        fontSize: '18px',
                      }}
                    />
                    <Box component='span'>{title}</Box>
                  </Button>
                )}
              </Box>
            );
          }
        )}
      </Box>
    </Drawer>
  );
};

export default SideDrawer;
