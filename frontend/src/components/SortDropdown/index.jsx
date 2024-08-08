import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import './style.scss';

import { IoMdArrowDropdown } from 'react-icons/io';

const SortDropdown = ({ sortCategories, selectedSortBy, onSortClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  useEffect(() => {
    console.log(selectedSortBy)
  }, [selectedSortBy]) 

  return (
    <div className="tags-dropdown">
      <Button onClick={toggleDropdown} className="dropdown-button" color="purple">
        <span>Sort By</span>
        <IoMdArrowDropdown className={`dropdown-icon ${isOpen ? 'open' : ''}`} />
      </Button>
      {isOpen && (
        <div className="dropdown-menu-custom">
          {sortCategories.map(category => (
            <div
              key={category}
              className={`tag-item ${selectedSortBy === category ? 'selected' : ''}`}
              onClick={() => onSortClick(category)} 
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
