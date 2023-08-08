import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const MainDiv = styled.div((props) => ({
  display: "flex",
  flexDirection: "column",
  [props.theme.breakpoints.up("lg")]: {
    flexDirection: "row",
  },
}));

export const PostListDiv = styled.div(
  (props) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${props.theme.breakpoints.up("lg")} {
      flex-direction: row;
      justify-content: flex-end;
      flex: 7;
    }
  `
);

export const SidebarDiv = styled.div(
  (props) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    ${props.theme.breakpoints.up("lg")} {
      justify-content: flex-start;
      flex: 3;
    }
  `
);
