import React, { useState, useEffect } from 'react';
import './style.scss';
import Searchbar from '@/components/Searchbar';
import Button from '@/components/Button';
import { MdAssignmentAdd, MdEdit, MdDelete } from 'react-icons/md';
import { FaTrashAlt } from "react-icons/fa";
import { GrTask } from "react-icons/gr";
import { IoFilter } from 'react-icons/io5';
import AddModal from '@/components/AddModal';
import EditModal from '@/components/EditModal';
import TagDropdown from '@/components/TagDropdown'; 

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Add state for search query

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  const handleAddTask = (newTask) => {
    const taskWithCompletion = { ...newTask, id: Date.now() }; // Add unique ID
    const updatedTasks = [...tasks, taskWithCompletion];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setIsModalOpen(false);
  };

  const handleEditTask = (updatedTask) => {
    const updatedTasks = tasks.map((task, i) =>
      i === editingTaskIndex ? updatedTask : task
    );
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

  const handleCheckboxChange = (taskId) => {
    console.log(`Checkbox toggled for taskId: ${taskId}`);
    
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        console.log(taskId)
        const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
        console.log(`Updating task ${taskId} from ${task.status} to ${newStatus}`);
        return { ...task, status: newStatus };
      }
      return task;
    });
  
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleMarkAllDone = () => {
    const updatedTasks = tasks.map(task => ({ ...task, status: 'Completed' }));
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleDeleteAllTasks = () => {
    setTasks([]);
    localStorage.setItem('tasks', JSON.stringify([]));
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

  const handleTagClick = (tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const tags = ['Work', 'Personal', 'Urgent', 'Home', 'Projects'];

  const pendingTasks = tasks.filter(task => task.status === 'Pending');
  const completedTasks = tasks.filter(task => task.status === 'Completed');

  const filteredPendingTasks = pendingTasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompletedTasks = completedTasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <div className="task-upper-navbar">
        <div className="welcome-texts">
          <p>Welcome,</p>
          <p>User</p>
        </div>
        <Searchbar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
      <div className="task-body">
        <div className="upper-navigation">
          <div className="current-date-container">
            <p className="month">April</p>
            <p>Today is Saturday, April 6th, 2024</p>
          </div>
          <div className="task-upper-buttons">
            <Button color="purple">
              <IoFilter className="button-icon filter-icon" />
              <span>Sort by</span>
            </Button>
            <TagDropdown tags={tags} selectedTags={selectedTags} onTagClick={handleTagClick} />
            <Button onClick={handleMarkAllDone} color="orange">
              <GrTask className="button-icon" />
              <span>Mark all done</span>
            </Button>
            <Button onClick={handleDeleteAllTasks} color="orange">
              <FaTrashAlt className="button-icon trash" />
              <span>Delete all tasks</span>
            </Button>
            <Button onClick={handleOpenModal} color="orange">
              <MdAssignmentAdd className="button-icon" />
              <span>Create task</span>
            </Button>
          </div>
        </div>
        <div className="tasks-compilation">
          <div className="tasks-list pending">
            <h3>Pending</h3>
            {filteredPendingTasks.map((task, i) => (
              <div
                key={`pending ${i}`} 
                className={`task-card ${task.status === 'Completed' ? 'Completed' : ''}`}
              >
                <div className="task-card-content">
                  <input
                    type="checkbox"
                    checked={task.status === 'Completed'}  // Bind checkbox state to task status
                    onChange={() => handleCheckboxChange(task.id)}  // Pass unique ID
                  />
                  <h3 className={task.status === 'Completed' ? 'completed-text' : ''}>{task.title}</h3>
                  <p className={task.status === 'Completed' ? 'completed-text' : ''}>Due: {task.dueDate}</p>
                  <div className="tags-container">
                    {task.tags.map((tag, i) => (
                      <div key={i} className="tag-item">{tag}</div>
                    ))}
                  </div>
                  <p className={task.status === 'Completed' ? 'completed-text' : ''}>{task.description}</p>
                </div>
                <div className="task-card-actions">
                  <Button onClick={() => handleOpenEditModal(i)} color="purple">
                    <MdEdit className="action-icon" />
                  </Button>
                  <Button onClick={() => handleDeleteTask(i)} color="orange">
                    <MdDelete className="action-icon" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="tasks-list completed">
            <h3>Completed</h3>
            {filteredCompletedTasks.map((task, index) => (
              <div
                key={`completed ${index}`}  // Use unique id if available, else fallback to index
                className={`task-card ${task.status === 'Completed' ? 'Completed' : ''}`}
              >
                <div className="task-card-content">
                  <input
                    type="checkbox"
                    checked={task.status === 'Completed'}
                    onChange={() => handleCheckboxChange(task.id)}
                  />
                  <h3 className={task.status === 'Completed' ? 'completed-text' : ''}>{task.title}</h3>
                  <p className={task.status === 'Completed'? 'completed-text' : ''}>Due: {task.dueDate}</p>
                  <div className="tags-container">
                    {task.tags.map((tag, i) => (
                      <div key={i} className="tag-item">{tag}</div>
                    ))}
                  </div>
                  <p className={task.status === 'Completed' ? 'completed-text' : ''}>{task.description}</p>
                </div>
                <div className="task-card-actions">
                  <Button onClick={() => handleOpenEditModal(index)} color="purple">
                    <MdEdit className="action-icon" />
                  </Button>
                  <Button onClick={() => handleDeleteTask(index)} color="orange">
                    <MdDelete className="action-icon" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
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
