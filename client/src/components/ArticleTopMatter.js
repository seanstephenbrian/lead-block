import React from 'react';
import { Link } from 'react-router-dom';

export default function ArticleTopMatter(props) {

    const { title, author, timestamp } = props;

    return (
        <div className='article-top-matter'>
            <h1 className='article-title'>{title}</h1>
            <div className='author-date'>
                <Link className='article-author' to={`../author/` + author}>{author}</Link>
                <h2 className='article-date'>{(new Date(timestamp)).toLocaleDateString()}</h2>
            </div> 
        </div>
    )
}