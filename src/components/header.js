import PropTypes from "prop-types"
import React from "react"
import styled from 'styled-components';

import StyledBackgroundSection from "./BackgroundSection";


const Header = ({siteTitle}) => {

    const Header = styled.header`
    background:
        linear-gradient(180deg, rgba(0, 0, 0, 0.95), rgba(28, 28, 28, 0.3)),
        url("https://assets.hotelplan.com/content/HP/00/039/990/country/fr/lightbox/026927.jpg") no-repeat center center / cover ;
    color: ${props => props.theme.color.primary};
    text-transform: uppercase;
    `;



    return (
        <Header>
            <StyledBackgroundSection/>

        </Header>
    )
};

Header.propTypes = {
    siteTitle: PropTypes.string,
};

Header.defaultProps = {
    siteTitle: ``,
};

export default Header
