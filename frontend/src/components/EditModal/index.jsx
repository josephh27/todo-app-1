import React, { useEffect, useState } from 'react';
import './style.scss';

import Button from '@/components/Button'
import Alert from '@/components/Alert'

const EditModal = ({ isOpen, onClose, onSave, task }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const predefinedTags = ['Work', 'Personal', 'Urgent', 'Later', 'Important'];

  const handleAddTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleSave = () => {
    if (title.trim() && dueDate && description.trim()) {
      const updatedTask = { title, dueDate, tags, description, status };
      onSave(updatedTask);
      setTitle('');
      setDueDate('');
      setTags([]);
      setDescription('');
      setStatus('Pending');
      Alert("success", "Edit Successful", "The task detail has been edited!");            

    } else {
      Alert(
        "error",
        "Editing Failed",
        "Fill out all the input fields!"
      );    
    }
  };

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDueDate(task.dueDate);
      setTags(task.tags);
      setDescription(task.description);
      setStatus(task.status);
    } else {
      setTitle('');
      setDueDate('');
      setTags([]);
      setDescription('');
      setStatus('Pending');
    }
  }, [task]);

  return (
    isOpen ? (
      <div className="modal-overlay">
        <div className="custom-modal-content">
          <h2>Edit Task</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
          />
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={new Date().toISOString().slice(0, -8)}
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            onChange={(e) => handleAddTag(e.target.value)}
          >
            <option value="">Select a tag</option>
            {predefinedTags.map((tag, index) => (
              <option key={index} value={tag}>{tag}</option>
            ))}
          </select>
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
            <Button onClick={handleSave} color="purple">Save</Button>
            <Button onClick={onClose} color="orange">Cancel</Button>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default EditModal;
