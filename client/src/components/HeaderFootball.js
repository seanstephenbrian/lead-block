import React, { useContext } from 'react';

import { ThemeContext } from '../App';

import Football from '../img/football.png';

export default function HeaderFootball() {

    const theme = useContext(ThemeContext);

    return (
        <div className='football'>
            <img className={theme} src={Football} alt='' />
        </div>
    )
}