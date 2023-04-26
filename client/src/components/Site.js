import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Article from './Article';
import Header from './Header';
import Footer from './Footer';
import RecentPosts from './RecentPosts';

import '../style/scss/main.scss';

export default function Site(props) {

    const { updateTheme } = props;

    return (
        <BrowserRouter>
                <Header handleThemeClick={updateTheme} />
                <main className='main'>
                    <Routes>
                        <Route path='/' element={<Article />} />
                        <Route path='/articles/:articleSlug' element={<Article />} />
                    </Routes>
                    <RecentPosts />
                </main>
                <Footer />
        </BrowserRouter>        
    )
}