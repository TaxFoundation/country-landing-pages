/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { kebabCase } from 'lodash';

import CountryDescription from './ui/CountryDescription';
import CountrySelector from './ui/CountrySelector';
import TabbedSections from './ui/TabbedSections';

const Layout = ({ data }) => {
  const country = { ...data.countriesCsv };
  return (
    <div>
      <div>
        <CountryDescription country={country.name}></CountryDescription>
        <CountrySelector
          countries={[]}
          current={kebabCase(country.name)}
        ></CountrySelector>
      </div>
      <TabbedSections></TabbedSections>
    </div>
  );
};

export const query = graphql`
  query($iso3: String!) {
    countriesCsv(iso3: { eq: $iso3 }) {
      iso2
      iso3
      name
    }
  }
`;

Layout.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Layout;
