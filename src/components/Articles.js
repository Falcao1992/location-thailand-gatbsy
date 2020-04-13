import React from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'
import ImageArticle from "./ImageArticle";
import {formatPathName} from "./globalFunction/globalFunction";

import "typeface-pinyon-script"


const Articles = ({firebaseDataArticles, pathName}) => {

    const handleRenderImage = (articleImageUrl) => {
        if(pathName) {
            return <ImageArticle articleImageUrl={articleImageUrl}/>
        }
    };

    return (
        <ContainerBodyPage>
            {firebaseDataArticles && firebaseDataArticles.map((article, index) => {
                return (
                    <ArticleContent id={article.name} key={index}>
                        {handleRenderImage(article.urlImage)}
                        <ArticleBody>
                        <ArticleLocation><span>{article.articleTitle}</span>{article.location}</ArticleLocation>
                        <p>{article.content}</p>
                        {formatPathName(pathName) === "home" && <SeeMoreLink to={`/${article.page}`}><span>voir plus ></span></SeeMoreLink>}
                        </ArticleBody>
                    </ArticleContent>
                )
            })}

        </ContainerBodyPage>
    )
};

const ContainerBodyPage = styled.div `
    display: flex;
    flex-direction: column;
    `

const ArticleBody = styled.div `
    align-self: center;
    @media only screen and (min-width:980px) {      
              width: 40%;                     
            }
    `

    const ArticleContent = styled.div`
          padding: 5px 10px;       
          margin-bottom: 20px;
          @media only screen and (min-width:980px) {      
              width: 70%;
                margin: 50px auto;
                display: flex;
                justify-content: flex-start;            
            }
    `;

    const ArticleLocation = styled.h3`
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        line-height: 1.2;
        margin-left: 5px;
           span {
            text-transform: none;
            font-family: 'pinyon script' , sans-serif;
            color: ${props => props.theme.color.secondary};
            display: block;
            font-size: 2.1rem;
            letter-spacing: 1px;
           }
        &::before {
            display: block;
            content: "";
            width: 24px;
            height: 2px;
            background: #C89446;
            margin-bottom: 10px;
            clear: both;
        }  
    `;

    const SeeMoreLink = styled(Link)`
        text-decoration: none;
            span {
                color: ${props => props.theme.color.secondary};
                &:hover {
                    text-decoration: underline;
                }
            }
    `;



export default Articles
