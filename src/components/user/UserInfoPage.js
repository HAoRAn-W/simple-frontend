import { Button, Grid, TextField, Link } from "@mui/material";
import React, { useState } from "react";
import UserServcice from "../../app/services/user.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";

function UserInfoPage({ user }) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [originalUsername, setOriginalUsername] = useState(user.username);
  const [originalEmail, setOriginalEmail] = useState(user.email);

  const handleSubmit = () => {
    UserServcice.updateInfo({
      username: username,
      email: email,
      avatarId: user.avatar ? user.avatar.id : 0,
    }).then((data) => {
      if (data.code === SUCCESSFUL) {
        UserServcice.refresh();
        setOriginalUsername(username);
        setOriginalEmail(email);
      }
    });
  };

  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "row",
        marginTop: 6,
        paddingX: "20%",
      }}
    >
      <Grid item style={{ flex: 5, display: "flex", justifyContent: "center" }}>
        <img
          src={user.avatar ? user.avatar.url : "./avatars/cloud.jpg"}
          style={{
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            position: "relative",
            top: 0,
          }}
          alt="avatar"
        />
      </Grid>
      <Grid item flex={7} flexDirection={"column"}>
        <form noValidate autoComplete="off">
          <TextField
            label="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            fullWidth
            sx={{ marginTop: 5, marginBottom: 5, display: "block" }}
          />

          <TextField
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth
            sx={{ marginTop: 5, marginBottom: 5, display: "block" }}
          />
        </form>
        {(originalUsername !== username || originalEmail !== email) && (
          <Button
            variant="contained"
            type="submit"
            // sx={{ marginTop: 6, marginRight: 2 }}
            onClick={handleSubmit}
          >
            save
          </Button>
        )}
        <Grid item xs mt={3}>
          <Link href="/resetpassword" variant="body1" underline="none">
            Reset Password
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UserInfoPage;
