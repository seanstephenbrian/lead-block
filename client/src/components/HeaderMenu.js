import React, { useContext, useState } from 'react';

import { ThemeContext } from '../App';

import SearchBar from './SearchBar';

import DarkIcon from '../img/svg/dark.svg';
import HamburgerIcon from '../img/svg/hamburger.svg';
import LightIcon from '../img/svg/light.svg';
import SearchIcon from '../img/svg/search.svg';
import CloseIcon from '../img/svg/close.svg';
import ExpandedMenu from './ExpandedMenu';

export default function HeaderMenu(props) {

    // destructure props:
    const { 
        handleDarkClick, 
        handleLightClick
    } = props;

    // store expanded search bar, expanded mneu status in state:
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [menuExpanded, setMenuExpanded] = useState(false);

    const theme = useContext(ThemeContext);

    // conditional rendering for search bar:
    let search;
    if (!searchExpanded) {
        search =(
            <img className='menu-icon search-icon hover-grow svg' onClick={() => setSearchExpanded(true)} src={SearchIcon} alt='Search' />
        );
    } else if (searchExpanded) {
        search = (
            <div className='search-container'>
                <img className='menu-icon search-icon hover-grow svg' onClick={() => setSearchExpanded(false)} src={CloseIcon} alt='Close search bar' />
                <SearchBar />
            </div>
        )
    }

    return (
        <>
            <div className={`menu ${theme}`}>
                <ExpandedMenu expanded={menuExpanded} handleCloseClick={() => setMenuExpanded(false)} />
                <img className='menu-icon dark-icon hover-grow svg' onClick={handleDarkClick} src={DarkIcon} alt='Switch to dark theme' />
                <img className='menu-icon light-icon hover-grow svg' onClick={handleLightClick} src={LightIcon} alt='Switch to light theme' />
                {search}
                <img className='menu-icon hamburger-icon hover-grow svg' onClick={() => setMenuExpanded(true)} src={HamburgerIcon} alt='Expand menu' />
            </div>
        </>
    )
}