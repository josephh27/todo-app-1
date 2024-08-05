import React from 'react'
import './style.scss'

const Sidebar = () => {
  return (
    <>
    <div className="sidebar close">

        <ul className="nav-links">
            <li>
                <a href="#">
                <i className='bx bx-grid-alt' ></i>
                <span className="link_name">Dashboard</span>
                </a>
                <ul className="sub-menu blank">
                <li><a className="link_name" href="#">Category</a></li>
                </ul>
            </li>       
            <li>
            <a href="#">
            <i class='bx bx-cog' ></i>
            <span class="link_name">Setting</span>
            </a>
            <ul class="sub-menu blank">
            <li><a class="link_name" href="#">Setting</a></li>
            </ul>
        </li>
    </ul>
  </div>
  <section className="home-section">
    <div className="home-content">
      <i className='bx bx-menu' ></i>
      <span className="text">Drop Down Sidebar</span>
    </div>
  </section>
</>
  )
}

export default Sidebar