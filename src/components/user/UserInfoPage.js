import {
  Button,
  Grid,
  TextField,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  Container,
  Box,
  ButtonBase,
  Typography,
  DialogActions,
} from "@mui/material";
import React, { useState } from "react";
import UserServcice from "../../app/services/user.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";
import AvatarService from "../../app/services/avatar.service";
import Image from "mui-image";

function UserInfoPage({ user }) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [originalUsername, setOriginalUsername] = useState(user.username);
  const [originalEmail, setOriginalEmail] = useState(user.email);

  const defaultAvatar = { id: 0, name: "default", url: "./avatars/cloud.jpg" };

  const [avatar, setAvatar] = useState(defaultAvatar);
  const [oldAvatar, setOldAvatar] = useState(defaultAvatar);

  const [avatarList, setAvatarList] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleOpenDialog = () => {
    setDialogOpen(true);
    AvatarService.getAvatarList().then((data) => {
      setAvatarList(data.avatars);
    });
    if (user.avatar) {
      setAvatar(user.avatar);
      setOldAvatar(user.avatar);
    }
  };

  const handleCancelDialog = () => {
    setDialogOpen(false);
  };

  const handleSelectAvatar = (avatar) => {
    setAvatar(avatar);
  };

  const handleSubmitAvatar = () => {
    UserServcice.updateInfo({
      username: user.username,
      email: user.email,
      avatarId: avatar.id,
    }).then((data) => {
      if (data.code === SUCCESSFUL) {
        UserServcice.refresh();
        setOldAvatar(avatar);
      }
    });
    setDialogOpen(false);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          marginTop: 6,
          paddingX: "20%",
        }}
      >
        <Grid
          item
          sx={{
            flex: { md: 6, xs: 12 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
          <Button onClick={handleOpenDialog} sx={{ fontSize: "1.2rem" }}>
            Edit
          </Button>
        </Grid>
        <Grid item flexDirection={"column"} sx={{ flex: { md: 6, xs: 12 } }}>
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
          <Grid item xs>
            <Link href="/resetpassword" variant="body1" underline="none">
              Reset Password
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={dialogOpen} sx={{ minWidth: "50vw" }} maxWidth="lg">
        <DialogTitle>Edit avatar</DialogTitle>
        <DialogContent>
          <Paper
            sx={{
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            elevation={0}
          >
            <Container>
              <Grid
                container
                spacing={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {avatarList.map((ava) => (
                  <Grid
                    key={ava.id}
                    item
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <ButtonBase
                        onClick={() => handleSelectAvatar(ava)}
                        sx={{ borderRadius: "50%" }}
                      >
                        <Image
                          src={ava.url}
                          style={{
                            width: "120px",
                            height: "120px",
                            borderRadius: "50%",
                          }}
                          alt="avatar"
                        />
                      </ButtonBase>
                      <Typography fontSize={"1.5rem"}>{ava.name}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDialog}>Cancel</Button>
          <Button disabled={oldAvatar === avatar} onClick={handleSubmitAvatar}>
            Select
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserInfoPage;
