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
                        <Link to='../about' onClick={handleCloseClick}>ABOUT</Link>
                    </li>
                    <li className='menu-nav-link football-link'>
                        <Link to='../tag/football' onClick={handleCloseClick}>FOOTBALL</Link>
                    </li>
                    <li className='menu-nav-link basketball-link'>
                        <Link to='../tag/basketball' onClick={handleCloseClick}>BASKETBALL</Link>
                    </li>
                    <li className='menu-nav-link contact-link'>
                        <Link to='../contact' onClick={handleCloseClick}>CONTACT</Link>
                    </li>
                </ul>
            </section>
        )
    } else {
        return;
    }   
}