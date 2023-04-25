import React from 'react';

import { Link } from 'react-router-dom';

export default function HeaderLogo() {
    return (
        <Link className='logo' to='./'>
            <div className='lead'>LEAD</div>
            <div className='block'>BLOCK</div>
            <div className='sports'>SPORTS</div>
        </Link>
    )
}