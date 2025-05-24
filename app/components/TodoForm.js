'use client';
import React, { useState, useEffect } from 'react';

function ShowIP() {
  const [ip, setIp] = useState('');

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setIp(data.ip))
      .catch(err => console.error('Failed to get IP:', err));
  }, []);
  return (
      <p>{ip || 'Loading...'}</p>
  );
}

function TodoForm() {
const [info, setInfo] = useState({
    deviceType: '',
    os: '',
    browser: '',
  });



  const [value, setValue] = useState('');
const [todos, setTodos] = useState([]);

useEffect(() => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }
}, []);

useEffect(() => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}, [todos]);


  useEffect(() => {
    const userAgent = navigator.userAgent;

    const isMobile = /Mobi|Android/i.test(userAgent);
    const isTablet = /Tablet|iPad/i.test(userAgent);
    let deviceType = 'Desktop';
    if (isMobile) deviceType = 'Mobile';
    if (isTablet) deviceType = 'Tablet';

    let os = 'Unknown OS';
    if (userAgent.indexOf('Win') !== -1) os = 'Windows';
    else if (userAgent.indexOf('Mac') !== -1) os = 'MacOS';
    else if (userAgent.indexOf('X11') !== -1) os = 'UNIX';
    else if (userAgent.indexOf('Linux') !== -1) os = 'Linux';
    else if (/Android/.test(userAgent)) os = 'Android';
    else if (/iPhone|iPad|iPod/.test(userAgent)) os = 'iOS';

    let browser = 'Unknown';
    if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Edg') === -1) browser = 'Chrome';
    else if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) browser = 'Safari';
    else if (userAgent.indexOf('Firefox') > -1) browser = 'Firefox';
    else if (userAgent.indexOf('Edg') > -1) browser = 'Edge';
    else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1) browser = 'Internet Explorer';

    setInfo({ deviceType, os, browser });
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === '') return alert('Please enter a task');
    addTodo(value); 
    setValue('');
  };

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos([...todos, newTodo]);
  };

const deleteTodo = (id) => {
  const newTodos = todos.filter(todo => todo.id !== id);
  setTodos(newTodos);
  localStorage.setItem('todos', JSON.stringify(newTodos));
};

const editTodo = (id) => {
  const todoToEdit = todos.find(todo => todo.id === id);
  if (!todoToEdit) return;

  const newText = prompt('Edit your task', todoToEdit.text);
  if (newText !== null && newText.trim() !== '') {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText.trim() } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }
};

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <>
    <div className='px-4'>
      <div className='bg-gradient-to-r from-orange-800 to-gray-950 xl:w-[900px] md:w-[700px] p-8 rounded-lg shadow-md max-w-md mx-auto'>
        <h1 className="text-4xl mb-10 text-gray-300 font-bold">Todo List</h1>
        <form className="flex flex-row gap-4" onSubmit={handleSubmit}>
          <div className='flex items-center gap-2 bg-gradient-to-r from-orange-800  to-gray-900 rounded-xl w-full'>
            <input
              onChange={(e) => setValue(e.target.value)}
              value={value}
              name="todo"
              type="text"
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 rounded-lg border bg-gradient-to-r from-orange-800 to-gray-950 border-orange-800 text-white focus:outline-none focus:ring-2"
            />
          </div>

          <button
            className='rounded-xl shadow-md px-5 py-2 bg-gradient-to-r from-orange-800 to-gray-950 text-white hover:bg-gray-800 transition-colors duration-200 w-full sm:w-auto'
            type='submit'
          >
            Add
          </button>

        </form>

        <div className='mt-6'>
          {todos.length === 0 ? (
            <p className="text-gray-400 m-2">No tasks added yet</p>
          ) : (
            todos.map((todo) => ( <>
              <div key={todo.id} className="flex items-center gap-4 mt-2 p-3 shadow-2xl bg-gradient-to-r from-orange-800 to-gray-950 rounded-xl text-white">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="w-5 h-5"
                />
        
                <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                  {todo.text}
                </span>

                <div className='flex gap-2 flex-col'>
                <button
             onClick={() => deleteTodo(todo.id)}
             className="ml-2 text-red-400 hover:text-red-600 transition-colors">Delete</button>
              
              <button className="ml-2 text-green-400 hover:text-green-600 transition-colors" 
                onClick={() => editTodo(todo.id)}

              > Edit </button>
                </div>
                
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{new Date(todo.createdAt).toLocaleString()}</p>
                </div>
              </>
            ))
          )}
        </div>
      </div>
    </div>
        <div className='flex flex-row gap-2 text-gray-500 '>

        <p> {info.deviceType}</p>
      <p>{info.os}</p>
      <p>{info.browser}</p>
      <span><ShowIP />
</span>
    </div>

    </>

  );
}

export default TodoForm;
