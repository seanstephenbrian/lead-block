import React from 'react';
import { useParams } from 'react-router-dom';

export default function Article() {
    
    const { articleId } = useParams();

    return (
        <section className='article'>
            article {articleId}
        </section>
    )
}