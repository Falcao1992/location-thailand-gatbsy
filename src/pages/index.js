import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import StyledBackgroundSection from "../components/BackgroundSection";
import Category from "../components/Category";


const IndexPage = () => {

    return (
        <Layout>
            <StyledBackgroundSection />
            <Category/>
            <SEO title="Home"/>
        </Layout>

    )
};

export default IndexPage
