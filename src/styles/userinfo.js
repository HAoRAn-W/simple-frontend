import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const AvatarImg = styled.img(
  (props) =>
    css`
      width: 280px;
      height: 280px;
      border-radius: 50%;
      position: relative;
      top: 0;
      ${props.theme.breakpoints.down("md")} {
        width: 160px;
        height: 160px;
      }
    `
);
