import React, { useEffect } from 'react';

import '../style/scss/info-page.scss';

export default function Contact() {

    useEffect(() => {
        document.title = 'Contact | Lead Block Sports';
    }, []);

    return (
        <section className='contact-page info-page'>
            <h1>Contact</h1>
            <p>You can reach us by email at <a href='mailto:leadblocksports@gmail.com' className='inline-link'>leadblocksports@gmail.com</a>.</p>
            <p>We're also <a className='inline-link' href='https://twitter.com/leadblocksports' target='_blank' rel='noopener noreferrer'>on Twitter!</a></p>
        </section>
    )
}