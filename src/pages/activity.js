import React, {useEffect, useState} from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import StyledBackgroundSection from "../components/BackgroundSection";
import Articles from "../components/Articles";
import {getFirebase} from "../firebase";

const Activty = ({path}) => {
    const [firebaseDataActivity, setFirebaseDataActivity] = useState([]);

    useEffect(() => {
        const lazyApp = import('firebase/app')
        const lazyDatabase = import('firebase/database')

        Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
            getFirebase(firebase).database().ref("/pagesPicturesData/activity").once("value")
                .then(snapshot => {
                    return setFirebaseDataActivity(Object.values(snapshot.val()));
                })
                .catch((error) => {
                    console.error(error)
                })
        })
    }, []);

    return (
        <Layout>
            <SEO title="Activity"/>
            {/*<StyledBackgroundSection pathName={path.replace("/", "")}/>*/}
            {<Articles firebaseDataArticles={firebaseDataActivity} pathName={path}/>}
        </Layout>
    )
};

export default Activty
