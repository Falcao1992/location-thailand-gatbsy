import React, {useEffect, useState} from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import StyledBackgroundSection from "../components/BackgroundSection";
import firebase from "gatsby-plugin-firebase";
import Category from "../components/Category";
import Test from "../components/Test";

const SecondPage = ({path}) => {
    const [firebaseDataApartments, setFirebaseDataApartments] = useState([]);

    useEffect(() => {
        firebase
            .database()
            .ref("/pagesPicturesData/apartments")
            .once("value")
            .then(snapshot => {
                setFirebaseDataApartments(Object.values(snapshot.val()));
            })
    }, []);

    return (
    <Layout>
        <SEO title="Apartments"/>
        <StyledBackgroundSection pathName={path.replace("/","")}/>
        <Category firebaseDataArticles={firebaseDataApartments} pathName={path}/>
        <Test/>
    </Layout>
    )
};

export default SecondPage
