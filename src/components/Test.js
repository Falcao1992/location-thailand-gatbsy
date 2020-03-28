import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
const Test = () => {
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
    }}
  }


  `)

    const allImageproject = data.allImageSharp.edges

    return (
        <div>
            {allImageproject.map((image, index) => {
                return (
                    <div key={index}>
                        <Img
                            fluid={image.node.fluid}
                        />
                        <p>{image.node.fluid.originalName.replace(/.jpg|.png/ ,"")}</p>
                    </div>
                )
            } )}
        </div>
    )
}

export default Test
