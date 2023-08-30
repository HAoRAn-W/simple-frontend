import React, { useEffect, useRef, useState } from "react";
import AvatarService from "../../app/services/avatar.service";
import {
  Alert,
  Box,
  Button,
  ButtonBase,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import Image from "mui-image";
import { SUCCESSFUL } from "../../app/constants/MessageCode";

function EditAvatar() {
  const [avatarList, setAvatarList] = useState([]);

  const [isUpdate, setIsUpdate] = useState(false);
  const name = useRef(null);
  const avatarUrl = useRef(null);
  const [id, setId] = useState();

  const [openDialog, setOpenDialog] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    AvatarService.getAvatarList().then((data) => {
      setAvatarList(data.avatars);
    });
  }, []);

  const handleClick = (avatar) => {
    name.current.value = avatar.name;
    avatarUrl.current.value = avatar.url;
    setIsUpdate(true);
    setId(avatar.id);
  };

  const handleCancelDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    AvatarService.deleteAvatar(id).then((data) => {
      if (data.code === SUCCESSFUL) {
        setId();
        setIsUpdate(false);
        name.current.value = "";
        avatarUrl.current.value = "";
      } else {
        setIsError(true);
      }
    });
    setOpenDialog(false);
    name.current.value = "";
    avatarUrl.current.value = "";
    setIsUpdate(false);
    setId();
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <Container>
        <form>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input id="name" inputRef={name} fullWidth sx={{ marginBottom: 4 }} />
          <InputLabel htmlFor="avatarUrl">Avatar URL</InputLabel>
          <Input
            id="avatarUrl"
            inputRef={avatarUrl}
            fullWidth
            sx={{ marginBottom: 4 }}
          />
        </form>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            sx={{ marginX: "10px" }}
            variant="contained"
            onClick={() => {
              const newAvatar = {
                name: name.current.value,
                avatarUrl: avatarUrl.current.value,
              };
              if (isUpdate) {
                newAvatar.avatarId = id;
                AvatarService.updateAvatar(newAvatar).then((data) => {
                  if (data.code === SUCCESSFUL) {
                    setId();
                    setIsUpdate(false);
                    name.current.value = "";
                    avatarUrl.current.value = "";
                  } else {
                    setIsError(true);
                  }
                });
              } else {
                AvatarService.addAvatar(newAvatar).then((data) => {
                  if (data.code === SUCCESSFUL) {
                    setId();
                    setIsUpdate(false);
                    name.current.value = "";
                    avatarUrl.current.value = "";
                  } else {
                    setIsError(true);
                  }
                });
              }
            }}
          >
            {isUpdate ? "Update" : "Add"}
          </Button>
          {isUpdate && (
            <>
              <Button
                sx={{ marginX: "10px" }}
                variant="contained"
                onClick={() => {
                  setId();
                  setIsUpdate(false);
                  name.current.value = "";
                  avatarUrl.current.value = "";
                }}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  marginX: "10px",
                  backgroundColor: "#ef233c",
                  color: "white",
                }}
                variant="contained"
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                Delete
              </Button>
            </>
          )}
        </Box>
      </Container>
      {isError && (
        <Alert
          severity="error"
          onClose={() => {
            setIsError(false);
          }}
        >
          Failed
        </Alert>
      )}
      <Grid
        container
        spacing={6}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        marginTop={0}
        paddingBottom={2}
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
      <Dialog open={openDialog} onClose={handleCancelDialog}>
        <DialogTitle>Confirm delete category</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelDialog}>Cancel</Button>
          <Button
            sx={{
              backgroundColor: "#ef233c",
              color: "white",
            }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default EditAvatar;
