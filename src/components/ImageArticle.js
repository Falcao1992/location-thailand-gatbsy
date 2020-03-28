import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components";
const ImageArticle = ( { articleImageId } ) => {

    const data = useStaticQuery(graphql`
        {
            allImageSharp {
                edges {
                    node {
                        id
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

    const allImagesData = data.allImageSharp.edges;

    return (
        <div>
            {allImagesData.filter(imageFilter => imageFilter.node.id === articleImageId).map((image, index) => {
                return (
                        <StyledImg
                            key={index}
                            fluid={image.node.fluid}
                        />
                )
            } )}
        </div>
    )
};

const StyledImg = styled(Img)`
    border: ${props => props.theme.color.secondary} 1px solid;
    margin-bottom: 20px;
    `;

export default ImageArticle
