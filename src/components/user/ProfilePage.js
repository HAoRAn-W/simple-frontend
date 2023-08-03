import { ButtonBase, Paper, Stack, Typography } from "@mui/material";
import AuthService from "../../app/services/auth.service";
import avatars from "../avatar/avatar";
import Image from "mui-image";

function ProfilePage() {
  const user = AuthService.getUser();

  // useEffect(() => {

  // }, []);

  return (
    <div style={{ height: "100vh" }}>
      <Typography variant="h5">Welcome, {user.username}!</Typography>
      <Stack
        spacing={{ xs: 1, sm: 3 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        {avatars.map((ava) => (
          <ButtonBase sx={{borderRadius: '50%'}}>
            <Image
              src={ava.img}
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
              alt="avatar"
            />
          </ButtonBase>
        ))}
      </Stack>
    </div>
  );
}

export default ProfilePage;
