import React, { useState } from 'react';
import './subtask.css';

import { FaTasks } from "react-icons/fa";

const SubTask = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'add course description modals', completed: false, assignee: 'John Doe' },
    { id: 2, title: 'filtering courses based on rates', completed: false, assignee: 'Jane Smith' },
    { id: 3, title: 'add pagination to courses list', completed: false, assignee: 'Alice Johnson' },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleToggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: tasks.length + 1,
        title: newTaskTitle,
        completed: false,
        assignee: 'Unassigned'
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="subtasks-container">
      <div className="header">
        <FaTasks className="icon"/>
        <h6>Subtasks</h6>
      </div>
      <div className="progress-bar">
        <div 
          className="progress"
          style={{ width: `${(tasks.filter(task => task.completed).length / tasks.length) * 100}%` }}
        ></div>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => handleToggleTask(task.id)} 
            />
            <span className={task.completed ? 'completed' : ''}>{task.title}</span>
            <span className="assignee">{task.assignee}</span>
            <button className="delete-task-button" onClick={() => handleDeleteTask(task.id)}>X</button>
          </li>
        ))}
      </ul>
      <div className="add-subtask">
        <input 
          type="text" 
          placeholder="Add an item" 
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
    </div>
  );
};

export default SubTask;
