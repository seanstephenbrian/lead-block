import React from 'react';
import { Link } from 'react-router-dom';

import '../style/scss/info-page.scss';

export default function About() {
    return (
        <section className='about-page info-page'>
            <h1>About Lead Block Sports</h1>
            <p>Lead Block Sports is a platform for quality football and basketball analysis and other exciting updates from the wider world of sports.</p>
            <p>The blog is maintained by Kevin and based out of northern Illinois.</p>
            <p>Feel free to <Link className='inline-link' to='../contact'>reach out</Link> if you're interested in collaborating or contributing your content to the site! We're always looking to make new friends.</p>
            <p>You can also find Lead Block <a className='inline-link' href='https://twitter.com/leadblocksports' target='_blank' rel='noopener noreferrer'>on Twitter!</a></p>
        </section>
    )
}