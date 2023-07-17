import { Avatar, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  const handleSubmit = () => {};
  return (
    <Container component={"main"} maxWidth="xs">
      <Box
        sx={{
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
        <Box component={"form"} noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <TextField
                    required
                    autoComplete="username"
                    name="username"
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus/>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    />
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
                />
                <Button type='submit' fullWidth variant='contained' sx={{mt: 5}}>
                    Sign up
                </Button>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end" sx={{mt: 3}}> 
              <Grid item>
                <Typography component={Link} to={'/login'}>
                Already have an account? Sign in
                </Typography>
              </Grid>
            </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterPage;
