import React from 'react';

import '../style/scss/info-page.scss';

export default function Contact() {
    return (
        <section className='contact-page info-page'>
            <h1>Contact</h1>
            <p>You can reach Lead Block by email at <a href='mailto:leadblocksports@gmail.com' class='inline-link'>leadblocksports@gmail.com</a>.</p>
            <p>We're also <a class='inline-link' href='https://twitter.com/lbkbear' target='_blank' rel='noopener noreferrer'>on Twitter!</a></p>
        </section>
    )
}