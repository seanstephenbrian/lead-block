import React from 'react';

import DarkIcon from '../img/svg/dark.svg';
import HamburgerIcon from '../img/svg/hamburger.svg';
import LightIcon from '../img/svg/light.svg';
import SearchIcon from '../img/svg/search.svg';

export default function HeaderMenu(props) {

    const { handleDarkClick, handleLightClick } = props;

    return (
        <div className='menu'>
            <img className='menu-icon dark-icon hover-grow' onClick={handleDarkClick} src={DarkIcon} />
            <img className='menu-icon light-icon hover-grow' onClick={handleLightClick} src={LightIcon} />
            <img className='menu-icon search-icon hover-grow' src={SearchIcon} />
            <img className='menu-icon hamburger-icon hover-grow' src={HamburgerIcon} />
        </div>
    )
}