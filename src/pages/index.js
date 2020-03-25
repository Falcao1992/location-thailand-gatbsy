import React, {useState,useEffect} from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import firebase from "gatsby-plugin-firebase"
import StyledBackgroundSection from "../components/BackgroundSection";


const IndexPage = () => {
    const [firebaseData, setFirebaseData] = useState([]);

    useEffect(() => {
        firebase
            .database()
            .ref("/test")
            .once("value")
            .then(snapshot => {
                setFirebaseData(snapshot.val())
            })
    }, []);

    return (
        <Layout>
            <StyledBackgroundSection />
            <SEO title="Home"/>
        </Layout>

    )
};

export default IndexPage
