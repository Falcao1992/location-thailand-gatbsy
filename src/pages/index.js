import React, {useEffect, useState} from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import StyledBackgroundSection from "../components/BackgroundSection";
import Category from "../components/Category";
import firebase from "gatsby-plugin-firebase";


const IndexPage = ({path}) => {
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
        <Layout>
            <StyledBackgroundSection  />
            <Category firebaseDataArticles={firebaseDataCategory} pathName={path}/>
            <SEO title="Home"/>
        </Layout>

    )
};

export default IndexPage
