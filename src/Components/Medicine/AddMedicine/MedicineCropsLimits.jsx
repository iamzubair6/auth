import {
  Autocomplete,
  Button,
  Divider,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  TextField,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { Fragment, useState } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { engToBdNum } from '../../../Utils/engToBng';

const MedicineCropsLimits = ({ control, allCrops }) => {
  const [value, setValue] = useState('');

  //english and bangla input function on key press(important)
  // const handleKeyPress = (event) => {
  //   const inputChar = event.key;
  //   const englishNumberPattern = /^[0-9.-]$/;
  //   const bengaliNumberPattern = /^[০-৯.-]$/;

  //   if (
  //     !englishNumberPattern.test(inputChar) &&
  //     !bengaliNumberPattern.test(inputChar)
  //   ) {
  //     event.preventDefault();
  //   }
  // };
  //english and bangla input function on key press end

  //english and bangla input function on pest(important)
  // const handlePaste = (event) => {
  //   const pastedText = event.clipboardData.getData("text");
  //   const englishNumberPattern = /^[0-9.-]*$/;
  //   const bengaliNumberPattern = /^[০-৯.-]*$/;

  //   if (
  //     !englishNumberPattern.test(pastedText) &&
  //     !bengaliNumberPattern.test(pastedText)
  //   ) {
  //     event.preventDefault();
  //   }
  // };
  //english and bangla input function on pest end

  const { data: diseases = [] } = useQuery([`/api/corbel/diseases/`]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'medicine_uses',
  });
  return (
    <Paper sx={{ padding: '45px', mt: '24px' }}>
      {fields.map((item, index, arr) => {
        return (
          <Grid container columnSpacing={'45px'} rowGap={'40px'} key={item.id}>
            {/* ফসলের নাম */}
            <Grid item xs={4}>
              <Controller
                name={`medicine_uses.${index}.crop`}
                control={control}
                defaultValue={''}
                rules={{
                  required: {
                    value: true,
                    message: 'ফসলের নাম প্রয়োজন',
                  },
                }}
                render={({
                  field: { value, ...field },
                  fieldState: { error },
                }) => (
                  <Fragment>
                    <InputLabel
                      required
                      error={Boolean(error)}
                      htmlFor='form-input-cropsName'
                      sx={{
                        color: 'textBlack',
                        fontSize: '18px',
                      }}
                    >
                      {engToBdNum(index + 1)} ফসলের নাম
                    </InputLabel>
                    <TextField
                      id='form-input-cropsName'
                      variant='outlined'
                      select
                      value={Boolean(value) ? value : 'default'}
                      placeholder='ফসলের বালাইের নাম'
                      error={Boolean(error)}
                      helperText={Boolean(error) && error?.message}
                      sx={{
                        border: 1,
                        borderColor: 'primary.main',
                        width: 1,
                        borderRadius: '5px',
                        mt: '10px',
                        height: '40px',
                        '& .MuiInputBase-input': {
                          padding: '7px',
                        },
                      }}
                      {...field}
                    >
                      <MenuItem value='default' disabled>
                        ফসলের নাম
                      </MenuItem>
                      {allCrops?.map((crop, idx) => (
                        <MenuItem key={idx} value={crop?.id}>
                          {crop?.title}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Fragment>
                )}
              />
            </Grid>
            {/* বালাই সমূহের নাম */}
            <Grid item xs={8}>
              <Controller
                name={`medicine_uses.${index}.disease`}
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'বালাই সমূহের নাম প্রয়োজন',
                  },
                }}
                defaultValue={[]}
                render={({
                  field: { value = [], onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <Autocomplete
                      id='autocomplete'
                      autoSelect
                      multiple
                      options={diseases}
                      getOptionLabel={(option) => option?.title}
                      isOptionEqualToValue={(op, value) => op?.id === value?.id}
                      inputValue=''
                      value={value}
                      onChange={(_, newValue) => onChange(newValue)}
                      sx={{
                        '& .MuiAutocomplete-tag': {
                          backgroundColor: 'color6.main',
                          borderRadius: '5px',
                        },
                        '& .MuiOutlinedInput-root': {
                          padding: 0,
                        },
                        '& .MuiChip-label': {
                          color: 'white',
                        },
                        '& .MuiChip-deleteIcon': {
                          color: 'white !important',

                          '&:hover': {
                            color: '#DEDDDD !important',
                          },
                        },

                        '& .MuiMenuList-root': {
                          boxShadow: '0px 4px 10px 5px rgba(0, 0, 0, 0.87)',
                        },
                      }}
                      renderInput={(params) => (
                        <Fragment>
                          <InputLabel
                            required
                            error={Boolean(error)}
                            htmlFor='form-input-tags'
                            sx={{
                              color: 'textBlack',
                              fontSize: '18px',
                            }}
                          >
                            বালাই সমূহের নাম
                          </InputLabel>
                          <TextField
                            fullWidth
                            error={Boolean(error)}
                            // helperText={Boolean(error) && error?.message}
                            id='form-input-tags'
                            margin='normal'
                            variant='outlined'
                            sx={{
                              border: 1,
                              borderColor: 'primary.main',
                              overflowX: 'auto',
                              height: '40px',
                              borderRadius: '5px',
                              mt: '10px',
                              mb: '3px',
                              '& .MuiInputBase-input': {
                                padding: '7px',
                              },
                            }}
                            {...params}
                          />
                          {Boolean(error) && (
                            <FormHelperText
                              sx={{
                                padding: '0px 0px 0px 20px',
                                margin: 0,
                                color: 'error.main',
                              }}
                            >
                              {error?.message}
                            </FormHelperText>
                          )}
                        </Fragment>
                      )}
                    />
                  );
                }}
              />
            </Grid>
            {/* প্রয়োগ মাত্রা */}
            <Grid item xs={4}>
              <Controller
                name={`medicine_uses.${index}.appliance_level`}
                control={control}
                defaultValue={''}
                rules={{
                  required: {
                    value: true,
                    message: 'প্রয়োগ মাত্রা (প্রতি লিটার পানিতে) প্রয়োজন',
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <Fragment>
                    <InputLabel
                      required
                      error={Boolean(error)}
                      htmlFor='form-input-limit'
                      sx={{
                        color: 'textBlack',
                        fontSize: '18px',
                      }}
                    >
                      প্রয়োগ মাত্রা (প্রতি লিটার পানিতে)
                    </InputLabel>
                    <TextField
                      id='form-input-limit'
                      variant='outlined'
                      type='text'
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      // onKeyPress={handleKeyPress}
                      // onPaste={handlePaste}
                      // inputProps={{
                      //   min: 0,
                      // }}
                      placeholder='গ্রাম/মিলি গ্রাম'
                      {...field}
                      error={Boolean(error)}
                      helperText={Boolean(error) && error?.message}
                      sx={{
                        border: 1,
                        borderColor: 'primary.main',
                        width: 1,
                        borderRadius: '5px',
                        mt: '10px',
                        height: '40px',
                        '& .MuiInputBase-input': {
                          padding: '7px',
                        },
                      }}
                    />
                  </Fragment>
                )}
              />
            </Grid>
            {/* একর প্রতি মাত্রা */}
            <Grid item xs={4}>
              <Controller
                name={`medicine_uses.${index}.acre_level`}
                control={control}
                defaultValue={''}
                rules={{
                  required: {
                    value: true,
                    message: 'একর প্রতি প্রয়োগ মাত্রা প্রয়োজন',
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <Fragment>
                    <InputLabel
                      required
                      error={Boolean(error)}
                      htmlFor='form-input-acreLimit'
                      sx={{
                        color: 'textBlack',
                        fontSize: '18px',
                      }}
                    >
                      একর প্রতি মাত্রা
                    </InputLabel>
                    <TextField
                      id='form-input-acreLimit'
                      variant='outlined'
                      type='text'
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      // onKeyPress={handleKeyPress}
                      // onPaste={handlePaste}
                      // inputProps={{ min: 0 }}
                      placeholder='গ্রাম/মিলি গ্রাম'
                      {...field}
                      error={Boolean(error)}
                      helperText={Boolean(error) && error?.message}
                      sx={{
                        border: 1,
                        borderColor: 'primary.main',
                        width: 1,
                        borderRadius: '5px',
                        mt: '10px',
                        height: '40px',
                        '& .MuiInputBase-input': {
                          padding: '7px',
                        },
                      }}
                    />
                  </Fragment>
                )}
              />
            </Grid>
            {/* submit */}
            <Grid
              item
              xs={4}
              sx={{
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'start',
              }}
            >
              <Button
                variant='button4'
                type='button'
                onClick={() => remove(index)}
                sx={{
                  height: '40px',
                  color: 'textWhite',
                  display: arr.length > 1 ? 'block' : 'none',
                }}
              >
                ডিলিট
              </Button>
            </Grid>
            {Boolean(index < arr.length - 1) && (
              <Divider
                sx={{
                  my: '30px',
                  width: 1,
                }}
              />
            )}
          </Grid>
        );
      })}

      <Button
        variant='button1'
        type='button'
        sx={{ gap: '8px', color: 'textWhite', mt: '65px' }}
        onClick={() =>
          append({
            crop: '',
            disease: [],
            appliance_level: '',
            acre_level: '',
          })
        }
      >
        <AiOutlinePlusCircle />
        আরো যোগ করুন
      </Button>
    </Paper>
  );
};

export default MedicineCropsLimits;
