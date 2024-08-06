import React from 'react'
import './style.scss'

import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  return (
    <div className="search">
        <input type="text" className="searchTerm" placeholder="Search for a task title..."></input>
        <button type="submit" className="searchButton">
            <i className="fa fa-search custom-search"><FaSearch /></i>
        </button>
    </div>
  )
}

export default Searchbar