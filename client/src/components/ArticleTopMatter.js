import React from 'react';

export default function ArticleTopMatter(props) {

    const { title, author, timestamp } = props;

    return (
        <div className='article-top-matter'>
            <h1 className='article-title'>{title}</h1>
            <div className='author-date'>
                <h2 className='article-author'>{author}</h2>
                <h2 className='article-date'>{(new Date(timestamp)).toLocaleDateString()}</h2>
            </div> 
        </div>
    )
}