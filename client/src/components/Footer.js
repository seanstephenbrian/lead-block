import React from 'react';

import '../style/scss/footer.scss';

import TwitterIcon from '../img/svg/twitter.svg';

export default function Footer() {
    return (
        <footer className='footer'>
            <a href='https://twitter.com/lbkbear' className='twitter hover-grow' target='_blank' rel='noopener noreferrer'>
                <img src={TwitterIcon} alt='Lead Block Sports Twitter' />
            </a>
            <div className='copyright'>
                Copyright © Lead Block Sports {new Date().getFullYear()}
            </div>
            <div className='ssbbd'>
                <div>site design by</div>
                <div className='ssbbd-link'>
                    <a href='https://ssbbd.dev/' target='_blank' rel='noopener noreferrer'>ssbbd</a>
                </div>
            </div>
        </footer>
    )
}