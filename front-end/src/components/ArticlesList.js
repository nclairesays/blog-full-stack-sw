import React from 'react'
import { Link } from 'react-router-dom'

// use articles props/params deconstructed so it's more reusiable
const ArticlesList = ({ articles }) => {
        return <>
        {articles.map( (article, key) => {
               return <Link key={key} className="article-list-item" to={`/article/${article.name}`}>
                <h3>{article.title}</h3>
                <p>
                    {article.content[0].substring(0, 150)}...
                </p>
            </Link>
        })}
        </>
    
}


export default ArticlesList

// import React from 'react';
// import { Link } from 'react-router-dom';

// const ArticlesList = ({ articles }) => (
//     <>
//     {articles.map((article, key) => (
//         <Link className="article-list-item" key={key} to={`/article/${article.name}`}>
//             <h3>{article.title}</h3>
//             <p>{article.content[0].substring(0, 150)}...</p>
//         </Link>
//     ))}
//     </>
// );

// export default ArticlesList;