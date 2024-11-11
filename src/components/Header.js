import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import './Header.css';

function Header({ onAddTodo }) {
    return (
      <header className="header">
        <h1 className="title">TodoNest</h1> {/* Updated title to reflect Todo list theme */}
        <div className="search-container">
          <div className="search-bar">
            <input type="text" placeholder="Search" className="search-input" />
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </div>
          <button className="add-button" onClick={onAddTodo}> {/* Renamed handler to onAddTodo */}
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className="profile-icon" />
      </header>
    );
}

export default Header;
