import React from 'react'
import './style.scss'

const Searchbar = () => {
  return (
    <div>
        <div className="search">
            <input type="text" className="searchTerm" placeholder="Search for a task title..."></input>
            <button type="submit" className="searchButton">
                <i className="fa fa-search"></i>
            </button>
        </div>
    </div>
  )
}

export default Searchbar