import React from 'react';

import '../style/expanded-menu.scss';

export default function ExpandedMenu(props) {

    const { expanded, handleCloseClick } = props;

    if (expanded) {
        return (
            <section className='expanded-menu'>
                <button className='close-menu-button' aria-label='Close' onClick={handleCloseClick}>X</button>
                <ul className='menu-nav-links'>
                    <li className='menu-nav-link about-link'>ABOUT</li>
                    <li className='menu-nav-link football-link'>FOOTBALL</li>
                    <li className='menu-nav-link basketball-link'>BASKETBALL</li>
                    <li className='menu-nav-link contact-link'>CONTACT</li>
                </ul>
            </section>
        )
    } else {
        return;
    }   
}