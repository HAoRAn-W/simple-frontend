import {
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import AuthService from "../../app/services/auth.service";
import { useState } from "react";
import AvatarSelectionPage from "./AvatarSelectionPage";
import UserInfoPage from "./UserInfoPage";

function ProfilePage() {
  const user = AuthService.getUser();

  const [section, setSection] = useState("info");
  const handleChange = (event, newSection) => {
    setSection(newSection);
  };
  const control = {
    value: section,
    onChange: handleChange,
    exclusive: true,
  };

  return (
    <div style={{ height: "100vh", display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <ToggleButtonGroup {...control} sx={{ marginTop: 6 }}>
        <ToggleButton value={"info"} key="info">
          <Typography>Info</Typography>
        </ToggleButton>
        <ToggleButton value={"avatar"} key="avatar">
          <Typography>Avatar</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
      {section === 'info' ? (<UserInfoPage user={user}/>) : (<AvatarSelectionPage user={user}/>)}
    </div>
  );
}

export default ProfilePage;
