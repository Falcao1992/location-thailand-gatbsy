import React from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import styled from 'styled-components'
import "typeface-pinyon-script"
import BackgroundImage from 'gatsby-background-image-es5'
import PropTypes from "prop-types";

const BackgroundSection = ({className, siteTitle }) => {

    const data = useStaticQuery(graphql`
        query {
            banniereHome: file(relativePath: { eq: "banniere/banniere-home.jpg" }) {
                childImageSharp {
                    fluid(quality: 90, maxWidth: 1920) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            desktop2: file(relativePath: { eq: "banniere/gatsby-astronaut.png" }) {
                childImageSharp {
                    fluid(quality: 90, maxWidth: 1920) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
        }
    `);

    const imageBanniereHome = data.banniereHome.childImageSharp.fluid;
    const imageData2 = data.desktop2.childImageSharp.fluid;

    return (
        <BackgroundImage
            Tag="section"
            className={className}
            fluid={imageBanniereHome}
            //backgroundColor={`#040e18`}
        >
            <TopBar>
                <div className="acceuil">
                    <MenuItem href="#">{siteTitle}</MenuItem>
                </div>
                {console.log(imageBanniereHome)}
                {console.log(imageData2)}
                <nav>
                    <MenuItem href="#">Appartement</MenuItem>
                    <MenuItem href="#">Activité</MenuItem>
                    <MenuItem href="#">A Savoir</MenuItem>
                    <MenuItem href="#">Nous contacter</MenuItem>
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

const MenuItem = styled.a`
    font-size: .975rem;
    display: inline-block;
    margin: 0 15px;
    color: inherit;
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
