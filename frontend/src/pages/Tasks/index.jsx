import React from 'react'
import './style.scss'

import Searchbar from '@/components/Searchbar'

const Tasks = ({ expandSidebar, toggleSidebar }) => {
  return (
    <div>
      <div className="task-upper-navbar">
        <div className="welcome-texts">
          <p>Welcome,</p>
          <p>User</p>
        </div>
        <Searchbar />
      </div>
    </div>
  )
}

export default Tasks