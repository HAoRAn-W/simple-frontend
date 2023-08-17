import React, { useEffect, useState } from "react";
import Image from "mui-image";
import { Box, Button, ButtonBase, Container, Grid, Typography } from "@mui/material";
import UserServcice from "../../app/services/user.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";
import AvatarService from "../../app/services/avatar.service";
function AvatarSelectionPage({ user }) {
  const defaultAvatar = { id: 0, name: "default", url: "./avatars/cloud.jpg" };

  const [avatar, setAvatar] = useState(defaultAvatar);
  const [oldAvatar, setOldAvatar] = useState(defaultAvatar);

  const [avatarList, setAvatarList] = useState([]);

  useEffect(() => {
    AvatarService.getAvatarList().then((data) => {
      setAvatarList(data.avatars);
    });
    if (user.avatar) {
      setAvatar(user.avatar);
      setOldAvatar(user.avatar);
    }
  }, [user]);

  const handleClick = (avatar) => {
    setAvatar(avatar);
  };

  const handleSubmit = () => {
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
  };

  return (
    <Container
      sx={{
        paddingTop: 4,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box
        style={{
          flex: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        paddingRight={6}
      >
        <img
          src={avatar.url}
          style={{
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            position: "relative",
            top: 0,
          }}
          alt="avatar"
        />
        {oldAvatar !== avatar && (
          <Button
            variant="contained"
            type="submit"
            sx={{ marginTop: 6}}
            onClick={handleSubmit}
          >
            save
          </Button>
        )}
      </Box>
      <Grid
        container
        flex={7}
        spacing={6}
        sx={{ maxHeight: "80vh", overflowY: "scroll" }}
        marginTop={0}
        paddingBottom={2}
      >
        {avatarList.map((ava) => (
          <Grid
            key={ava.id}
            item
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ButtonBase
              sx={{ borderRadius: "50%" }}
              onClick={() => handleClick(ava)}
            >
              <Image
                src={ava.url}
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                }}
                alt="avatar"
              />
            </ButtonBase>
            <Typography fontSize={"1.5rem"}>{ava.name}</Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AvatarSelectionPage;

// The "Too many re-renders" error occurs because the `onClick` handler for the `ButtonBase` is being called immediately when the component renders. This happens because you are calling the `handleClick` function directly inside the `onClick` prop, instead of passing a function reference. As a result, every time the component renders, `handleClick(ava.id)` is executed, which in turn updates the state and causes a re-render, leading to an infinite loop.

// To fix this issue, you should pass a function reference to the `onClick` prop so that it gets called only when the button is clicked, not during the initial rendering.

// By making this change and passing a function reference `() => handleClick(ava.id)` to the `onClick` prop, the `handleClick` function will only be called when the button is clicked, not during the initial rendering, and the "Too many re-renders" error will be resolved.
