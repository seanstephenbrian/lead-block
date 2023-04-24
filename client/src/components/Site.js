import React, { useEffect } from 'react';

export default function Site() {

    // test fetch request from API:
    useEffect(() => {

        async function fetchBlogData(url) {
            const response = await fetch(url, { method: 'GET' });
            return response;
        }

        fetchBlogData(process.env.REACT_APP_API)
            .then((response) => { 
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err)
            });

    }, []);

    return (
        <>
            lead block sports
        </>
    )
}