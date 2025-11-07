import LoadingIndicator from '../loading-indicator/loading-indicator'
import { createClassName } from '../utilities/create-class-name'
import styles from './button.module.scss'
import React, { useCallback } from 'react'


export type ButtonProps = {
  children: any
  danger?: boolean
  disabled?: boolean
  fullWidth?: boolean
  loading?: boolean
  onClick?: any
  propagateEscapeKeyDown?: boolean
  secondary?: boolean
}

const Button: React.FC<ButtonProps> = (
  {
    children,
    danger = false,
    disabled = false,
    fullWidth = false,
    loading = false,
    onClick,
    propagateEscapeKeyDown = true,
    secondary = false,
    ...rest
  }
) => {
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
    <div
      className={createClassName([
        styles.button,
        secondary === true ? styles.secondary : styles.default,
        danger === true ? styles.danger : null,
        fullWidth === true ? styles.fullWidth : null,
        disabled === true ? styles.disabled : null,
        loading === true ? styles.loading : null
      ])}
    >
      {loading === true ? (
        <div className={styles.loadingIndicator}>
          <LoadingIndicator />
        </div>
      ) : null}
      <button
        {...rest}
        disabled={disabled === true}
        onClick={disabled === true || loading === true ? undefined : onClick}
        onKeyDown={
          disabled === true || loading === true ? undefined : handleKeyDown
        }
        tabIndex={disabled === true ? -1 : 0}
      >
        <div className={styles.children}>{children}</div>
      </button>
    </div>
  )
}
