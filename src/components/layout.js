import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { kebabCase } from 'lodash';

import CountryDescription from './ui/CountryDescription';
import CountrySelector from './ui/CountrySelector';
import TabbedSections from './ui/TabbedSections';

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;

  * {
    font-family: 'Lato', sans-serif;
  }
`;

const TopSection = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template: repeat(2, auto) / 1fr;

  @media (min-width: 600px) {
    grid-gap: 2rem;
    grid-template: auto / 5fr 2fr;
  }
`;

const Layout = ({ data }) => {
  const country = { ...data.countriesCsv };
  return (
    <Container>
      <TopSection>
        <CountryDescription country={country.name}></CountryDescription>
        <CountrySelector
          countries={[]}
          current={kebabCase(country.name)}
        ></CountrySelector>
      </TopSection>
      <TabbedSections></TabbedSections>
    </Container>
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
