import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useMatches } from 'react-router-dom';

const PageHeader = () => {
  const [pageTitle, setPageTitle] = useState('Corbel International Ltd.');
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const { pathname } = useLocation();
  let matches = useMatches();

  useEffect(() => {
    let crumbs = matches.filter((match) => Boolean(match.handle?.crumb));

    const matched = crumbs.find((match) => match.pathname === pathname);

    if (Boolean(matched?.handle?.crumb?.title)) {
      setPageTitle(matched?.handle?.crumb?.title);
    }

    const crumbsComponents = crumbs.map((data) => {
      const { to = '', title = '' } = data?.handle?.crumb ?? {};
      return (
        <Typography
          key={`route-for=${to}`}
          component={Boolean(to) ? Link : 'p'}
          to={to}
          sx={{
            fontSize: '16px',
            fontWeight: 400,
            textDecoration: 'none',
            color: 'textBlack',
            textTransform: 'capitalize',
            '&:hover': Boolean(to)
              ? {
                  textDecoration: 'underline',
                }
              : {},
            '&:visited': {
              color: 'primary.main',
            },
          }}
        >
          {title}
        </Typography>
      );
    });

    setBreadcrumbs(crumbsComponents);

    return () => {
      setBreadcrumbs([]);
      setPageTitle('Corbel International Ltd.');
    };
  }, [pathname]);

  return (
    <Paper
      sx={{
        my: '40px',
        padding: '16px 22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0px 3px 1px -2px rgba(76, 78, 100, 0.2)',
        borderRadius: '3px',
        bgcolor: 'color3.main',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontSize: '20px',
          fontWeight: 700,
          color: 'textBlack',
          textTransform: 'capitalize',
        }}
      >
        {pageTitle}
      </Typography>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Paper>
  );
};

export default PageHeader;
