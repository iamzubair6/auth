import { Box, IconButton, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { GrAddCircle } from "react-icons/gr";

const PairedInputField = ({
  firstField = "",
  secondField = "",
  onSubmit = () => null,
}) => {
  const [error, setError] = useState(null);
  const field1 = useRef();
  const field2 = useRef();

  const handleSubmit = () => {
    setError(null);

    if (!Boolean(field1.current.value)) {
      setError(firstField);
      return;
    }

    if (!Boolean(field2.current.value)) {
      setError(secondField);
      return;
    }

    const data = {
      [firstField]: field1.current.value,
      [secondField]: field2.current.value,
    };

    onSubmit(data);
    field1.current.value = field2.current.value = "";
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <TextField
        inputRef={field1}
        placeholder={firstField?.replace("_", " ")}
        sx={{
          border: 1,
          borderColor: Boolean(error === firstField)
            ? "error.main"
            : "primary.main",
          width: "350px",
          borderRadius: "5px",
          mt: "10px",
          height: "40px",
          "& .MuiInputBase-input": {
            padding: "7px",
          },
        }}
      />
      <TextField
        inputRef={field2}
        type={"number"}
        defaultValue="0"
        placeholder={secondField?.replace("_", " ")}
        sx={{
          border: 1,
          borderColor: Boolean(error === secondField)
            ? "error.main"
            : "primary.main",
          width: "350px",
          borderRadius: "5px",
          mt: "10px",
          height: "40px",
          "& .MuiInputBase-input": {
            padding: "7px",
          },
        }}
        InputProps={{ inputProps: { min: 0 } }}
      />
      <IconButton onClick={handleSubmit} sx={{ p: 0 }}>
        <GrAddCircle
          style={{
            fontSize: "20px",
            marginTop: "15px",
          }}
        />
      </IconButton>
    </Box>
  );
};

export default PairedInputField;
