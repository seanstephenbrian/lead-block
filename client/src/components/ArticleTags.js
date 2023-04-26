import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function ArticleTags(props) {

    const { tags } = props;

    const articleTags = tags.map((tag) => {
        return (
            <Link
                className='tag hover-grow'
                key={uuidv4()}
                to={`../search/` + tag}
            >
                {tag}
            </Link>
        );
    });

    return (
        <div className='article-tags'>
            {articleTags}
        </div>
    );
}