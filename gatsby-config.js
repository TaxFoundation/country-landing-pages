module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    `gatsby-transformer-csv`,
    `gatsby-plugin-remove-fingerprints`,
    'gatsby-plugin-no-sourcemaps',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    ,
  ],
  assetPrefix:
    // 'http://localhost/wp-content/themes/tf-wp-theme/templates/country-landing-pages',
    // 'https://taxfoundation.org/wp-content/themes/tf-wp-theme/templates/country-landing-pages',
    'https://tf-country-landing-pages.netlify.app',
};
