import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ThemeContext } from '../App';

import '../style/logo-shadow.scss';

export default function HeaderLogo() {

    const theme = useContext(ThemeContext);

    return (
        <Link className={`logo ${theme}`} to='./'>
            <div className='lead'>LEAD</div>
            <div className='block'>BLOCK</div>
            <div className='sports'>SPORTS</div>
        </Link>
    )
}