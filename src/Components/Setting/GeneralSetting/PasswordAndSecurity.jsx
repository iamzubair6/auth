import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import React, { Fragment, useRef, useState } from 'react';
import TitleUnderLine from './TitleUnderLine';
import { Controller, useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordAndSecurity = () => {
  const { control, handleSubmit, reset } = useForm();
  const getData = (data) => {
    // console.log({ ...data });
    reset();
  };

  const [showPassword, setShowPassword] = useState({});

  const handlePasswordShow = (fieldName) => {
    setShowPassword({
      ...showPassword,
      [fieldName]: Boolean(showPassword[fieldName])
        ? !showPassword[fieldName]
        : true,
    });
  };

  // email state

  const [updated, setUpdated] = useState('');

  function handleEmailSubmit() {
    // console.log('email:', updated);
    setUpdated('');
  }

  const inputs = [
    {
      name: 'old_password',
      inputComponent: TextField,
      inputLabel: 'Old password',
    },
    {
      name: 'new_password ',
      inputComponent: TextField,
      inputLabel: 'New password',
    },
    {
      name: 'confirm_new_password ',
      inputComponent: TextField,
      inputLabel: 'Confirm New password',
    },
  ];

  return (
    <Box>
      <TitleUnderLine title="Password & Security" underline />
      <Typography variant="body4" component={'p'} color="textTan">
        All password settings and security option.
      </Typography>
      {/* radio button */}
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        sx={{ my: '30px' }}
      >
        <FormControlLabel
          value="change"
          control={<Radio color="color15" />}
          label="Change Password"
        />
        <FormControlLabel
          value="forget"
          control={<Radio color="color15" />}
          label="Forgot Password"
        />
      </RadioGroup>

      {/* radio button end */}

      {Boolean(selectedType === 'change') ? (
        <Grid
          container
          columnSpacing={'25px'}
          component={'form'}
          onSubmit={handleSubmit(getData)}
        >
          {/* change password  */}
          {inputs.map(
            ({ name, inputComponent: InputComponent, inputLabel }, idx) => {
              return (
                <Grid key={idx} item xs={3.5}>
                  <InputLabel
                    htmlFor={`form-input-${name}`}
                    sx={{
                      color: 'textBlack',
                    }}
                  >
                    {inputLabel}
                  </InputLabel>
                  <Controller
                    name={name}
                    control={control}
                    defaultValue={''}
                    render={({ field }) => (
                      <InputComponent
                        fullWidth
                        type={showPassword[name] ? 'text' : 'password'}
                        id={`form-input-${name}`}
                        variant="outlined"
                        {...field}
                        placeholder="**************"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => handlePasswordShow(name)}
                                onMouseDown={() => handlePasswordShow(name)}
                                edge="end"
                              >
                                {showPassword[name] ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          border: 1,
                          borderColor: 'primary.main',
                          height: '40px',
                          borderRadius: '5px',
                          mt: '10px',
                          '& .MuiInputBase-input': {
                            padding: '10px 11px 5px 11px',
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
              );
            }
          )}
          <Grid item xs={1.5} sx={{ display: 'flex', alignItems: 'end' }}>
            <Button variant="button3" type="submit" sx={{ height: '40px' }}>
              Submit
            </Button>
          </Grid>

          {/* change password end */}
        </Grid>
      ) : (
        <Box sx={{ display: 'flex', gap: '30px' }}>
          {/* forget password */}
          <Box>
            <InputLabel
              htmlFor="form-input-email"
              sx={{
                color: 'textBlack',
              }}
            >
              Please Enter Your Registered Email
            </InputLabel>
            <TextField
              fullWidth
              name="email"
              type={'email'}
              value={updated}
              onChange={(e) => setUpdated(e.target.value)}
              id="form-input-email"
              variant="outlined"
              placeholder="Enter Your Mail "
              sx={{
                border: 1,
                borderColor: 'primary.main',
                height: '40px',
                width: '356px',
                borderRadius: '5px',
                mt: '10px',
                '& .MuiInputBase-input': {
                  padding: '6px 11px 9px 11px',
                },
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'end' }}>
            <Button
              variant="button3"
              sx={{ height: '40px' }}
              onClick={handleEmailSubmit}
            >
              Send
            </Button>
          </Box>
          {/* forget password end */}
        </Box>
      )}
    </Box>
  );
};

export default PasswordAndSecurity;
