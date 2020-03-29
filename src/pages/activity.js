import React, {useEffect, useState} from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import StyledBackgroundSection from "../components/BackgroundSection";
import firebase from "gatsby-plugin-firebase";
import Articles from "../components/Articles";


const Activty = ({path}) => {
    const [firebaseDataActivity, setFirebaseDataActivity] = useState([]);

    useEffect(() => {
        fetchDataActivity()
    }, []);

    const fetchDataActivity = async () => {
        await firebase.database().ref("/pagesPicturesData/activity").once("value")
            .then(snapshot => {
                return setFirebaseDataActivity(Object.values(snapshot.val()));
            })
            .catch((error) => {
                console.error(error)
            })
    };
    return (
        <Layout>
            <SEO title="Activity"/>
            <StyledBackgroundSection pathName={path.replace("/", "")}/>
            <Articles firebaseDataArticles={firebaseDataActivity} pathName={path}/>
        </Layout>
    )
};

export default Activty
