import React from 'react';

export default function SearchBar() {
    return (
        <>
            <input className='search-bar hover-grow grow-less orange-hover-glow' type='text' />
            <span className='submit-search'>Search</span>
        </>
    )
}