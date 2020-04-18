import React, {useEffect, useState} from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import StyledBackgroundSection from "../components/BackgroundSection";
import {getFirebase} from "../firebase";
import Articles from "../components/Articles";

const SecondPage = ({path}) => {
    const [firebaseDataApartments, setFirebaseDataApartments] = useState([]);

    useEffect(() => {
        const lazyApp = import('firebase/app')
        const lazyDatabase = import('firebase/database')

        Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
            getFirebase(firebase).database().ref("/pagesPicturesData/apartments").once("value")
                .then(snapshot => {
                    return setFirebaseDataApartments(Object.values(snapshot.val()));
                })
                .catch((error) => {
                    console.error(error)
                })
        })
    }, []);

    return (
        <Layout>
            <SEO title="Apartments"/>
            {/*<StyledBackgroundSection pathName={path.replace("/", "")}/>*/}
            {<Articles firebaseDataArticles={firebaseDataApartments} pathName={path}/>}
        </Layout>
    )
};

export default SecondPage
