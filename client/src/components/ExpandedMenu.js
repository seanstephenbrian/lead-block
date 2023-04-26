import React from 'react';
import { Link } from 'react-router-dom';

import '../style/scss/expanded-menu.scss';

export default function ExpandedMenu(props) {

    const { expanded, handleCloseClick } = props;

    if (expanded) {
        return (
            <section className='expanded-menu'>
                <button className='close-menu-button' aria-label='Close' onClick={handleCloseClick}>X</button>
                <ul className='menu-nav-links'>
                    <li className='menu-nav-link about-link'>
                        <Link to='../about'>ABOUT</Link>
                    </li>
                    <li className='menu-nav-link football-link'>
                        <Link to='../tag/football'>FOOTBALL</Link>
                    </li>
                    <li className='menu-nav-link basketball-link'>
                        <Link to='../tag/basketball'>BASKETBALL</Link>
                    </li>
                    <li className='menu-nav-link contact-link'>
                        <Link to='../contact'>CONTACT</Link>
                    </li>
                </ul>
            </section>
        )
    } else {
        return;
    }   
}