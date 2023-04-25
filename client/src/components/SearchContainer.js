import React, { useState } from 'react';

export default function SearchContainer() {

    // store search bar expansion status in state:
    const [searchExpanded, setSearchExpanded] = useState(false);
    
    return (
        <div className="search-container">
        </div>
    )
}