import React, { useState } from 'react';
import './TodoEditor.css';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TodoEditor({ onSave, innerRef, todo }) {
  const [title, setTitle] = useState(todo?.title || '');
  const [items, setItems] = useState(todo?.items || []);
  const [currentItem, setCurrentItem] = useState('');

  // Add item on Enter key press
  const handleAddItem = (e) => {
    if (e.key === 'Enter' && currentItem.trim()) {
      setItems([...items, { text: currentItem, completed: false }]);
      setCurrentItem('');
    }
  };

  // Toggle completion of an item
  const toggleItemCompletion = (index) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    // Filter out completed items
    setItems(updatedItems.filter(item => !item.completed));
  };

  // Save the to-do list
  const handleSave = () => {
    if (title.trim() && items.length > 0) {
      onSave({ title, items });
      setTitle('');
      setItems([]);
    }
  };

  return (
    <div className="todo-editor-overlay">
      <div ref={innerRef} className="todo-editor">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="todo-title"
        />
        
        <ul className="todo-items">
          {items.map((item, index) => (
            <li key={index} className="todo-item">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleItemCompletion(index)}
              />
              <span className={item.completed ? 'completed' : ''}>
                {item.text}
              </span>
            </li>
          ))}
        </ul>
        
        <input
          type="text"
          placeholder="Add a to-do item and press Enter"
          value={currentItem}
          onChange={(e) => setCurrentItem(e.target.value)}
          onKeyDown={handleAddItem}
          className="todo-input"
        />
        
        <button onClick={handleSave} className="save-button">
          <FontAwesomeIcon icon={faCheck} /> Save
        </button>
      </div>
    </div>
  );
}

export default TodoEditor;
