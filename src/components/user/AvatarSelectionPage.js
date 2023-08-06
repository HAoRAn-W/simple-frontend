import React, { useState } from "react";
import avatars from "../avatar/avatars";
import Image from "mui-image";
import {
  Box,
  Button,
  ButtonBase,
  Grid,
  Typography,
} from "@mui/material";
import UserServcice from "../../app/services/user.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";
function AvatarSelectionPage({ user }) {
  const [avatarId, setAvatarId] = useState(user.avatarId);
  const [originalAvatarId, setOriginalAvatarId] = useState(user.avatarId);

  const handleClick = (id) => {
    setAvatarId(id);
  };

  const handleSubmit = () => {
    UserServcice.updateInfo({
      username: user.username,
      email: user.email,
      avatarId: avatarId,
    }).then((data) => {
      if (data.code === SUCCESSFUL) {
        UserServcice.refresh();
        setOriginalAvatarId(avatarId);
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box
        style={{
          flex: 5,
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
        paddingRight={6}
      >
        <img
          src={
            avatarId
              ? avatars.filter((avatar) => avatar.id === avatarId)[0].img
              : avatars[0].img
          }
          style={{
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            position: "relative",
            top: 0,
          }}
          alt="avatar"
        />
        {originalAvatarId !== avatarId && (
          <Button
            variant="contained"
            type="submit"
            sx={{ marginTop: 6, marginRight: 2 }}
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
        {avatars.map((ava) => (
          <Grid
            item
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ButtonBase
              sx={{ borderRadius: "50%" }}
              onClick={() => handleClick(ava.id)}
            >
              <Image
                src={ava.img}
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
    </Box>
  );
}

export default AvatarSelectionPage;

// The "Too many re-renders" error occurs because the `onClick` handler for the `ButtonBase` is being called immediately when the component renders. This happens because you are calling the `handleClick` function directly inside the `onClick` prop, instead of passing a function reference. As a result, every time the component renders, `handleClick(ava.id)` is executed, which in turn updates the state and causes a re-render, leading to an infinite loop.

// To fix this issue, you should pass a function reference to the `onClick` prop so that it gets called only when the button is clicked, not during the initial rendering.

// By making this change and passing a function reference `() => handleClick(ava.id)` to the `onClick` prop, the `handleClick` function will only be called when the button is clicked, not during the initial rendering, and the "Too many re-renders" error will be resolved.
