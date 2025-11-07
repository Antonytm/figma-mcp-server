import { styled } from "@mui/material/styles";
import React from "react";

const MainContainer = styled('div')`
  padding: 16px 16px 16px 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
  >div:first-child {
    flex-grow: 0;
  }
  >div:last-child {
    flex-grow: 4;
  }
`;

export default function CustomIconButton(props: any) {
  return <MainContainer {...props} />;
}