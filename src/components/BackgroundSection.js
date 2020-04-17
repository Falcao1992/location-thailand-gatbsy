import React from 'react'
import {graphql, Link, useStaticQuery} from 'gatsby'
import styled from 'styled-components'
import "typeface-pinyon-script"
import BackgroundImage from 'gatsby-background-image-es5'
import PropTypes from "prop-types";
import {formatPathName} from "./globalFunction/globalFunction";
import "./BackgroundSection.css"


const BackgroundSection = ({ className, pathName }) => {

    const data = useStaticQuery(graphql`
        {
            allImageSharp {
                edges {
                    node {
                        id
                        parent {
                            parent {
                                ... on firebaseData {
                                    urlImage
                                    type
                                    page
                                }
                            }
                        }
                        fluid(sizes: "") {
                            base64
                            originalImg
                            srcSet
                            src
                            sizes
                            aspectRatio
                            originalName
                        }
                    }
                }
            }
        }
    `);

    const handleChooseBackgroundImage = () => {
            const allImagesDataBanner = data.allImageSharp.edges;
            pathName = formatPathName(pathName)
            const imageFilter = allImagesDataBanner.filter(imageFilter => imageFilter.node.parent.parent.type === "banner" && imageFilter.node.parent.parent.page === pathName);
            return [`linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(28, 28, 28, 0.1))`, imageFilter[0].node.fluid]
    };


    const pathMatch = (pathPage) => {
        if(pathName === pathPage) {
            return "linkActive"
        }
    };

    return (
        <BackgroundImage
            Tag="section"
            className={className}
            fluid={handleChooseBackgroundImage()}
            //backgroundColor={`#040e18`}
        >
            <TopBar>
                <div>
                    <Link to="/" ><MenuItem className={pathMatch("home")}>Location d'Appartements à Pattaya</MenuItem></Link>
                </div>
                <nav>
                    <Link  to="/apartments"><MenuItem className={pathMatch("apartments")}>Appartement</MenuItem></Link>
                    <Link  to="/activity"><MenuItem className={pathMatch("activity")}>Activité</MenuItem></Link>
                    <Link  to="/about"><MenuItem className={pathMatch("about")}>A Savoir</MenuItem></Link>
                    <Link  to="/contact"><MenuItem className={pathMatch("contact")}>Nous contacter</MenuItem></Link>
                </nav>
            </TopBar>
            <Baseline>
                <span>welcome</span>
                <strong>Pattaya</strong>
                <p>des appartements pour vos vacances</p>
            </Baseline>
        </BackgroundImage>
    )
};

const StyledBackgroundSection = styled(BackgroundSection)`
    color: ${props => props.theme.color.primary};
    text-transform: uppercase;
    `;

const TopBar = styled.div`
    padding-top: 20px;
    text-align: center;
        nav {
        padding-top: 15px
        }
    `;

const MenuItem = styled.span`
    font-size: .975rem;
    display: inline-block;
    margin: 0 15px;
    color: ${props => props.theme.color.primary};
    text-decoration: none;
    transition: color .3s;
        &:hover {
          color: ${props => props.theme.color.secondary};
        }
    `;

const Baseline = styled.div`
    text-align: center;
    display: block;
        span {
            font-family: 'pinyon script' , cursive;
            font-size: 3rem;
            text-align: center;
            display: block;
            color: ${props => props.theme.color.secondary};
            padding: 15px 0;
            letter-spacing: 2px;
            text-transform: none;
        }
        strong {
            display: block;
            font-size: 2.70rem;
            letter-spacing: 3px;
            padding: 10px 0;
        }
        p {
            display: block;
            padding: 10px 0;
            letter-spacing: 2px;
            font-size: .7rem;
        }
    `;

BackgroundSection.propTypes = {
    siteTitle: PropTypes.string,
};

BackgroundSection.defaultProps = {
    siteTitle: ``,
};


export default StyledBackgroundSection
