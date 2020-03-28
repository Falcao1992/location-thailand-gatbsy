import React, {useEffect, useState} from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import StyledBackgroundSection from "../components/BackgroundSection";
import Category from "../components/Category";
import firebase from "gatsby-plugin-firebase";



const IndexPage = ({path}) => {
    const [firebaseDataHome, setFirebaseDataHome] = useState([]);

    useEffect(() => {
        fetchDataHome()
    }, []);

    const fetchDataHome = async () => {
        await firebase.database().ref("/home").once("value")
            .then(snapshot => {
                setFirebaseDataHome(Object.values(snapshot.val()));
            })
            .catch((error) => {
                console.error(error)
            })
    };

    return (
        <Layout>
            <StyledBackgroundSection pathName={path.replace("/", "")}/>
            <Category firebaseDataArticles={firebaseDataHome} pathName={path}/>
            <SEO title="Home"/>
        </Layout>
    )
};

export default IndexPage
