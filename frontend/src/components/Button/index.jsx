import React from 'react'
import './style.scss'

const Button = ({ children, onClick, color }) => {
  return (
    <div className={`task-custom-button ${color}`} onClick={onClick}>   
        {children}
    </div>
  )
}

export default Button