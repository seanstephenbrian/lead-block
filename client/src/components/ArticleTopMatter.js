import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import LinkIcon from '../img/svg/link.svg';
import ShareIcon from '../img/svg/share.svg';
import TwitterIcon from '../img/svg/twitter.svg';

import '../style/scss/share-article.scss';

export default function ArticleTopMatter(props) {

    const { author, timestamp, title, slug } = props;

    const [linkCopied, setLinkCopied] = useState(false);
    const [shareExpanded, setShareExpanded] = useState(false);

    useEffect(() => {
        setShareExpanded(false);
    }, [author, timestamp, title, slug]);

    let shareArticle;

    if (shareExpanded) {
        shareArticle = (
            <>
                <div 
                    className='share-link' 
                    onClick={() => {
                        navigator.clipboard.writeText(`https://www.leadblocksports.blog/articles/${slug}`);
                        setLinkCopied(true);
                        setTimeout(() => {
                            setLinkCopied(false);
                        }, 5000);
                    }}
                >
                    <img className='hover-grow svg' src={LinkIcon} alt='Article link'></img>
                    <div className='copy-alert'>
                        {linkCopied ? 'Link copied!' : ''}
                    </div>
                </div>
                <Link 
                    className='share-tweet'
                    to={`https://twitter.com/intent/tweet?url=https://www.leadblocksports.blog/articles/${slug}&via=leadblocksports&hashtags=leadblocksports`}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <img className='hover-grow' src={TwitterIcon} alt='Share article on Twitter'></img>
                </Link>
            </>
        );
    } else if (!shareExpanded) {
        shareArticle = (
            <>
                <img className='hover-grow svg' src={ShareIcon} alt='Share article' onClick={() => setShareExpanded(true)}></img>
            </>
        );
    }

    return (
        <div className='article-top-matter'>
            <h1 className='article-title'>{title}</h1>
            <div className='author-date-share'>
                <Link className='article-author' to={`../author/` + author}>{author}</Link>
                <h2 className='article-date'>{(new Date(timestamp)).toLocaleDateString()}</h2>
                <div className='share-article'>
                    {shareArticle}
                </div>
            </div> 
        </div>
    )
}