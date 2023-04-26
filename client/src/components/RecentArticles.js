import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import '../style/scss/recent-articles.scss';

export default function RecentArticles(props) {

    const { currentArticle } = props;

    const [error, setError] = useState(false);
    const [recentArticles, setRecentArticles] = useState();

    // logic to fetch the most recent articles then filter out the article the user is currently viewing:
    useEffect(() => {
        async function fetchArticles(url) {
            const articles = await fetch(url, { method: 'GET' });
            return articles;
        }

        fetchArticles(process.env.REACT_APP_ARTICLES)
            .then((response) => {
                return response.json();
            })
            .then((articles) => {
                if (!articles) {
                    setError(true);
                } else {
                    if (currentArticle) {
                        const filteredArticles = articles.filter(article => article.title !== currentArticle.title);
                        setRecentArticles(filteredArticles);
                    } else {
                        setRecentArticles(articles);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }, [currentArticle]);

    let articleElements;
    if (recentArticles) {
        articleElements = recentArticles.map((article) => {
            return (
                <Link className='recent-article-link hover-grow grow-less' to={`../articles/` + article.slug} key={uuidv4()}>
                    <div className='recent-article-link-title'>{article.title}</div>
                    <div className='recent-article-link-description'>{article.description}</div>
                </Link>
            );
        });
    }
    
    if (error) {
        return (
            <section className='recent-articles'>
                <h1 className='recent-articles-title'>Recent Articles</h1>
                <div className='recent-article-links'>Sorry, we encountered an error.</div>
            </section>
        )
    } else {
        return (
            <section className='recent-articles'>
                <h1 className='recent-articles-title'>Recent Articles</h1>
                <div className='recent-article-links'>
                    {articleElements}
                </div>
            </section>
        )
    }
}