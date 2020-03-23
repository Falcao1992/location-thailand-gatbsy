require("dotenv").config()

module.exports = {
    siteMetadata: {
        title: `Location d'Appartements à Pattaya`,
        description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
        author: `@gatsbyjs`,
    },
    plugins: [
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-background-image-es5`,

        {
            resolve: 'gatsby-background-image-es5',
            options: {
                // add your own characters to escape, replacing the default ':/'
                specialChars: '/:',
            },
        },
        {
            resolve: "gatsby-plugin-firebase",
            options: {
                credentials: {
                    apiKey: process.env.GATSBY_API_KEY,
                    authDomain: process.env.GATSBY_AUTH_DOMAIN,
                    databaseURL: process.env.GATSBY_DATABASE_URL,
                    projectId: process.env.GATSBY_PROJECT_ID,
                    storageBucket: process.env.GATSBY_STORAGE_BUCKET,
                    messagingSenderId: process.env.GATSBY_MESSAGING_SENDER_ID,
                    appId: process.env.GATSBY_APP_ID
                }
            }
        },
        {
            resolve: `gatsby-plugin-styled-components`,
            options: {
                // Add any options here
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}
