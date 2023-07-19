import { Typography } from "@mui/material";
import AuthService from "../../app/services/auth.service";
import UserServcice from "../../app/services/user.service";
import { useEffect, useState } from "react";

function ProfilePage() {
  const user = AuthService.getUser();
  console.log(user);
  const [content, setContent] = useState('');

  useEffect(() => {
    UserServcice.getAdminContent().then((data) => {
      setContent(data);
      console.log(data);
    })
  }, [])

  return (
    <>
      <Typography variant="h5">Welcome, {user.username}!</Typography>
      <Typography>{content}</Typography>
    </>
  );
}

export default ProfilePage;
