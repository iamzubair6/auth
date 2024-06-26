import React from 'react';
import {
  Box,
  MenuItem,
  TextField,
  Typography,
  Button,
  InputLabel,
} from '@mui/material';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import SearchField from '../Shared/SearchField';
import moment from 'moment';
import { DatePicker } from '@mui/x-date-pickers';

const NotificationFieldsAndSearch = ({
  setSearchItem,
  module,
  modulePath,
  setDate,
  date,
}) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          gap: '50px',
          flexWrap: 'wrap',
          mb: '40px',
          '& .MuiTextField-root': {
            //   marginTop: 0,
          },
        }}
      >
        {/* তারিখ নির্বাচন করুন */}
        <Box>
          <InputLabel
            htmlFor="form-input-date"
            sx={{ color: 'textBlack', fontSize: '16px' }}
          >
            তারিখ নির্বাচন করুন
          </InputLabel>
          <TextField
            id="form-input-date"
            variant="outlined"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            sx={{
              border: 1,
              borderColor: 'primary.main',
              width: { xs: '250px', xl: '350px' },
              borderRadius: '5px',
              mt: '10px',
              height: '40px',
              '& .MuiInputBase-input': {
                padding: '7px',
              },
            }}
          />
        </Box>
      </Box>
      {/* Buttons and search  */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          my: '45px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <Typography variant="body6">{module} তালিকা </Typography>
          <Button
            variant="button1"
            sx={{ gap: '8px', color: 'textWhite' }}
            onClick={() => navigate(`${modulePath}`)}
          >
            <AiOutlinePlusCircle /> {module} যোগ করুন
          </Button>
        </Box>
        <SearchField borderVariant setSearchItem={setSearchItem} />
      </Box>
    </Box>
  );
};

export default NotificationFieldsAndSearch;
