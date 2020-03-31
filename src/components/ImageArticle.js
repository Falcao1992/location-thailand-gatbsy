import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components";
const ImageArticle = ( { articleImageUrl } ) => {

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

    const allImagesData = data.allImageSharp.edges;

    return (
        <div>
            {allImagesData.filter(imageFilter => imageFilter.node.parent.parent.urlImage === articleImageUrl).map((image, index) => {
                return (
                    <div id={image.node.id} key={index}>
                        <StyledImg
                            fluid={image.node.fluid}
                            alt={image.node.fluid.originalName.replace(/.jpg/||/.png/, "")}
                        />
                    </div>
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
