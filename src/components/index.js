import React from 'react'

const Button = ({children, variant = 'primary'}) => {
  return (
    <button variant={variant}>
      {children}
    </button>
  )
}

export default Button
