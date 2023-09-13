import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const MainDiv = styled.div(
  (props) =>
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
      ${props.theme.breakpoints.up("md")} {
        flex-direction: row;
        align-items: flex-start;
      }
    `
);

export const PostListDiv = styled.div(
  (props) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    ${props.theme.breakpoints.up("lg")} {
      flex: 8;
    }
    ${props.theme.breakpoints.up("md")} {
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
      flex: 4;
    }
    ${props.theme.breakpoints.up("md")} {
      flex: 5;
    }
  `
);

export const PostCardImageDiv = styled.div(
  (props) => css`
    width: 40%;
    ${props.theme.breakpoints.down("md")} {
      width: 40%;
    }
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
    ${props.theme.breakpoints.down("md")} {
      width: 60%;
    }
    ${props.theme.breakpoints.down("sm")} {
      width: 100%;
    }
  `
);
