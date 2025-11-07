import React from 'react';
import { createClassName } from './../utilities/create-class-name';
import styles from './text.module.scss'

export type TextProps = {
  align?: TextAlignment
  children: any
  numeric?: boolean
}
export type TextAlignment = 'left' | 'center' | 'right'

const Text: React.FC<TextProps> = ({
  align = 'left',
  children,
  numeric = false,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={createClassName([
        styles.text,
        styles[align],
        numeric === true ? styles.numeric : null
      ])}
    >
      {children}
    </div>
  )
}

export default Text;