import React, {useEffect, useState} from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import StyledBackgroundSection from "../components/BackgroundSection";
import Articles from "../components/Articles";
import app from "../firebase";

const Activty = ({path}) => {
    const [firebaseDataActivity, setFirebaseDataActivity] = useState([]);

    useEffect(() => {
        fetchDataActivity()
    }, []);

    const fetchDataActivity = async () => {
        await app.database().ref("/pagesPicturesData/activity").once("value")
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
            {<StyledBackgroundSection pathName={path.replace("/", "")}/>}
            <Articles firebaseDataArticles={firebaseDataActivity} pathName={path}/>
        </Layout>
    )
};

export default Activty
