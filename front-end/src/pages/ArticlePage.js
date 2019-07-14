import React from 'react';
import articleContent from './article-content'
import ArticlesList from '../components/ArticlesList'
import NotFoundPage from './NotFoundPage'


const ArticlePage = ({ match }) =>  {
    //Route passes a match prop, which has  info like params.name which is the url parameters
    const name = match.params.name

    //find the article that has the article name
    const article = articleContent.find(article => name === article.name)

    //if article doesn't exist...
    if (!article) return <NotFoundPage />
    
    const otherArticles = articleContent.filter( article => article.name !== name)

    return (
    <>
        <h1>{article.title}</h1>
        {article.content.map( (paragraph, key) => {
            return <p key={key}>{paragraph}</p>
        })}
        <h3>Other Articles: </h3>
        {/* return articles list EXCEPT the one we're on */} 
        <ArticlesList articles={otherArticles}/>
    </>)
}


export default ArticlePage