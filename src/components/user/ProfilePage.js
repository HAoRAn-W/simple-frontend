import { Typography } from "@mui/material";
import AuthService from "../../app/services/auth.service";
import UserServcice from "../../app/services/user.service";
import { useEffect, useState } from "react";
import { SUCCESSFUL } from "../../app/constants/MessageCode";

function ProfilePage() {
  const user = AuthService.getUser();
  const [content, setContent] = useState("");

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
