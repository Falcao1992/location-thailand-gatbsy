import React, {useEffect, useState} from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import StyledBackgroundSection from "../components/BackgroundSection";
import firebase from "gatsby-plugin-firebase";
import Category from "../components/Category";

const SecondPage = ({path}) => {
    const [firebaseDataApartments, setFirebaseDataApartments] = useState([]);

    useEffect(() => {
        fetchDataApartments()
    }, []);

    const fetchDataApartments = async () => {
        await firebase.database().ref("/pagesPicturesData/apartments").once("value")
            .then(snapshot => {
                return setFirebaseDataApartments(Object.values(snapshot.val()));
            })
            .catch((error) => {
                console.error(error)
            })
    };

    return (
        <Layout>
            <SEO title="Apartments"/>
            <StyledBackgroundSection pathName={path.replace("/", "")}/>
            <Category firebaseDataArticles={firebaseDataApartments} pathName={path}/>

        </Layout>
    )
};

export default SecondPage
