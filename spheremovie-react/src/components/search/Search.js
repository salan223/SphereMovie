import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Search.css';

const Search = ({ value, onChange, handleSearch, onClearSearch, placeholder }) => {
    return (
        <div className="search-bar-container">
            <input
                type="text"
                value={value}
                className="search-box"
                onChange={onChange}
                placeholder={placeholder || 'Search for trailers on this website'} // Use the placeholder prop
            />
            {value && (
                <FontAwesomeIcon
                    icon={faClose}
                    className="search-icon"
                    onClick={onClearSearch}
                />
            )}
            <FontAwesomeIcon
                className="search-icon"
                icon={faSearch}
                onClick={handleSearch}
            />
        </div>
    );
};

export default Search;
