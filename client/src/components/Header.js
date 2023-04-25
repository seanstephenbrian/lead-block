import React from 'react';

import HeaderFootball from './HeaderFootball';
import HeaderLogo from './HeaderLogo';
import HeaderMenu from './HeaderMenu';

import '../style/header.scss';

export default function Header() {
    return (
        <header>
            <HeaderLogo />
            <HeaderFootball />
            <HeaderMenu />
        </header>
    )
}