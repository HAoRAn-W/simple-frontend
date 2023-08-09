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
    gap: 1.5rem;
    padding-top: 1rem;
    ${props.theme.breakpoints.up("lg")} {
      align-items: flex-start;
      flex: 3;
    }
  `
);

export const PostCardImageDiv = styled.div(
  (props) => css`
    width: 40%;
    ${props.theme.breakpoints.down("sm")} {
      width: 0;
    }
  `
);

export const PostCardTextDiv = styled.div(
  (props) => css`
    display: flex;
    flex-direction: column;
    padding: 20px 20px 20px 20px;
    width: 60%;
    ${props.theme.breakpoints.down("sm")} {
      width: 100%;
    }
  `
);
