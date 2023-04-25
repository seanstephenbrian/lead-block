import React from 'react';

import HeaderFootball from './HeaderFootball';
import HeaderLogo from './HeaderLogo';
import HeaderMenu from './HeaderMenu';

import '../style/header.scss';

export default function Header(props) {

    const { handleThemeClick } = props;

    return (
        <header className='header'>
            <HeaderLogo />
            <HeaderFootball />
            <HeaderMenu
                handleDarkClick={() => handleThemeClick('dark')}
                handleLightClick={() => handleThemeClick('light')}
            />
        </header>
    )
}