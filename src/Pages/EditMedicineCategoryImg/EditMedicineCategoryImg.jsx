import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import EditMedicineCategoryTable from '../../Components/EditMedicineCategoryImg/EditMedicineCategoryTable';
import EditMedicineCategoryModal from '../../Components/EditMedicineCategoryImg/EditmedicineCategoryModal';

const EditMedicineCategoryImg = () => {
  const [openEditor, setOpenEditor] = useState(null);
  const {
    data: medicineCategoryData = [],
    isLoading: medicineCategoryLoading,
  } = useQuery(['/api/corbel/medicines-category/']);
  return (
    <Box>
      <EditMedicineCategoryModal
        openEditor={openEditor}
        handleClose={() => setOpenEditor(false)}
      />
      <EditMedicineCategoryTable
        setOpenEditor={setOpenEditor}
        medicineCategoryData={medicineCategoryData}
        medicineCategoryLoading={medicineCategoryLoading}
      />
    </Box>
  );
};

export default EditMedicineCategoryImg;
