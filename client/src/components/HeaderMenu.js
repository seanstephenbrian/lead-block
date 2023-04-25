import React, { useContext, useState } from 'react';

import { ThemeContext } from '../App';

import SearchBar from './SearchBar';
import SearchContainer from './SearchContainer';

import DarkIcon from '../img/svg/dark.svg';
import HamburgerIcon from '../img/svg/hamburger.svg';
import LightIcon from '../img/svg/light.svg';
import SearchIcon from '../img/svg/search.svg';
import CloseIcon from '../img/svg/close.svg';

export default function HeaderMenu(props) {

    // destructure props:
    const { 
        handleDarkClick, 
        handleLightClick
    } = props;

    // store search bar expansion status in state:
    const [searchExpanded, setSearchExpanded] = useState(false);

    const theme = useContext(ThemeContext);

    // conditional rendering for search bar:
    let search;
    if (!searchExpanded) {
        search =(
            <img className='menu-icon search-icon hover-grow svg' onClick={() => setSearchExpanded(true)} src={SearchIcon} />
        );
    } else if (searchExpanded) {
        search = (
            <div className='search-icon'>
                <img className='menu-icon hover-grow svg' onClick={() => setSearchExpanded(false)} src={CloseIcon} />
                <SearchBar />
            </div>
        )
    }

    return (
        <>
            <div className={`menu ${theme}`}>
                <img className='menu-icon dark-icon hover-grow svg' onClick={handleDarkClick} src={DarkIcon} />
                <img className='menu-icon light-icon hover-grow svg' onClick={handleLightClick} src={LightIcon} />
                <SearchContainer />
                <img className='menu-icon hamburger-icon hover-grow svg' src={HamburgerIcon} />
            </div>
        </>
    )
}