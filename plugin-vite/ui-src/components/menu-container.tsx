import { styled } from "@mui/material/styles";
import React from "react";

const MainContainer = styled('div')`
  padding: 0px 0px 16px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  > div {
    display: flex;
    flex-direction: row;
    gap: 16px;
  }
`;

export default function CustomIconButton(props: any) {
  return <MainContainer {...props} />;
}