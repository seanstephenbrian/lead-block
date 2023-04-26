import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import About from './About';
import Article from './Article';
import Contact from './Contact';
import Footer from './Footer';
import Header from './Header';
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
                            path='/tag/:tagQuery'
                            element={<SearchResults />} 
                        />
                        <Route
                            path='/author/:authorQuery'
                            element={<SearchResults />}
                        />
                        <Route
                            path='/search/:searchQuery'
                            element={<SearchResults />}
                        />
                        <Route
                            path='/about'
                            element={<About />}
                        />
                        <Route
                            path='/contact'
                            element={<Contact />}
                        />
                    </Routes>
                </main>
                <Footer />
        </BrowserRouter>        
    )
}