import React from 'react'
import './style.scss'

const Button = ({ children, onClick }) => {
  return (
    <div className="task-custom-button" onClick={onClick}>   
        {children}
    </div>
  )
}

export default Button