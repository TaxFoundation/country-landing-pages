module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/public/data`,
      },
    },
    `gatsby-transformer-csv`,
    `gatsby-plugin-styled-components`,
  ],
};
