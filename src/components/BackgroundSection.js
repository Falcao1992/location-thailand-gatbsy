import React from 'react'
import {graphql, Link, useStaticQuery} from 'gatsby'
import styled from 'styled-components'
import "typeface-pinyon-script"
import BackgroundImage from 'gatsby-background-image-es5'
import PropTypes from "prop-types";


const BackgroundSection = ({ className, pathName }) => {

    const data = useStaticQuery(graphql`
        query {
      
            homeBanner: file(relativePath: { eq: "banner/homeBanner.jpg" }) {
                childImageSharp {
                    fluid(quality: 90, maxWidth: 1920) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            
            apartmentsBanner: file(relativePath: { eq: "banner/apartmentsBanner.jpg" }) {
                childImageSharp {
                    fluid(quality: 90, maxWidth: 1920) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            activityBanner: file(relativePath: { eq: "banner/activityBanner.jpg" }) {
                childImageSharp {
                    fluid(quality: 90, maxWidth: 1920) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            aboutBanner: file(relativePath: { eq: "banner/aboutBanner.jpg" }) {
                childImageSharp {
                    fluid(quality: 90, maxWidth: 1920) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
        }
    `);

    const homeBanner = data.homeBanner.childImageSharp.fluid;
    const apartmentsBanner = data.apartmentsBanner.childImageSharp.fluid;
    const aboutBanner = data.aboutBanner.childImageSharp.fluid;
    const activityBanner = data.activityBanner.childImageSharp.fluid;

    const handleChooseBackgroundImage = () => {
        if(pathName === "") {
            return homeBanner
        } else if (pathName === "apartments/") {
            return apartmentsBanner
        } else if (pathName === "activity/") {
            return activityBanner
        } else if (pathName === "about/") {
            return aboutBanner
        } else {
            console.log("else", pathName)
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
                    <Link to="/" ><MenuItem>Location d'Appartements à Pattaya</MenuItem></Link>
                </div>
                <nav>
                    <Link to="/apartments" ><MenuItem>Appartement</MenuItem></Link>
                    <Link to="/activity"><MenuItem>Activité</MenuItem></Link>
                    <Link to="/about"><MenuItem>A Savoir</MenuItem></Link>
                    <Link to="/"><MenuItem>Nous contacter</MenuItem></Link>
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
