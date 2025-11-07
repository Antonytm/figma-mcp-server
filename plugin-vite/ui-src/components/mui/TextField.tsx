import { styled } from '@mui/material/styles';
import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
//--figma-color-bg-brand-hover
const StyledITextField = styled(TextField)`
div.MuiInputBase-root{
  background-color: var(--figma-color-bg);
  color: var(--figma-text);
  height: 32px;
  border-radius: 2px;
  input {
    background-color: var(--figma-color-bg);
    font-size: 11px;
    line-height: 14px;
  }

  
}
div.Mui-focused{
  .MuiOutlinedInput-notchedOutline {
    border-color: var(--figma-color-bg-brand-hover);
  }
}

`;

export default function CustomTextField(props: TextFieldProps) {
  return <StyledITextField {...props} />;
}