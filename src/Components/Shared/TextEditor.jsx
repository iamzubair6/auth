import { Box, FormHelperText, Paper, Typography } from '@mui/material';
import JoditEditor from 'jodit-react';
import React, { Fragment } from 'react';
import { Controller } from 'react-hook-form';

const TextEditor = ({
  control,
  title = '',
  helperText = '',
  fieldName = '',
}) => {
  // const editor = useRef(null);
  const config = {
    toolbarButtonSize: 'middle',
    buttons: ['align', 'bold', 'italic', 'underline', 'ul'],
    buttonsXS: ['align', 'bold', 'italic', 'underline', 'ul'],
    buttonsMD: ['align', 'bold', 'italic', 'underline', 'ul'],
    buttonsSM: ['align', 'bold', 'italic', 'underline', 'ul'],
    placeholder: 'এখানে লিখুন.....',
    maxHeight: 400,
  };

  return (
    <Paper sx={{ padding: '45px', mt: '24px' }}>
      <Box
        sx={{
          '& .jodit-status-bar .jodit-status-bar__item a ': {
            display: 'none',
          },
          '& .jodit-container:not(.jodit_inline)': {
            borderColor: 'primary.main',
          },
          '& .jodit-add-new-line span': {
            display: 'none',
          },
        }}
      >
        <Controller
          name={fieldName}
          control={control}
          rules={{
            required: {
              value: true,
              message: Boolean(helperText) ? helperText : 'বর্ণনা প্রয়োজন',
            },
          }}
          // defaultValue={"<p><br></p>"}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Fragment>
              <Typography
                variant='body6'
                sx={{
                  position: 'relative',
                  color: error ? '#d32f2f' : 'textBlack',
                  mb: '30px',
                  '&:after': {
                    content: `""`,
                    position: 'absolute',
                    width: '72px',
                    height: '2px',
                    bgcolor: error ? '#d32f2f' : 'textBlack',
                    bottom: '-10px',
                    left: 0,
                    mx: 'auto',
                  },
                }}
              >
                {title}*
              </Typography>
              <JoditEditor
                value={value}
                onBlur={(value) => onChange(value)}
                config={config}
              />

              <FormHelperText
                sx={{
                  mt: '15px',
                  color: 'error.main',
                }}
              >
                {error?.message}
              </FormHelperText>
            </Fragment>
          )}
        />
      </Box>
    </Paper>
  );
};

export default TextEditor;
