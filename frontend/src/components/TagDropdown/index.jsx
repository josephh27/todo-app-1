import React, { useState } from 'react';
import Button from '@/components/Button';
import { IoMdArrowDropdown } from 'react-icons/io';
import './style.scss';

const TagsDropdown = ({ tags, selectedTags, onTagClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  return (
    <div className="tags-dropdown">
      <Button onClick={toggleDropdown} className="dropdown-button" color="purple">
        <span>Tags</span>
        <IoMdArrowDropdown className={`dropdown-icon ${isOpen ? 'open' : ''}`} />
      </Button>
      {isOpen && (
        <div className="dropdown-menu-custom">
          {tags.map(tag => (
            <div
              key={tag}
              className={`tag-item ${selectedTags.includes(tag) ? 'selected' : ''}`}
              onClick={() => onTagClick(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsDropdown;
