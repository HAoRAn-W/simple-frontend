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
  width: 100%;
`;

export const LogoTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontStyle: 'italic',
  [theme.breakpoints.up('xs')]: {
    fontSize: '25px', // Font size for screens 'sm' and above
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '28px', // Font size for screens 'sm' and above
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '30px', // Font size for screens 'md' and above
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '40px', // Font size for screens 'lg' and above
  },
}));

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
