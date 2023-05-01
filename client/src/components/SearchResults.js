import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { ThemeContext } from '../App';

import '../style/scss/search-results.scss';

export default function SearchResults() {

    const { tagQuery, authorQuery, searchQuery } = useParams();
    const theme = useContext(ThemeContext);

    const [searchFinished, setSearchFinished] = useState(false);
    const [searchResults, setSearchResults] = useState();

    useEffect(() => {
        if (tagQuery || searchQuery) {
            document.title = `Results for '${tagQuery || searchQuery}' | Lead Block Sports`;
        } else if (authorQuery) {
            document.title = `Articles by ${authorQuery} | Lead Block Sports`;
        } else {
            document.title = 'Lead Block Sports';
        }
        
        window.scrollTo(0, 0);
    }, [tagQuery, searchQuery, authorQuery]);

    useEffect(() => {
        async function fetchSearchResults(url) {
            const results = await fetch(url, { method: 'GET' });
            return results;
        }

        let apiUrl;
        if (tagQuery) {
            apiUrl = process.env.REACT_APP_ARTICLES + '/tag/' + tagQuery;
        } else if (authorQuery) {
            apiUrl = process.env.REACT_APP_ARTICLES + '/author/' + authorQuery;
        } else if (searchQuery) {
            apiUrl = process.env.REACT_APP_ARTICLES + '/search/' + searchQuery;
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
    }, [authorQuery, tagQuery, searchQuery]);

    let foundArticles;
    if (searchResults && searchResults.length > 0) {
        foundArticles = (
            <>  
                <h1 className='search-title'>
                    {tagQuery ? `Results for '${tagQuery}'` : ''}
                    {authorQuery ? `Results for '${authorQuery}'` : ''}
                    {searchQuery ? `Results for '${searchQuery}'` : ''}
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