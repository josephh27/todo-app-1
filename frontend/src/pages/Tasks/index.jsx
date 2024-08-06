import React, { useState, useEffect } from 'react';
import './style.scss';
import Searchbar from '@/components/Searchbar';
import Button from '@/components/Button';
import { MdAssignmentAdd, MdEdit, MdDelete } from 'react-icons/md';
import { IoFilter } from 'react-icons/io5';
import AddModal from '@/components/AddModal';
import EditModal from '@/components/EditModal';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]); // Change to array for multiple selections

  useEffect(() => {
    // Load tasks from local storage on component mount
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  const handleAddTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setIsModalOpen(false);
  };

  const handleEditTask = (updatedTask) => {
    const updatedTasks = tasks.map((task, i) => (i === editingTaskIndex ? updatedTask : task));
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setIsEditModalOpen(false);
    setEditingTaskIndex(null);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenEditModal = (index) => {
    setEditingTaskIndex(index);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditingTaskIndex(null);
    setIsEditModalOpen(false);
  };

  // Update tag click handler to support multiple selections
  const handleTagClick = (tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag) // Remove tag if already selected
        : [...prevSelectedTags, tag] // Add tag if not selected
    );
  };

  return (
    <div>
      <div className="task-upper-navbar">
        <div className="welcome-texts">
          <p>Welcome,</p>
          <p>User</p>
        </div>
        <Searchbar />
      </div>
      <div className="task-body">
        <div className="upper-navigation">
          <div className="current-date-container">
            <p className="month">April</p>
            <p>Today is Saturday, April 6th, 2024</p>
          </div>
          <div className="task-tags-container">
            {['Work', 'Personal', 'Urgent', 'Home', 'Projects'].map((tag) => (
              <div
                key={tag}
                className={`tag-item ${selectedTags.includes(tag) ? 'selected' : ''}`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
          <div className="task-upper-buttons">
            <Button>
              <IoFilter className="button-icon filter-icon" />
              <span>Filters</span>
            </Button>
            <Button onClick={handleOpenModal}>
              <MdAssignmentAdd className="button-icon" />
              <span>Create task</span>
            </Button>
          </div>
        </div>
        <div className="tasks-list">
          {tasks.map((task, index) => (
            <div key={index} className="task-card">
              <div className="task-card-content">
                <h3>{task.title}</h3>
                <p>Due: {task.dueDate}</p>
                <div className="tags-container">
                  {task.tags.map((tag, i) => (
                    <div key={i} className="tag-item">{tag}</div>
                  ))}
                </div>
                <p>{task.description}</p>
              </div>
              <div className="task-card-actions">
                <Button onClick={() => handleOpenEditModal(index)}>
                  <MdEdit className="action-icon" />
                </Button>
                <Button onClick={() => handleDeleteTask(index)}>
                  <MdDelete className="action-icon" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleAddTask}
      />
      {editingTaskIndex !== null && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSave={handleEditTask}
          task={tasks[editingTaskIndex]}
        />
      )}
    </div>
  );
};

export default Tasks;
