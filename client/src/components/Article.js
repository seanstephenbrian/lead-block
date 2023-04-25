import React from 'react';
import { useParams } from 'react-router-dom';

export default function Article() {
    
    const { articleId } = useParams();

    return (
        <>
            article {articleId}
        </>
    )
}