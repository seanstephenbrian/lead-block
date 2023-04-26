import React from 'react';
import { Interweave } from 'interweave';

export default function ArticleBody(props) {

    const { body } = props;

    return (
        <div className='article-body'>
            <Interweave content={body} />
        </div>
    )
}