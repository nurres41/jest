import React from 'react'

const Button = ({ onClick, children}) => {
    const handleOnClick = () => {
        onClick('Clicked')
    }
  return (
    <button onClick={handleOnClick}>
      {children}
    </button>
  )
}

export {Button}
