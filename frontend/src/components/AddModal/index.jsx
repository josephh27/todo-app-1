import React, { useState } from 'react';
import './style.scss';

const Modal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState('');

  const handleAddTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleSave = () => {
    if (title.trim()) {
      const newTask = { title, dueDate, tags, description };
      onSave(newTask);
      setTitle('');
      setDueDate('');
      setTags([]);
      setDescription('');
    }
  };

  return (
    isOpen ? (
      <div className="modal-overlay">
        <div className="custom-modal-content">
          <h2>Add Task</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Add tag"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddTag(e.target.value);
                e.target.value = '';
              }
            }}
          />
          <div className="tags-container">
            {tags.map((tag, index) => (
              <div key={index} className="tag-item">{tag}</div>
            ))}
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
          />
          <div className="modal-buttons">
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default Modal;
