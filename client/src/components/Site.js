import React, { useEffect } from 'react';

export default function Site() {

    // test fetch request from API:
    useEffect(() => {

        async function fetchBlogData(url) {
            const response = await fetch(url, { method: 'GET' });
            return response;
        }

        fetchBlogData(process.env.REACT_APP_ARTICLES)
            .then((response) => { 
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                return err;
            });

    }, []);

    return (
        <>
            lead block sports
        </>
    )
}