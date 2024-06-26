import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import SearchField from '../Shared/SearchField';
import { LoadingButton } from '@mui/lab';

const CustomerFeedbackFieldsAndSearch = ({
  division,
  setDivision,
  selected,
  district,
  setDistrict,
  setSearchItem,
  handleArchive,
  archiveLoading,
}) => {
  const navigate = useNavigate();

  const { data: divisions = [] } = useQuery(['/api/sales/service/division/']);
  const { data: districts = [] } = useQuery(
    [`/api/sales/service/district/?division=${division}`],
    {
      cacheTime: 0,
    }
  );

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
        {/* বিভাগ নির্বাচন করুন  */}
        <Box>
          <TextField
            id="form-input-division"
            variant="outlined"
            select
            // defaultValue='default'
            // error={Boolean(error)}
            value={Boolean(division) ? division : 'default'}
            // helperText={Boolean(error) && error?.message}
            sx={{
              border: 1,
              borderColor: 'primary.main',
              width: '250px',
              height: '40px',
              borderRadius: '5px',
              mt: '10px',
              '& .MuiInputBase-input': {
                padding: '7px',
              },
            }}
            onChange={(e) => {
              setDivision(e.target.value);
              setDistrict('');
            }}
          >
            <MenuItem value="default" disabled>
              বিভাগ নির্বাচন করুন
            </MenuItem>
            {divisions?.map((division) => (
              <MenuItem key={division?.id} value={division?.id}>
                {division?.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        {/* জেলা নির্বাচন করুন   */}
        <Box>
          <TextField
            id="form-input-district"
            variant="outlined"
            // defaultValue='default'
            value={Boolean(district) ? district : 'default'}
            select
            sx={{
              border: 1,
              borderColor: 'primary.main',
              width: '250px',
              height: '40px',
              borderRadius: '5px',
              mt: '10px',
              '& .MuiInputBase-input': {
                padding: '7px',
              },
            }}
            onChange={(e) => {
              setDistrict(e.target.value);
            }}
          >
            <MenuItem value="default" disabled>
              জেলা নির্বাচন করুন
            </MenuItem>
            {districts?.map((district) => (
              <MenuItem key={district?.id} value={district?.id}>
                {district?.name}
              </MenuItem>
            ))}
          </TextField>
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
          <Typography variant="body6">গ্রাহকের তথ্য তালিকা </Typography>
          <Button
            variant="button1"
            sx={{ gap: '8px', color: 'textWhite' }}
            onClick={() =>
              navigate(`/customer-feedback/customer-feedback-archive`)
            }
          >
            আর্কাইভ দেখুন
          </Button>
          <LoadingButton
            loading={archiveLoading}
            disabled={Boolean(selected.length === 0)}
            variant="button4"
            sx={{ gap: '8px', color: 'textWhite' }}
            onClick={handleArchive}
          >
            <AiTwotoneDelete />
            ডিলিট
          </LoadingButton>
        </Box>
        <SearchField borderVariant setSearchItem={setSearchItem} />
      </Box>
    </Box>
  );
};

export default CustomerFeedbackFieldsAndSearch;
