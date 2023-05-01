import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import ArticleBody from '../components/ArticleBody';
import ArticleTags from '../components/ArticleTags';
import ArticleTopMatter from '../components/ArticleTopMatter';

import '../style/scss/article.scss';

export default function Article(props) {
    
    const { updateCurrentArticle } = props;
    const { articleSlug } = useParams();

    // check for 'article' search param to handle legacy routes:
    /* eslint-disable no-unused-vars */
    const [searchParams, setSearchParams] = useSearchParams();
    /* eslint-enable no-unused-vars */

    const [currentArticle, setCurrentArticle] = useState();
    const [error, setError] = useState(false);

    // update page title & scroll to top whenever current article changes:
    useEffect(() => {
        if (currentArticle && currentArticle.title) {
            document.title = currentArticle.title + ' | Lead Block Sports';
        } else {
            document.title = 'Lead Block Sports';
        }
        
        window.scrollTo(0, 0);
    }, [currentArticle]);

    // fetch correct article:
    useEffect(() => {
        async function fetchArticle(url) {
            const article = await fetch(url, { method: 'GET' });
            return article;
        }

        const articleQuery = searchParams.get('article');

        let apiUrl;
        // if no article slug is specified, get the newest article:
        if (articleSlug === undefined && !articleQuery) {
            apiUrl = process.env.REACT_APP_ARTICLES + '/newest';
        // this if statement is necessary to support legacy links from V1 of the site:
        } else if (articleSlug === undefined && articleQuery) {
            let slugToUse;
            if (articleQuery === '1') slugToUse = 'zach-wilson-diaries';
            if (articleQuery === '2') slugToUse = 'how-did-the-bears-get-here';
            if (articleQuery === '3') slugToUse = 'frank-reich-has-the-tools';
            if (articleQuery === '4') slugToUse = 'the-denver-disaster-and-the-path-to-recovery';
            if (articleQuery === '5') slugToUse = 'post-super-bowl-pre-combine-mock-draft';
            if (articleQuery === '6') slugToUse = 'jalen-carter-changed-nfl-history-maybe';
            apiUrl = process.env.REACT_APP_ARTICLES + '/' + slugToUse;
        // otherwise request the article corresponding to the specified slug:
        } else {
            apiUrl = process.env.REACT_APP_ARTICLES + '/' + articleSlug;
        }

        fetchArticle(apiUrl)
            .then((response) => {
                return response.json();
            })
            .then((article) => {
                if (!article) {
                    setError(true);
                } else if (article.length === 1) {
                    setCurrentArticle(article[0]);
                } else {
                    setCurrentArticle(article);
                }
            })
            .catch((err) => {
                console.log(err);
                setError(true);
            });

    }, [articleSlug, searchParams]);

    useEffect(() => {
        updateCurrentArticle(currentArticle);
    }, [currentArticle, updateCurrentArticle]);

    if (currentArticle) {
        return (
            <section className='article'>
                <ArticleTopMatter 
                    title={currentArticle.title}
                    author={currentArticle.author.name}
                    timestamp={currentArticle.timestamp}
                    slug={currentArticle.slug}
                />
                <ArticleBody body={currentArticle.body} />
                <ArticleTags tags={currentArticle.tags} />
            </section>
        )
    } else if (!currentArticle && !error) {
        return <section className='article'></section>
    } else if (error) {
        return (
            <section className='article'>
                <h1 className='error'>Unable to retrieve article.</h1>
            </section>
        )
    }
}