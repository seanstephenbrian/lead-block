import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ArticleBody from '../components/ArticleBody';
import ArticleTags from '../components/ArticleTags';
import ArticleTopMatter from '../components/ArticleTopMatter';

import '../style/scss/article.scss';

export default function Article(props) {
    
    const { updateCurrentArticle } = props;
    const { articleSlug } = useParams();

    const [currentArticle, setCurrentArticle] = useState();
    const [error, setError] = useState(false);

    // scroll to top whenever current article changes:
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentArticle]);

    // fetch correct article:
    useEffect(() => {
        async function fetchArticle(url) {
            const article = await fetch(url, { method: 'GET' });
            return article;
        }

        let apiUrl;
        if (articleSlug === undefined) {
            apiUrl = process.env.REACT_APP_ARTICLES + '/newest';
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
            });

    }, [articleSlug]);

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
                />
                <ArticleBody body={currentArticle.body} />
                <ArticleTags tags={currentArticle.tags} />
            </section>
        )
    } else if (error) {
        return (
            <section className='article'>
                <h1 className='error'>Sorry, we've encountered an error.</h1>
            </section>
        )
    }
}