import React, {useEffect, useState} from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import StyledBackgroundSection from "../components/BackgroundSection";
import {getFirebase} from "../firebase";
import Articles from "../components/Articles";


const About = ({path}) => {
    const [firebaseDataAbout, setFirebaseDataAbout] = useState([]);

    useEffect(() => {
        const lazyApp = import('firebase/app')
        const lazyDatabase = import('firebase/database')

        Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
            getFirebase(firebase).database().ref("/pagesPicturesData/about").once("value")
                .then(snapshot => {
                    return setFirebaseDataAbout(Object.values(snapshot.val()));
                })
                .catch((error) => {
                    console.error(error)
                })
        })
    }, []);

    return (
        <Layout>
            <SEO title="Activity"/>
            {firebaseDataAbout && <StyledBackgroundSection pathName={path.replace("/", "")}/>}
            {<Articles firebaseDataArticles={firebaseDataAbout} pathName={path}/>}
        </Layout>
    )
};

export default About
