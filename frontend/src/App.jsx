import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Tasks from "@/pages/Tasks/"

import Header from "@/components/Header/"
import Sidebar from "@/components/Sidebar/"

function App() {
  const [expandSidebar, setExpandSidebar] = useState(false)
  
  const toggleSidebar = () => {
    setExpandSidebar(!expandSidebar)
  }

  return (
    <>
      <BrowserRouter>
        <Sidebar expandSidebar={expandSidebar} toggleSidebar={toggleSidebar} /> 
        <div className={`body-inner-container ${expandSidebar ? "move-body" : ""}`} >
          <Routes>
              <Route path="/" element={<Tasks />}></Route>
          </Routes>
        </div>
      </BrowserRouter>  
    </>
  )
}

export default App
