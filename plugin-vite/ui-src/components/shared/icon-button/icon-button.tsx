import styles from './icon-button.module.scss'
import React, { useCallback } from 'react'

export type IconButtonProps = {
  children: any
  disabled?: boolean
  onClick?: any
  propagateEscapeKeyDown?: boolean
}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  disabled = false,
  onClick,
  propagateEscapeKeyDown = true,
  ...rest
}) => {
  const handleKeyDown = useCallback(
    function (event: any): void {
      if (event.key !== 'Escape') {
        return
      }
      if (propagateEscapeKeyDown === false) {
        event.stopPropagation()
      }
      event.currentTarget.blur()
    },
    [propagateEscapeKeyDown]
  )

  return (
    <button
      {...rest}
      className={styles.iconButton}
      disabled={disabled === true}
      onClick={disabled === true ? undefined : onClick}
      onKeyDown={disabled === true ? undefined : handleKeyDown}
      tabIndex={disabled === true ? -1 : 0}
    >
      <div className={styles.icon}>{children}</div>
    </button>
  )
}

export default IconButton;