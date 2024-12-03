import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import "./Search.css";

const Search = ({value, onChange, handleSearch, onClearSearch}) => {
    return (
        <>
            <div className='search-bar-container'>
                <input
                    placeholder='Search'
                    type='text'
                    value={value}
                    className='search-box'
                    onChange={onChange}
                        />

                {value && (<FontAwesomeIcon icon={faClose} className="search-icon" onClick={onClearSearch} />)}

                <FontAwesomeIcon className="search-icon" icon={faSearch} onClick={handleSearch}/>
            </div>
        </>
    )
}

export default Search
