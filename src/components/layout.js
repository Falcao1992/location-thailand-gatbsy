/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import "./layout.css"
import theme from '../assets/theme'
import {ThemeProvider} from "styled-components";
import styled from "styled-components";

const Layout = ({children}) => {

    return (
        <ThemeProvider theme={theme}>
            <div>
                <main>{children}</main>
                <Footer>
                    © {new Date().getFullYear()}, Built with
                    {` `}
                    <a href="https://www.gatsbyjs.org">Gatsby</a> By Eduardo Lépine
                </Footer>
            </div>
        </ThemeProvider>
    )
};

const Footer = styled.footer`
        height: 200px;
        background-color: ${props => props.theme.color.primary};
        `;

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout
