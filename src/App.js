import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import TodoEditor from './components/TodoEditor';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  const [todos, setTodos] = useState([]);
  const [isEditorVisible, setEditorVisible] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);  
  const editorRef = useRef(null);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo) => {
    const timestamp = new Date().toLocaleString();
    const todo = { id: Date.now(), ...newTodo, timestamp };
    setTodos([todo, ...todos]);
    setEditorVisible(false);  
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (updatedTodo) => {
    setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
    setEditorVisible(false);
  };

  const toggleTodoEditor = (todo = null) => {
    setCurrentTodo(todo); 
    setEditorVisible(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editorRef.current && !editorRef.current.contains(event.target)) {
        setEditorVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <Header onAddTodo={() => toggleTodoEditor()} /> {/* Updated to pass onAddTodo */}
      {isEditorVisible && (
        <TodoEditor
          onSave={currentTodo ? editTodo : addTodo}
          innerRef={editorRef}
          todo={currentTodo}
        />
      )}

      <div className="todo-container">
        <p>All Todos</p>
        <div className="todos-list">
          {todos.map((todo) => (
            <div key={todo.id} className="todo-card">
              <h2>{todo.title}</h2>
              <p>{todo.content}</p>
              <span>{todo.timestamp}</span>
              <div className="todo-btns">
                <button className="del" onClick={() => deleteTodo(todo.id)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
                <button className="edit" onClick={() => toggleTodoEditor(todo)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
