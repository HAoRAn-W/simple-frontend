import styled from "@emotion/styled";
import { Grid, Toolbar, Typography, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontSize: 14,
    fontFamily: "Lato",
  },
});

export const HeaderBar = styled(Toolbar)`
  background-color: transparent;
  border-bottom: 2px solid whitesmoke;
  display: flex;
`;

export const LogoTypography = styled(Typography)`
  font-weight: bold;
  font-style: italic;
`;

export const LogoDiv = styled.div`
  display: flex;
  flex: 3;
  justify-content: flex-start;
  align-items: center;
`;

export const SectionGrid = styled(Grid)`
  flex: 6;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const SectionTypography = styled(Typography)`
  font-size: 1.5rem
`;

export default theme;
