import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toFormData } from "multipart-object";
import { useSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MedicineCropsLimits from "../../../Components/Medicine/AddMedicine/MedicineCropsLimits";
import MedicineImageUploadAndCategory from "../../../Components/Medicine/AddMedicine/MedicineImageUploadAndCategory";
import TextEditor from "../../../Components/Shared/TextEditor";
import axiosApi from "../../../Utils/axiosApi";

const AddMedicine = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      medicine_uses: [
        {
          crop: "",
          disease: [],
          appliance_level: "",
          acre_level: "",
        },
      ],
    },
  });

  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  const { data: allCrops = [] } = useQuery([`/api/corbel/crops/get/`]);

  const { mutate: medicineMutation, isLoading: medicineMutationLoading } =
    useMutation(
      (payload) =>
        axiosApi.post("/api/corbel/medicines/", payload, {
          headers: {
            "content-type": "multipart/form-data",
          },
        }),
      {
        onSuccess: ({ data }) => {
          reset();
          navigate(`/crops-medicine/${data?.id}`);
          queryClient.invalidateQueries(["/api/corbel/medicines/"]);
          enqueueSnackbar("সফল ভাবে ঔষধের যোগ হয়েছে", {
            variant: "success",
          });
        },
        onError: (err) => {
          enqueueSnackbar("কোনো একটি সমস্যা হয়েছে", {
            variant: "error",
          });
        },
      }
    );

  const getData = (data) => {
    const medicineUses = data.medicine_uses.map((item) => {
      const { crop, disease, appliance_level, acre_level } = item;
      return {
        crop,
        disease,
        appliance_level,
        acre_level,
      };
    });

    const newFormData = {
      ...data,
      medicine_uses: medicineUses,
    };

    const nestedData = toFormData(newFormData, {
      separator: "mixedDot",
    });

    medicineMutation(nestedData);
    // console.log(data);
  };

  // *** simple mutation system

  // const getData = (data) => {
  //   const nestedData = toFormData(data, {
  //     separator: 'mixedDot',
  //   });
  //   // medicineMutation(nestedData);
  //   console.log(data);
  // };

  // *** simple mutation system

  return (
    <Box component={"form"} onSubmit={handleSubmit(getData)}>
      <MedicineImageUploadAndCategory control={control} />
      <TextEditor
        control={control}
        title="ঔষধের বর্ণনা"
        helperText="ঔষধের বর্ণনা প্রয়োজন"
        fieldName="description"
      />
      <TextEditor
        control={control}
        title="ঔষধের কার্যকারিতা / বৈশিষ্ট্য"
        helperText="ঔষধের কার্যকারিতা / বৈশিষ্ট্য বর্ণনা প্রয়োজন"
        fieldName="characteristic"
      />
      <MedicineCropsLimits control={control} allCrops={allCrops} />
      <LoadingButton
        loading={medicineMutationLoading}
        variant="button2"
        type="submit"
        fullWidth
        sx={{
          color: "textWhite",
          fontSize: "16px",
          height: "40px",
          mt: "30px",
        }}
      >
        সাবমিট করুন
      </LoadingButton>
    </Box>
  );
};

export default AddMedicine;
