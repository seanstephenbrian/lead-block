import React, { useContext } from 'react';

import { ThemeContext } from '../App';

import DarkIcon from '../img/svg/dark.svg';
import HamburgerIcon from '../img/svg/hamburger.svg';
import LightIcon from '../img/svg/light.svg';
import SearchIcon from '../img/svg/search.svg';

export default function HeaderMenu(props) {

    const { handleDarkClick, handleLightClick } = props;

    const theme = useContext(ThemeContext);

    return (
        <div className={`menu ${theme}`}>
            <img className='menu-icon dark-icon hover-grow svg' onClick={handleDarkClick} src={DarkIcon} />
            <img className='menu-icon light-icon hover-grow svg' onClick={handleLightClick} src={LightIcon} />
            <img className='menu-icon search-icon hover-grow svg' src={SearchIcon} />
            <img className='menu-icon hamburger-icon hover-grow svg' src={HamburgerIcon} />
        </div>
    )
}