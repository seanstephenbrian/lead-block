import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { ThemeContext } from '../App';

export default function ArticleTags(props) {

    const { tags } = props;
    const theme = useContext(ThemeContext);

    const articleTags = tags.map((tag) => {
        return (
            <Link
                className={`tag hover-grow ${theme}`}
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