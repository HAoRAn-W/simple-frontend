import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../app/slices/auth";
import {
  EMAIL_EXIST,
  SIGNUP_SUCCESSFUL,
  UNDEFINED_ERROR,
  USER_EXIST,
} from "../app/constants/MessageCode";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

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

  const code = useSelector((state) => state.auth.code);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const { username, email, password } = data;
    dispatch(signup({ username, email, password }))
      .unwrap()
      .then(() => {
        if (code === SIGNUP_SUCCESSFUL) {
        }
      })
      .catch(() => {});
  };

  return (
    <Container component={"main"} maxWidth="xs">
      <Box
        sx={{
          height: '100vh',
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create a new account
        </Typography>
        {code === USER_EXIST && (
          <Alert severity="error">Username already exists</Alert>
        )}
        {code === EMAIL_EXIST && (
          <Alert severity="error">Email already exists</Alert>
        )}
        {code === UNDEFINED_ERROR && (
          <Alert severity="error">Please try again</Alert>
        )}
        {code === SIGNUP_SUCCESSFUL && (
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
              <Typography component={Link} to={"/login"}>
                Already have an account? Sign in
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignupPage;
