import styled from "@emotion/styled";
import { Grid, Toolbar, Typography } from "@mui/material";

export const HeaderBar = styled(Toolbar)`
  background-color: transparent;
  border-bottom: 2px solid whitesmoke;
  display: flex;
`;

export const LogoTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontStyle: 'italic',
  [theme.breakpoints.up('xs')]: {
    fontSize: '25px',
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '28px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '30px',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '40px',
  },
}));

export const LogoDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: ${(props) => props.flex || "auto"};
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