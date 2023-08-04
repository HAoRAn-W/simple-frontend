import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import UserServcice from "../../app/services/user.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";
import avatars from "../avatar/avatars";

function UserInfoPage({ user }) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [originalUsername, setOriginalUsername] =  useState(user.username);
  const [originalEmail, setOriginalEmail] =  useState(user.email);

  const handleSubmit = () => {
    UserServcice.updateInfo({
      username: username,
      email: email,
      avatarId: user.avatarId,
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
          src={user.avatarId ? (avatars.filter(avatar => avatar.id === user.avatarId)[0].img) : (avatars[0].img)}
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
      <Grid item flex={7}>
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
            sx={{ marginTop: 6, marginRight: 2 }}
            onClick={handleSubmit}
          >
            save
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

export default UserInfoPage;
