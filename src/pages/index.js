import React, {useState,useEffect} from "react"
import {Link} from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import firebase from "gatsby-plugin-firebase"


const IndexPage = () => {
    const [firebaseData, setFirebaseData] = useState([])

    useEffect(() => {
        firebase
            .database()
            .ref("/test")
            .once("value")
            .then(snapshot => {
                setFirebaseData(snapshot.val())
            })
    }, [])
    return (
        <Layout>
            <SEO title="Home"/>
                <Image/>
            <Link to="/page-2/">Go to page 2</Link>
        </Layout>

    )
}

export default IndexPage
