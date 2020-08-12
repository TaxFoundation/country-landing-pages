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

  const itciTemplate = path.resolve('./src/components/ITCI.js');
  const consumptionTemplate = path.resolve('./src/components/Consumption.js');
  const corporateTemplate = path.resolve('./src/components/CorporateTax.js');
  const internationalTemplate = path.resolve(
    './src/components/International.js'
  );
  const propertyTemplate = path.resolve('./src/components/PropertyTax.js');
  const sourcesOfRevenueTemplate = path.resolve(
    './src/components/SourcesOfRevenue.js'
  );
  const individualTemplate = path.resolve('./src/components/Individual.js');

  result.data.allCountriesCsv.edges.forEach(({ node }) => {
    createPage({
      path: path.join('itci', _.kebabCase(node.name)),
      component: itciTemplate,
      context: {
        iso3: node.iso3,
        name: node.name,
      },
    });
    createPage({
      path: path.join('consumption', _.kebabCase(node.name)),
      component: consumptionTemplate,
      context: {
        iso3: node.iso3,
        name: node.name,
      },
    });
    createPage({
      path: path.join('corporate', _.kebabCase(node.name)),
      component: corporateTemplate,
      context: {
        iso3: node.iso3,
        name: node.name,
      },
    });
    createPage({
      path: path.join('international', _.kebabCase(node.name)),
      component: internationalTemplate,
      context: {
        iso3: node.iso3,
        name: node.name,
      },
    });
    createPage({
      path: path.join('property', _.kebabCase(node.name)),
      component: propertyTemplate,
      context: {
        iso3: node.iso3,
        name: node.name,
      },
    });
    createPage({
      path: path.join('sources-of-revenue', _.kebabCase(node.name)),
      component: sourcesOfRevenueTemplate,
      context: {
        iso3: node.iso3,
        name: node.name,
      },
    });
    createPage({
      path: path.join('individual', _.kebabCase(node.name)),
      component: individualTemplate,
      context: {
        iso3: node.iso3,
        name: node.name,
      },
    });
  });
};
