import { Alert, AlertTitle, Box } from '@mui/material';
import React, { Fragment } from 'react';
import { useGlobalContext } from '../../Global/GlobalContext';

const ErrorAlert = ({ error }) => {
  const { localeString } = useGlobalContext();
  const errorHeader = error?.response?.status ?? localeString.oops;
  const errorSubHeader =
    error?.response?.statusText ?? localeString.somethingWentWrong;
  const errorSubHeaderFocus = error?.response?.data?.details ?? '';

  return (
    <Alert severity="error" sx={{ my: '40px' }}>
      <AlertTitle>{errorHeader}</AlertTitle>
      {errorSubHeader}{' '}
      {errorSubHeaderFocus && (
        <Fragment>
          — <Box component="strong">{errorSubHeaderFocus}</Box>
        </Fragment>
      )}
    </Alert>
  );
};

export default ErrorAlert;
