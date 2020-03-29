import React, {useEffect, useState} from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import StyledBackgroundSection from "../components/BackgroundSection";
import firebase from "gatsby-plugin-firebase";
import Articles from "../components/Articles";


const About = ({path}) => {
    const [firebaseDataAbout, setFirebaseDataAbout] = useState([]);

    useEffect(() => {
        fetchDataAbout()
    }, []);

    const fetchDataAbout = async () => {
        await firebase.database().ref("/pagesPicturesData/about").once("value")
            .then(snapshot => {
                return setFirebaseDataAbout(Object.values(snapshot.val()));
            })
            .catch((error) => {
                console.error(error)
            })
    };
    return (
        <Layout>
            <SEO title="Activity"/>
            <StyledBackgroundSection pathName={path.replace("/", "")}/>
            <Articles firebaseDataArticles={firebaseDataAbout} pathName={path}/>
        </Layout>
    )
};

export default About
