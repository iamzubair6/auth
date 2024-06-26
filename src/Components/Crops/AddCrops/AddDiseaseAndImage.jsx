import { Button, Paper } from '@mui/material';
import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import RenderAddDiseaseAdnImg from './RenderAddDiseaseAdnImg';

const AddDiseaseAndImage = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'disease',
  });
  return (
    <Paper sx={{ padding: '45px', mt: '24px' }}>
      {fields.map((item, index, arr) => {
        return (
          <RenderAddDiseaseAdnImg
            control={control}
            key={item?.id}
            index={index}
            remove={remove}
            item={item}
            arr={arr}
          />
        );
      })}

      <Button
        variant='button1'
        type='button'
        sx={{ gap: '8px', color: 'textWhite', mt: '65px' }}
        onClick={() => append({ title: '', image: '' })}
      >
        <AiOutlinePlusCircle />
        আরো ফসলের বালাই যোগ করুন
      </Button>
    </Paper>
  );
};

export default AddDiseaseAndImage;
