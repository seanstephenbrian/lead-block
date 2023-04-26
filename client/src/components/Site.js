import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Article from './Article';
import Header from './Header';
import Footer from './Footer';
import RecentArticles from './RecentArticles';

import '../style/scss/main.scss';
import SearchResults from './SearchResults';

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
                                <>
                                    <Article
                                        updateCurrentArticle={(newCurrentArticle) => {
                                            setCurrentArticle(newCurrentArticle);
                                        }}
                                    />
                                    <RecentArticles currentArticle={currentArticle} />
                                </>
                            } 
                        />
                        <Route
                            path='/articles/:articleSlug'
                            element={
                                <>
                                    <Article
                                        updateCurrentArticle={(newCurrentArticle) => {
                                            setCurrentArticle(newCurrentArticle);
                                        }}
                                    />
                                    <RecentArticles currentArticle={currentArticle} />
                                </>
                            }
                        />
                        <Route
                            path='/search/:query'
                            element={<SearchResults />} 
                        />
                        <Route
                            path='/author/:authorQuery'
                            element={<SearchResults />}
                        />
                    </Routes>
                </main>
                <Footer />
        </BrowserRouter>        
    )
}