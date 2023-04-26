import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SearchBar() {

    const navigate = useNavigate();
    
    const [searchInput, setSearchInput] = useState('');

    function handleInputChange(e) {
        setSearchInput(e.target.value);
    }

    return (
        <>
            <form onSubmit={(() => {
                const path = './search/' + searchInput.trim().toLowerCase();
                navigate(path);
            })}>
                <input 
                    className='search-bar hover-grow grow-less orange-hover-glow'
                    onChange={handleInputChange}
                    placeholder='Search by tag (e.g. "football")'
                    type='text'
                    value={searchInput}
                />
            </form>
            <Link
                className='submit-search'
                to={`./search/${searchInput.trim().toLowerCase()}`}
            >
                Search
            </Link>
        </>
    )
}