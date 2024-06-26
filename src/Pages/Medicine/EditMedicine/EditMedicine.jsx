import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toFormData } from "multipart-object";
import { useSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import MedicineCropsLimits from "../../../Components/Medicine/AddMedicine/MedicineCropsLimits";
import EditMedicineImageAndCategory from "../../../Components/Medicine/EditMedicine/EditMedicineImageAndCategory";
import TextEditor from "../../../Components/Shared/TextEditor";
import axiosApi from "../../../Utils/axiosApi";

const EditMedicine = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  const { data: allCrops = [] } = useQuery([`/api/corbel/crops/get`]);

  const { medicineId } = useParams();
  // console.log(medicineId);

  const { data: medicine = {} } = useQuery(
    [`/api/corbel/medicines/${medicineId}/`],
    {
      onSuccess: (medicine) => {
        setValue("title", medicine?.title);
        setValue("category", medicine?.category?.id);
        setValue("description", medicine?.description);
        setValue("characteristic", medicine?.characteristic);
        setValue("image", medicine?.image);
        setValue(
          "medicine_uses",
          medicine?.medicine_uses
            ? medicine?.medicine_uses?.map((e) => ({
                crop: e?.crop?.id,
                disease: e?.disease?.map((d) => d),
                appliance_level: e?.appliance_level,
                acre_level: e?.acre_level,
              }))
            : [
                {
                  crop: "",
                  disease: [],
                  appliance_level: "",
                  acre_level: "",
                },
              ]
        );
      },
      enabled: Boolean(medicineId),
      cacheTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    }
  );
  const { control, handleSubmit, reset, setValue } = useForm({
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

  const {
    mutate: editMedicineMutation,
    isLoading: editMedicineMutationLoading,
  } = useMutation(
    (payload) =>
      axiosApi.patch(`/api/corbel/medicines/${medicineId}/`, payload, {
        headers: {
          "content-type": "multipart/form-data",
        },
      }),
    {
      onSuccess: ({ data }) => {
        // console.log(data);
        reset();
        navigate(`/crops-medicine/${data?.id}`);
        queryClient.invalidateQueries(["/api/corbel/medicines/"]);
        enqueueSnackbar("সফল ভাবে ঔষধের এডিট হয়েছে", {
          variant: "success",
        });
      },
      onError: (err) => {
        // console.log(err);
        enqueueSnackbar("কোনো একটি সমস্যা হয়েছে", {
          variant: "error",
        });
      },
    }
  );

  const getData = (data) => {
    // const payload = new FormData();

    // payload.append('title', data.title);
    // payload.append('image', data.image);
    // payload.append('description', data.description);
    // payload.append('category', data.category);

    // // Adding disease data to the payload
    // data.disease.forEach((disease, index) => {
    //   payload.append(`disease[${index}].title`, disease.title);
    //   payload.append(`disease[${index}].image`, disease.image);
    // });

    const nestedData = toFormData(data, {
      separator: "mixedDot",
    });

    editMedicineMutation(nestedData);
    // console.log(data);
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit(getData)}>
      <EditMedicineImageAndCategory
        control={control}
        previousImage={medicine?.image}
      />
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
        loading={editMedicineMutationLoading}
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

export default EditMedicine;
