import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import '../style/scss/recent-posts.scss';

export default function RecentPosts(props) {

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
                <div className='recent-article' key={uuidv4()}>
                    {article.title}
                </div>
            );
        });
    }
    
    if (error) {
        return (
            <section className='recent-posts'>
                <h1 className='recent-posts-title'>Recent Articles</h1>
                <div className='recent-post-links'>Sorry, we were unable to retrieve the articles.</div>
            </section>
        )
    } else {
        return (
            <section className='recent-posts'>
                <h1 className='recent-posts-title'>Recent Articles</h1>
                <div className='recent-post-links'>
                    {articleElements}
                </div>
            </section>
        )
    }
}