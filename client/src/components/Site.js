import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Article from './Article';
import Header from './Header';
import Footer from './Footer';
import RecentPosts from './RecentPosts';

import '../style/scss/main.scss';

export default function Site(props) {

    const { updateTheme } = props;

    const [currentArticle, setCurrentArticle] = useState();

    return (
        <BrowserRouter>
                <Header handleThemeClick={updateTheme} />
                <main className='main'>
                    <Routes>
                        <Route 
                            path='/'
                            element={
                                <Article
                                    updateCurrentArticle={(newCurrentArticle) => {
                                        setCurrentArticle(newCurrentArticle);
                                    }}
                                />
                            } 
                        />
                        <Route
                            path='/articles/:articleSlug'
                            element={
                                <Article
                                    updateCurrentArticle={(newCurrentArticle) => {
                                        setCurrentArticle(newCurrentArticle);
                                    }}
                                />
                            }
                        />
                    </Routes>
                    <RecentPosts currentArticle={currentArticle} />
                </main>
                <Footer />
        </BrowserRouter>        
    )
}