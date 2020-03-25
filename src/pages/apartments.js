import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import StyledBackgroundSection from "../components/BackgroundSection";

const SecondPage = () => (
    <Layout>
        <StyledBackgroundSection />
        <SEO title="Apartments"/>
        <h1>Hi from the appartemeent page</h1>
        <p>Welcome to page 2</p>
    </Layout>
);

export default SecondPage
