import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components";

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const Image = ({categoryKey, pathName}) => {
  const data = useStaticQuery(graphql`
      query {
          activityCategory: file(relativePath: { eq: "category/activitesCategory.jpg" }) {
              childImageSharp {
                  fluid(maxWidth: 300) {
                      ...GatsbyImageSharpFluid
                  }
              }
          }
          
          lieux_interetsCategory: file(relativePath: { eq: "category/lieux_interetsCategory.jpg" }) {
              childImageSharp {
                  fluid(maxWidth: 300) {
                      ...GatsbyImageSharpFluid
                  }
              }
          }
          
          residencesCategory: file(relativePath: { eq: "category/residencesCategory.jpg" }) {
              childImageSharp {
                  fluid(maxWidth: 300) {
                      ...GatsbyImageSharpFluid
                  }
              }
          }
          
          savoirCategory: file(relativePath: { eq: "category/savoirCategory.jpg" }) {
              childImageSharp {
                  fluid(maxWidth: 300) {
                      ...GatsbyImageSharpFluid
                  }
              }
          }
          
          
          residenceAmazonPiscine: file(relativePath: { eq: "picturesResidenceAmazon/residenceAmazonPiscine.jpg" }) {
              childImageSharp {
                  fluid(maxWidth: 300) {
                      ...GatsbyImageSharpFluid
                  }
              }
          }
          
          residenceAmazonRestaurant: file(relativePath: { eq: "picturesResidenceAmazon/residenceAmazonRestaurant.jpg" }) {
              childImageSharp {
                  fluid(maxWidth: 300) {
                      ...GatsbyImageSharpFluid
                  }
              }
          }
          
          residenceAmazonSalon: file(relativePath: { eq: "picturesResidenceAmazon/residenceAmazonSalon.jpg" }) {
              childImageSharp {
                  fluid(maxWidth: 300) {
                      ...GatsbyImageSharpFluid
                  }
              }
          }
          
          residenceAmazonSport: file(relativePath: { eq: "picturesResidenceAmazon/residenceAmazonSport.jpg" }) {
              childImageSharp {
                  fluid(maxWidth: 300) {
                      ...GatsbyImageSharpFluid
                  }
              }
          }
      }
  `);

  const handleChooseCategoryImage = () => {
      if (categoryKey === "interets") {
          console.log(pathName)
          return lieux_interetsCategory
      } else if (categoryKey === "activity") {
          return activityCategory
      } else if (categoryKey === "residences") {
          return residencesCategory
      } else if (categoryKey === "savoir") {
          return savoirCategory
      } else if (categoryKey === "piscine") {
          return residenceAmazonPiscine
      } else if (categoryKey === "salon") {
          return residenceAmazonSalon
      } else if (categoryKey === "sport") {
          return residenceAmazonSport
      } else if (categoryKey === "restaurant") {
          return residenceAmazonRestaurant
      }
  };

  const activityCategory = data.activityCategory.childImageSharp.fluid;
  const lieux_interetsCategory = data.lieux_interetsCategory.childImageSharp.fluid;
  const residencesCategory = data.residencesCategory.childImageSharp.fluid;
  const savoirCategory = data.savoirCategory.childImageSharp.fluid;

  const residenceAmazonPiscine = data.residenceAmazonPiscine.childImageSharp.fluid;
  const residenceAmazonSalon = data.residenceAmazonSalon.childImageSharp.fluid;
  const residenceAmazonSport = data.residenceAmazonSport.childImageSharp.fluid;
  const residenceAmazonRestaurant = data.residenceAmazonRestaurant.childImageSharp.fluid;



  return <StyledImg
      fluid={handleChooseCategoryImage()}
  />
};

const StyledImg = styled(Img)`
    border: ${props => props.theme.color.secondary} 1px solid;
    margin-bottom: 20px;
    `;

export default Image
