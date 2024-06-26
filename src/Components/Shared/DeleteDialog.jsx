import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import axiosApi from '../../Utils/axiosApi';

const DeleteDialog = ({
  open = false,
  deleteURL = '',
  handleClose = () => null,
  successRefetch = () => null,
}) => {
  const { mutate: deleteMutation, isLoading } = useMutation(
    () => axiosApi.delete(deleteURL),
    {
      onSuccess: () => {
        successRefetch();
        handleClose();
      },
      onError: (e) => {
        alert('failed');
      },
    }
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle
        component='div'
        id='alert-dialog-title'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <DeleteIcon />
          <Typography variant='h5'>ডিলেট নিশ্চিত করুন</Typography>
        </Box>
        <IconButton
          onClick={() => handleClose()}
          sx={{
            bgcolor: 'textGray',
            height: '24px',
            width: '24px',
            borderRadius: '5px',
            '&:hover': {
              bgcolor: 'lightGray',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          minHeight: '60px',
          minWidth: '500px',
        }}
      >
        <DialogContentText id='alert-dialog-description'>
          আপনি এই আইটেমটি মুছে ফেলতে চান আপনি কি নিশ্চিত?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ mb: '20px', gap: '16px', pr: '24px' }}>
        <Button
          variant='contained'
          onClick={() => handleClose()}
          sx={{
            color: 'textBlack',
            borderRadius: '6px',
            bgcolor: 'rgba(168, 170, 174, 0.16)',
            '&:hover': {
              bgcolor: 'rgba(168, 170, 174, 0.16)',
            },
          }}
        >
          বাতিল করুন
        </Button>
        <LoadingButton
          variant='contained'
          loading={isLoading}
          onClick={deleteMutation}
          autoFocus
          sx={{
            color: 'textWhite',
            borderRadius: '6px',
            bgcolor: '#EA5046',
            '&:hover': {
              bgcolor: '#EA5046',
            },
          }}
        >
          ডিলেট করুন
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
