import React from "react";
import SEO from "../components/seo";
import StyledBackgroundSection from "../components/BackgroundSection";
import Articles from "../components/Articles";
import Layout from "../components/layout";
import ContactForm from "../components/ContactForm";

const Contact = ({path}) => {
    return (
        <Layout>
            <SEO title="Contact"/>
            <StyledBackgroundSection pathName={path.replace("/", "")}/>
            <ContactForm/>
        </Layout>
    )
};

export default Contact
