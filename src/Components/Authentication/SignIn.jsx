import { LoadingButton } from "@mui/lab";
import { Box, InputLabel, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
import { useGlobalContext } from "../../Global/GlobalContext";
import { axiosRaw } from "../../Utils/axiosApi";
import { parseJwt } from "../../Utils/helper";

const SignIn = () => {
  const [error, setError] = useState(null);
  const { setUserToken, setUser } = useGlobalContext();
  const { control, handleSubmit, setValue, reset } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { mutate: signInMutation, isLoading: singInLoading } = useMutation(
    (payload) => axiosRaw.post("/authentication/v1/login/", payload),
    {
      onSuccess: ({ data }) => {
        if (Boolean(parseJwt(data?.access))) {
          //(Boolean(parseJwt(data?.access)?.is_staff)) changed
          reset();
          setUserToken(data?.access, data?.refresh);
          setUser(parseJwt(data?.access));
          enqueueSnackbar(data?.message, {
            variant: "success",
          });
          navigate("/");
        } else {
          setError("You are not an admin");
          setValue("password", "");
        }
      },
      onError: ({ response: { data = {} } = {} }) => {
        setError(data?.detail);
        enqueueSnackbar("Failed to log in - something went wrong.", {
          variant: "error",
        });
        setValue("password", "");
      },
      onMutate: () => setError(null),
    }
  );

  const inputFields = [
    {
      name: "username",
      type: "text",
      label: "Username",
      defaultValue: "",
      placeholder: "Enter your Usernamr",
      rules: {
        required: {
          value: true,
          message: "Username is required",
        },
      },
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      defaultValue: "",
      placeholder: "Enter your Password",
      rules: {
        required: {
          value: true,
          message: "Password is required",
        },
      },
    },
  ];

  return (
    <Box
      sx={{
        padding: "45px",
        minWidth: "425px",
      }}
    >
      <Typography variant="h4" color="textWhite">
        Log In
      </Typography>
      <Typography
        variant="body1"
        component="div"
        color="textWhite"
        paddingTop="10px"
        marginBottom="40px"
      >
        Continue to Corbel International Ltd
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(signInMutation)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {inputFields.map(
          ({ name, label, type, defaultValue, placeholder, rules }, idx) => {
            return (
              <Controller
                key={`sign-in-input-${idx}`}
                name={name}
                control={control}
                rules={rules}
                defaultValue={defaultValue}
                render={({ field, fieldState: { error } }) => (
                  <Box sx={{ my: "5px" }}>
                    <InputLabel
                      htmlFor={`${name}-input`}
                      error={Boolean(error)}
                      required
                      sx={{
                        color: "textWhite",
                        fontSize: "16px",
                        marginBottom: "5px",
                      }}
                    >
                      {label}
                    </InputLabel>
                    <TextField
                      variant="outlined"
                      size="small"
                      id={`${name}-input`}
                      type={type}
                      placeholder={placeholder}
                      sx={{
                        width: 1,
                        height: "37px",
                        bgcolor: "textWhite",
                        border: "1px solid black",
                        borderRadius: "5px",

                        "& input": {
                          py: "6.5px !important",
                        },
                      }}
                      error={Boolean(error)}
                      helperText={Boolean(error) && error?.message}
                      {...field}
                    />
                  </Box>
                )}
              />
            );
          }
        )}

        <LoadingButton
          loading={singInLoading}
          variant="button3"
          type="submit"
          sx={{
            width: 1,
            height: "40px",
            textTransform: "unset",
            fontWeight: "700",
            fontSize: "16px",
            lineHeight: "22px",
            mt: "20px",

            "&:hover": { bgcolor: "grey3.main" },
          }}
        >
          Log In
        </LoadingButton>
      </Box>
      {Boolean(error) && (
        <Typography
          variant="subtitle2"
          component="div"
          color="red"
          textAlign="center"
          marginTop="12px"
        >
          {error}
        </Typography>
      )}
      <Typography
        align="center"
        color="textWhite"
        sx={{
          fontSize: "16px",
          fontWeight: 600,
          my: "20px",
        }}
      >
        or
      </Typography>
      <Typography
        component={Link}
        align="center"
        color="textWhite"
        to={`/auth/password-reset`}
        sx={{
          width: 1,
          display: "block",
          fontWeight: 500,
          textDecoration: "unset",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        Forgot Password?
      </Typography>
    </Box>
  );
};

export default SignIn;
