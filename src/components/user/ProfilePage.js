import { Typography } from "@mui/material";

function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <Typography variant="h5">Welcome, {user.username}!</Typography>
    </>
  );
}

export default ProfilePage;
