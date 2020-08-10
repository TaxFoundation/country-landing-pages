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
      path: path.join('itci', _.kebabCase(node.name)),
      component: path.resolve('./src/components/sections/ITCI.js'),
      context: {
        iso3: node.iso3,
        name: node.name,
      },
    });
    createPage({
      path: path.join('consumption', _.kebabCase(node.name)),
      component: path.resolve('./src/components/sections/Consumption.js'),
      context: {
        iso3: node.iso3,
        name: node.name,
      },
    });
    createPage({
      path: path.join('corporate', _.kebabCase(node.name)),
      component: path.resolve('./src/components/sections/CorporateTax.js'),
      context: {
        iso3: node.iso3,
        name: node.name,
      },
    });
    createPage({
      path: path.join('international', _.kebabCase(node.name)),
      component: path.resolve('./src/components/sections/International.js'),
      context: {
        iso3: node.iso3,
        name: node.name,
      },
    });
    createPage({
      path: path.join('property', _.kebabCase(node.name)),
      component: path.resolve('./src/components/sections/PropertyTax.js'),
      context: {
        iso3: node.iso3,
        name: node.name,
      },
    });
    createPage({
      path: path.join('sources-of-revenue', _.kebabCase(node.name)),
      component: path.resolve('./src/components/sections/SourceOfRevenue.js'),
      context: {
        iso3: node.iso3,
        name: node.name,
      },
    });
    createPage({
      path: path.join('individual', _.kebabCase(node.name)),
      component: path.resolve('./src/components/sections/TaxBurdenOnLabor.js'),
      context: {
        iso3: node.iso3,
        name: node.name,
      },
    });
  });
};
