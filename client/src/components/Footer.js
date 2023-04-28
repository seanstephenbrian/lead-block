import React, { useContext } from 'react';

import { ThemeContext } from '../App';

import '../style/scss/footer.scss';

import TwitterIcon from '../img/svg/twitter.svg';

export default function Footer() {

    const theme = useContext(ThemeContext);

    return (
        <footer className='footer'>
            <a href='https://twitter.com/leadblocksports' className='twitter hover-grow' target='_blank' rel='noopener noreferrer'>
                <img src={TwitterIcon} alt='Lead Block Sports Twitter' />
            </a>
            <div className='copyright'>
                Copyright © Lead Block Sports {new Date().getFullYear()}
            </div>
            <div className='ssbbd'>
                <div>site by</div>
                <div className={`ssbbd-link ${theme}`}>
                    <a href='https://ssbbd.dev/' target='_blank' rel='noopener noreferrer'>ssbbd</a>
                </div>
            </div>
        </footer>
    )
}