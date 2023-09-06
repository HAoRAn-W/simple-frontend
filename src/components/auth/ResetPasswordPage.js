import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { object, string, ref } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import AuthService from "../../app/services/auth.service";
import {
  EMAIL_MISMATCH,
  SUCCESSFUL,
  UNDEFINED_ERROR,
  USER_NOTFOUND,
} from "../../app/constants/MessageCode";

function ResetPasswordPage() {
  const resetSchema = object({
    username: string().required(),
    email: string().required().email(),
    password: string()
      .required()
      .min(12, "Password must be longer than 12 characters")
      .max(60, "Password exceeds 60 characters"),
    confirmpassword: string()
      .oneOf([ref("password"), null], "Confirm password must match password")
      .required(),
  });
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetSchema) });

  const [respCode, setRespCode] = useState();

  const onSubmit = (data) => {
    const { username, email, password, confirmpassword } = data;
    AuthService.resetpassword(username, email, password, confirmpassword).then(
      (result) => {
        setRespCode(result.code);
      }
    );
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          height: "100vh",
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">🛠️</Typography>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        {respCode === USER_NOTFOUND && (
          <Alert severity="error">Cannot find user</Alert>
        )}
        {respCode === EMAIL_MISMATCH && (
          <Alert severity="error">Email is not matched</Alert>
        )}
        {respCode === UNDEFINED_ERROR && (
          <Alert severity="error">Please try again</Alert>
        )}
        {respCode === SUCCESSFUL && (
          <Alert severity="success" sx={{ marginTop: "3px" }}>
            Reset password success!
          </Alert>
        )}

        <Box
          component={"form"}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                name="username"
                fullWidth
                id="username"
                label="Username"
                autoFocus
                {...register("username")}
              />
              {errors.username && (
                <Alert severity="error" sx={{ marginTop: "3px" }}>
                  {errors.username?.message}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && (
                <Alert severity="error" sx={{ marginTop: "3px" }}>
                  {errors.email?.message}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                {...register("password")}
              />
              {errors.password && (
                <Alert severity="error" sx={{ marginTop: "3px" }}>
                  {errors.password?.message}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmpassword"
                label="Confirm password"
                type="password"
                id="confirmpassword"
                {...register("confirmpassword")}
              />
              {errors.confirmpassword && (
                <Alert severity="error" sx={{ marginTop: "3px" }}>
                  {errors.confirmpassword?.message}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 5 }}
                onClick={reset}
              >
                Reset password
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default ResetPasswordPage;
