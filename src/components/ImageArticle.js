import React from "react"
import {useStaticQuery, graphql} from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components";

const ImageArticle = ({articleImageUrl}) => {

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
                                    name
                                }
                            }
                        }
                        fluid(maxWidth: 500) {
                            ...GatsbyImageSharpFluid
                            originalName
                        }
                        resolutions {
                          height
                          width
                        }
                    }
                }
            }
        }
    `);

    const allImagesData = data.allImageSharp.edges;
    console.log("allImagesData", allImagesData)

    return (
        <>
            {allImagesData.filter(imageFilter => imageFilter.node.parent.parent.urlImage === articleImageUrl).map((image, index) => {
                return (
                    <ContainerImg key={index}>
                        {image.node.resolutions.height > image.node.resolutions.width ?
                            <StyledImgPortrait
                                fluid={image.node.fluid}
                                alt={image.node.fluid.originalName.replace(/.jpg/ || /.png/, "")}
                            />
                            :
                            <StyledImg
                            fluid = {image.node.fluid}
                            alt={image.node.fluid.originalName.replace(/.jpg/ || /.png/, "")}
                            />
                        }
                    </ContainerImg>
                )
            })}
        </>
    )
};

const ContainerImg = styled.div`
    @media only screen and (min-width:980px) {
        position: relative;
            width: 40%;
    margin-right: auto;
        align-self: center;                            
    }
`;

const StyledImg = styled(Img)`
    border: ${props => props.theme.color.secondary} 1px solid;
    margin-bottom: 20px;
    @media only screen and (min-width:980px) {    
        border: none;
        width: 30vw;     
        position: relative;
        z-index: 1;
        height: auto;
        overflow: visible !important;
        &::before {
            content: "";
            border: #C89446 1px solid;
            width: 100%;
            height: 100%;
            top: -30px;
            left: -30px;
            position: absolute;
            z-index: -0;
        }     
    }
    `;
const StyledImgPortrait = styled(Img)`
    border: ${props => props.theme.color.secondary} 1px solid;
    margin-bottom: 20px;
    @media only screen and (min-width:980px) {    
        border: none;
        width: 20vw;     
        position: relative;
        z-index: 1;
        height: auto;
        overflow: visible !important;
        &::before {
            content: "";
            border: #C89446 1px solid;
            width: 100%;
            height: 100%;
            top: -30px;
            left: -30px;
            position: absolute;
            z-index: -0;
        }     
    }
    `;

export default ImageArticle
