import React, {useEffect, useState} from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import StyledBackgroundSection from "../components/BackgroundSection";
import firebase from "gatsby-plugin-firebase";
import Category from "../components/Category";

const SecondPage = ({path}) => {
    const [firebaseDataResidence, setFirebaseDataResidence] = useState([]);

    useEffect(() => {
        firebase
            .database()
            .ref("/pageData/residences")
            .once("value")
            .then(snapshot => {
                setFirebaseDataResidence(Object.values(snapshot.val()));
            })
    }, []);

    return (
    <Layout>
        <StyledBackgroundSection pathName={path.replace("/","")}/>
        <Category firebaseDataArticles={firebaseDataResidence} pathName={path}/>
        <SEO title="Apartments"/>
        <h1>Hi from the appartemeent page</h1>
        <p>Welcome to page 2</p>
    </Layout>
    )
};

export default SecondPage
