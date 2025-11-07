import { styled } from '@mui/material/styles';
import { IconButton, IconButtonProps } from '@mui/material';
import React from 'react';

const StyledIconButton = styled(IconButton)`
  border-radius: 0px;
  :hover {
    background-color: var(--figma-color-bg-hover);
  }
  :active {
    background-color: var(--figma-color-bg-brand);
  }
  .MuiTouchRipple-root{
    border-radius: 0px;
    .MuiTouchRipple-child{
      border-radius: 0px;
    }
  }
  
`;

export default function CustomIconButton(props: IconButtonProps) {
  return <StyledIconButton {...props} />;
}