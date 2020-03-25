import React, {useEffect, useState} from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'
import "typeface-pinyon-script"
import firebase from "gatsby-plugin-firebase";
import Img from "./image";


const Category = () => {
    const [firebaseDataCategory, setFirebaseDataCategory] = useState([]);

    useEffect(() => {
        firebase
            .database()
            .ref("/category")
            .once("value")
            .then(snapshot => {
                setFirebaseDataCategory(Object.values(snapshot.val()));

            })
    }, []);

    return (
        <>
            {firebaseDataCategory && firebaseDataCategory.map((category, index) => {
                return (
                    <CategoryContent key={index}>
                        <Img categoryName={category.key}/>
                        <CategoryTittle><span>{category.name}</span>{category.title}</CategoryTittle>
                        <p>{category.content}</p>
                        <SeeMoreLink to="#"><span>voir plus ></span></SeeMoreLink>
                    </CategoryContent>
                )
            })}
        </>
    )
};

    const CategoryContent = styled.div`
          padding: 5px 10px;
          margin-bottom: 20px
    `;

    const CategoryTittle = styled.h2`
        font-size: 1.7rem;
        text-transform: uppercase;
        letter-spacing: 2px;
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



export default Category
