const path = require('path');
const _ = require('lodash');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query countries {
      allCountriesCsv {
        edges {
          node {
            name
            iso2
            iso3
          }
        }
      }
    }
  `);
  result.data.allCountriesCsv.edges.forEach(({ node }) => {
    createPage({
      path: _.kebabCase(node.name),
      component: path.resolve('./src/components/layout.js'),
      context: {
        iso3: node.iso3,
        name: node.name,
      },
    });
  });
};
