import React, {useEffect, useState} from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import StyledBackgroundSection from "../components/BackgroundSection";
import Articles from "../components/Articles";

import {getFirebase} from "../firebase";


const IndexPage = ({path}) => {
    const [firebaseDataHome, setFirebaseDataHome] = useState([]);

    useEffect(() => {
        const lazyApp = import('firebase/app')
        const lazyDatabase = import('firebase/database')

        Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
            getFirebase(firebase).database().ref("/pagesPicturesData/home").once("value")
                .then(snapshot => {
                    setFirebaseDataHome(Object.values(snapshot.val()));
                })
                .catch((error) => {
                    console.error(error)
                })
        })
    }, []);


    return (
        <Layout>
            {/*<StyledBackgroundSection pathName={path}/>*/}
            {<Articles firebaseDataArticles={firebaseDataHome} pathName={path}/>}
            <SEO title="Home"/>
        </Layout>
    )
};

export default IndexPage
