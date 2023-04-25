import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Article from './Article';
import Header from './Header';
import Footer from './Footer';
import RecentPosts from './RecentPosts';

import '../style/main.scss';

export default function Site(props) {

    const { updateTheme } = props;

    // test fetch request from API:
    useEffect(() => {

        async function fetchBlogData(url) {
            const response = await fetch(url, { method: 'GET' });
            return response;
        }

        fetchBlogData(process.env.REACT_APP_ARTICLES)
            .then((response) => { 
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                return err;
            });

    }, []);

    return (
        <BrowserRouter>
                <Header handleThemeClick={updateTheme} />
                <RecentPosts />
                <Routes>
                    <Route path='/' element={<Article />} />
                    <Route path='/article/:articleId' element={<Article />} />
                </Routes>
                <Footer />
        </BrowserRouter>        
    )
}