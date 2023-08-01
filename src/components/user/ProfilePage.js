import { Typography } from "@mui/material";
import AuthService from "../../app/services/auth.service";

function ProfilePage() {
  const user = AuthService.getUser();

  // useEffect(() => {

  // }, []);

  return (
    <>
      <Typography variant="h5">Welcome, {user.username}!</Typography>
      {/* <Typography>{content}</Typography> */}
    </>
  );
}

export default ProfilePage;
