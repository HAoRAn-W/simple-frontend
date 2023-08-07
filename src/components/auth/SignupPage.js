import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  EMAIL_EXIST,
  SIGNUP_SUCCESSFUL,
  UNDEFINED_ERROR,
  USER_EXIST,
} from "../../app/constants/MessageCode";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import AuthService from "../../app/services/auth.service";
import { useState } from "react";

function SignupPage() {
  const signupSchema = object({
    username: string()
      .required()
      .min(4, "Username must be longer than 4 characters")
      .max(20, "Username exceeds 20 characters"),
    email: string().required().email(),
    password: string()
      .required()
      .min(12, "Password must be longer than 12 characters")
      .max(60, "Password exceeds 60 characters"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema) });

  const [respCode, setRespCode] = useState();

  const onSubmit = (data) => {
    const { username, email, password } = data;
    AuthService.signup(username, email, password).then((data) => {
      setRespCode(data.code);
    });
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
        <Typography variant="h3">🐣</Typography>
        <Typography component="h1" variant="h5">
          Create a new account
        </Typography>
        {respCode === USER_EXIST && (
          <Alert severity="error">Username already exists</Alert>
        )}
        {respCode === EMAIL_EXIST && (
          <Alert severity="error">Email already exists</Alert>
        )}
        {respCode === UNDEFINED_ERROR && (
          <Alert severity="error">Please try again</Alert>
        )}
        {respCode === SIGNUP_SUCCESSFUL && (
          <Alert severity="success" sx={{ marginTop: "3px" }}>
            Sign up success!
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 5 }}
                onClick={reset}
              >
                Sign up
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
            <Grid item>
              <Typography component={Link} to={"/login"} color={"grey"}>
                Already have an account? Login
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignupPage;
