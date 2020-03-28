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
          activityHome: file(relativePath: { eq: "homePicture/activityHome.jpg" }) {
              childImageSharp {
                  fluid(maxWidth: 300) {
                      ...GatsbyImageSharpFluid
                  }
              }
          }
          
          interestHome: file(relativePath: { eq: "homePicture/interestHome.jpg" }) {
              childImageSharp {
                  fluid(maxWidth: 300) {
                      ...GatsbyImageSharpFluid
                  }
              }
          }
          
          apartmentsHome: file(relativePath: { eq: "homePicture/apartmentsHome.jpg" }) {
              childImageSharp {
                  fluid(maxWidth: 300) {
                      ...GatsbyImageSharpFluid
                  }
              }
          }
          
          aboutHome: file(relativePath: { eq: "homePicture/aboutHome.jpg" }) {
              childImageSharp {
                  fluid(maxWidth: 300) {
                      ...GatsbyImageSharpFluid
                  }
              }
          }
          
          
          amazonSwimmingPool: file(relativePath: { eq: "apartmentsPicture/amazonPicture/amazonSwimmingPool.jpg" }) {
              childImageSharp {
                  fluid(maxWidth: 300) {
                      ...GatsbyImageSharpFluid
                  }
              }
          }
          
          amazonRestaurant: file(relativePath: { eq: "apartmentsPicture/amazonPicture/amazonRestaurant.jpg" }) {
              childImageSharp {
                  fluid(maxWidth: 300) {
                      ...GatsbyImageSharpFluid
                  }
              }
          }
          
          amazonRoomApartments: file(relativePath: { eq: "apartmentsPicture/amazonPicture/amazonRoomApartments.jpg" }) {
              childImageSharp {
                  fluid(maxWidth: 300) {
                      ...GatsbyImageSharpFluid
                  }
              }
          }
          
          amazonSports: file(relativePath: { eq: "apartmentsPicture/amazonPicture/amazonSports.jpg" }) {
              childImageSharp {
                  fluid(maxWidth: 300) {
                      ...GatsbyImageSharpFluid
                  }
              }
          }
      }
  `);

  const handleChooseCategoryImage = () => {
      console.log(categoryKey, "categoryKey")
      if (categoryKey === "interest") {
          return interestHome
      } else if (categoryKey === "activity") {
          console.log(activityHome)
          return activityHome
      } else if (categoryKey === "apartments") {
          return apartmentsHome
      } else if (categoryKey === "about") {
          return aboutHome
      } else if (categoryKey === "swimmingPool") {
          return amazonSwimmingPool
      } else if (categoryKey === "roomApartments") {
          return amazonRoomApartments
      } else if (categoryKey === "sports") {
          return amazonSports
      } else if (categoryKey === "restaurant") {
          return amazonRestaurant
      }
  };

  const activityHome = data.activityHome.childImageSharp.fluid;
  const interestHome = data.interestHome.childImageSharp.fluid;
  const apartmentsHome = data.apartmentsHome.childImageSharp.fluid;
  const aboutHome = data.aboutHome.childImageSharp.fluid;

  const amazonSwimmingPool = data.amazonSwimmingPool.childImageSharp.fluid;
  const amazonRoomApartments = data.amazonRoomApartments.childImageSharp.fluid;
  const amazonSports = data.amazonSports.childImageSharp.fluid;
  const amazonRestaurant = data.amazonRestaurant.childImageSharp.fluid;



  return <StyledImg
      fluid={handleChooseCategoryImage()}
  />
};

const StyledImg = styled(Img)`
    border: ${props => props.theme.color.secondary} 1px solid;
    margin-bottom: 20px;
    `;

export default Image
