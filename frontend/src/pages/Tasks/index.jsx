import React, { useState, useEffect } from 'react';
import './style.scss';
import Searchbar from '@/components/Searchbar';
import Button from '@/components/Button';
import { MdAssignmentAdd, MdEdit, MdDelete } from 'react-icons/md';
import { FaTrashAlt } from "react-icons/fa";
import { GrTask } from "react-icons/gr";
import AddModal from '@/components/AddModal';
import EditModal from '@/components/EditModal';
import TagDropdown from '@/components/TagDropdown'; 
import SortDropdown from '@/components/SortDropdown'; 
import Alert from '@/components/Alert';
import Confirm from '@/components/Confirm';

const Tasks = () => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedSortBy, setSelectedSortBy] = useState('Due Date');
  const [searchQuery, setSearchQuery] = useState('');

  const now = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  const dateString = now.toLocaleDateString('en-US', options);

  const handleAddTask = (newTask) => {
    const taskWithCompletion = { ...newTask, id: Date.now() };
    const updatedTasks = [...tasks, taskWithCompletion];
    setTasks(updatedTasks);
    setIsModalOpen(false);
  };

  const handleEditTask = (updatedTask) => {
    const updatedTasks = tasks.map((task, i) =>
      i === editingTaskIndex ? updatedTask : task
    );
    setTasks(updatedTasks);
    setIsEditModalOpen(false);
    setEditingTaskIndex(null);
  };

  const handleDeleteTask = (index) => {
    Confirm(tasks, setTasks, index, 'deleteSingle')
  };

  const handleCheckboxChange = (taskId, status) => {
    if (status === 'pending') Alert("success", "Task Completed", "The task has been completed!");            
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleMarkAllDone = () => {
    const updatedTasks = tasks.map(task => ({ ...task, status: 'Completed' }));
    setTasks(updatedTasks);
    Alert("success", "Completion Successful", "All tasks have been completed!");            

  };

  const handleDeleteAllTasks = (index) => {
    Confirm(tasks, setTasks, index, 'deleteAll')
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

  const handleSortClick = (category) => {
    setSelectedSortBy(category);
  };

  const sortCategories = ['Due Date', 'Title'];
  const tags = ['Work', 'Personal', 'Urgent', 'Later', 'Important'];

  const sortTasks = (tasksList) => {
    return tasksList.slice().sort((a, b) => {
      if (selectedSortBy === 'Due Date') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (selectedSortBy === 'Title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const filterTasks = (tasksList) => {
    return sortTasks(
      tasksList.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedTags.length === 0 || task.tags.some(tag => selectedTags.includes(tag)))
      )
    );
  };

  const pendingTasks = filterTasks(tasks.filter(task => task.status === 'Pending'));
  const completedTasks = filterTasks(tasks.filter(task => task.status === 'Completed'));

  // useEffect(() => {
  //   const savedTasks = ;
  //   setTasks(savedTasks);
  //   setFullyLoaded(true);
  // }, []);

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
            <p className="month">{now.toLocaleString('en-US', { month: 'long' })}</p>
            <p>Today is {dateString}</p>
          </div>
          <div className="task-upper-buttons">
            <SortDropdown sortCategories={sortCategories} selectedSortBy={selectedSortBy} onSortClick={handleSortClick} />
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
            {pendingTasks.map((task, i) => (
              <div
                key={task.id} 
                className={`task-card ${task.status === 'Completed' ? 'Completed' : ''}`}
              >
                <div className="task-card-content">
                  <input
                    type="checkbox"
                    checked={task.status === 'Completed'}
                    onChange={() => handleCheckboxChange(task.id, 'pending')}
                  />
                  <h3 className={task.status === 'Completed' ? 'completed-text' : ''}>{task.title}</h3>
                  <div className="tags-container">
                    {task.tags.map((tag, i) => (
                      <div key={i} className="tag-item-display">{tag}</div>
                    ))}
                  </div>
                  <p className={`${task.status === 'Completed' ? 'completed-text' : ''} task-card-due`}>
                    Due: {new Date(task.dueDate).toLocaleString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric', 
                      hour: 'numeric', 
                      minute: 'numeric', 
                      hour12: true 
                    })}
                  </p>
                  <p className={task.status === 'Completed' ? 'completed-text' : ''}>Description: {task.description}</p>
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
            {completedTasks.map((task, index) => (
              <div
                key={task.id}
                className={`task-card ${task.status === 'Completed' ? 'Completed' : ''}`}
              >
                <div className="task-card-content">
                  <input
                    type="checkbox"
                    checked={task.status === 'Completed'}
                    onChange={() => handleCheckboxChange(task.id, 'completed')}
                  />
                  <h3 className={task.status === 'Completed' ? 'completed-text' : ''}>{task.title}</h3>
                  <div className="tags-container">
                    {task.tags.map((tag, i) => (
                      <div key={i} className="tag-item-display">{tag}</div>
                    ))}
                  </div>
                  <p className={task.status === 'Completed'? 'completed-text' : ''}>
                    Due: {new Date(task.dueDate).toLocaleString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric', 
                      hour: 'numeric', 
                      minute: 'numeric', 
                      hour12: true 
                    })}
                  </p>                  
                  <p className={task.status === 'Completed' ? 'completed-text' : ''}>Description: {task.description}</p>
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
