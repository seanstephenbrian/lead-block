import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function SearchResults() {

    const { query, authorQuery } = useParams();

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
                console.log(results);
                setSearchResults(results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [authorQuery, query]);

    return (
        <section className='search-results'>
        </section>
    )
    
}