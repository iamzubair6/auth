import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import EditCropsCategoryModal from '../../Components/EditCropsCategoryImg/EditCropsCategoryModal';
import EditCropsCategoryTable from '../../Components/EditCropsCategoryImg/EditCropsCategoryTable';

const EditCropsCategoryImg = () => {
  const [openEditor, setOpenEditor] = useState(null);
  const { data: cropsCategoryData = [], isLoading: cropsCategoryLoading } =
    useQuery(['/api/corbel/crops-category/']);
  return (
    <Box>
      <EditCropsCategoryModal
        openEditor={openEditor}
        handleClose={() => setOpenEditor(false)}
      />
      <EditCropsCategoryTable
        setOpenEditor={setOpenEditor}
        cropsCategoryData={cropsCategoryData}
        cropsCategoryLoading={cropsCategoryLoading}
      />
    </Box>
  );
};

export default EditCropsCategoryImg;
