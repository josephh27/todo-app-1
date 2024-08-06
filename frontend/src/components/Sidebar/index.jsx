import React, { useState } from 'react'
import './style.scss'

import { FaBookOpen } from "react-icons/fa6";
import { BiTask } from "react-icons/bi";
import { BiTaskX } from "react-icons/bi";

import NikeLogo from '@/assets/nike_logo.png'



const Sidebar = ({ expandSidebar, toggleSidebar }) => {
  return (
    <>
    <div className={`sidebar ${expandSidebar ? "" : "close"}`}>
        <div class="logo-details">
          <i class='bx bxl-c-plus-plus'><img src={NikeLogo} alt="Logo" className="header-logo" onClick={toggleSidebar}></img></i>
          <span class="logo_name">Just Do It.</span>
        </div>
        <ul className="nav-links">
          <li>
              <a href="#">
                <i class='bx bx-cog' ><FaBookOpen /></i>
                <span class="link_name">Tasks</span>
              </a>
              <ul class="sub-menu blank">
                <li><a class="link_name" href="#">Tasks</a></li>
              </ul>
            </li>
            <li>
              <a href="#">
                <i class='bx bx-cog' ><BiTask /></i>
                <span class="link_name">Completed</span>
              </a>
              <ul class="sub-menu blank">
                <li><a class="link_name" href="#">Completed</a></li>
              </ul>
            </li>
      </ul>
  </div>
</>
  )
}

export default Sidebar