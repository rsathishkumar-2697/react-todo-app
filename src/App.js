import React, { useState, useEffect } from 'react';
import './App.css';

const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/users/1/todos';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    // Fetch initial todos from the API
    fetch(API_ENDPOINT)
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newTodo = {
        id: todos.length + 1,
        title: newTask,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setNewTask('');
    }
  };

  const handleToggleCompletion = id => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEditTask = (id, newTitle) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const handleDeleteTask = id => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const filteredTodos = showCompleted
    ? todos.filter(todo => todo.completed)
    : todos;

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter new task"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div>
        <label>
          Show Completed
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
          />
        </label>
      </div>
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
              onClick={() => handleToggleCompletion(todo.id)}
            >
              {todo.title}
            </span>
            <button onClick={() => handleEditTask(todo.id, prompt('Edit task:', todo.title))}>
              Edit
            </button>
            <button onClick={() => handleDeleteTask(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
