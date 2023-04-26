import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { ThemeContext } from '../App';

import '../style/scss/search-results.scss';

export default function SearchResults() {

    const { query, authorQuery } = useParams();
    const theme = useContext(ThemeContext);

    const [searchFinished, setSearchFinished] = useState(false);
    const [searchResults, setSearchResults] = useState();

    useEffect(() => {
        async function fetchSearchResults(url) {
            const results = await fetch(url, { method: 'GET' });
            return results;
        }

        let apiUrl;
        if (query) {
            apiUrl = process.env.REACT_APP_ARTICLES + '/search/' + query;
        } else if (authorQuery) {
            apiUrl = process.env.REACT_APP_ARTICLES + '/author/' + authorQuery;
        }

        // find articles containing query in title, tags, or body:
        fetchSearchResults(apiUrl)
            .then((response) => {
                return response.json();
            })
            .then((results) => {
                setSearchResults(results);
                setSearchFinished(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [authorQuery, query]);

    let foundArticles;
    if (searchResults && searchResults.length > 0) {
        foundArticles = (
            <>  
                <h1 className='search-title'>
                    {query ? `Results for '${query}'` : ''}
                    {authorQuery ? `Results for '${authorQuery}'` : ''}
                </h1>
                {searchResults.map((article) => {
                    return (
                        <Link className={`found-article-link hover-grow grow-less ${theme}`} to={`../articles/` + article.slug} key={uuidv4()}>
                            <div className='found-article-title'>{article.title}</div>
                            <div className='found-article-description'>{article.description}</div>
                        </Link>
                    );
                })}
            </>
        )
    } else {
        foundArticles = (
            <h1 className='search-title'>
                Sorry, we couldn't find anything... please search again.
            </h1>
        )
    }

    if (searchFinished) {
        return (
            <section className='search-results'>
                {foundArticles}
            </section>
        );
    } else {
        return;
    }
}