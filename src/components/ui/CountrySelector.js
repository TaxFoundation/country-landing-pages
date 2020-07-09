import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { kebabCase } from 'lodash';

const StyledCountrySelector = styled.div`
  border: 3px solid #0094ff;
  display: grid;
  grid-gap: 1rem;
  grid-template: repeat(4, auto) / auto;
  padding: 1rem;

  h2 {
    font-size: 1.6rem !important;
    font-style: normal !important;
    font-weight: 700 !important;
  }

  h2,
  p {
    margin: 0;
    text-align: center;
  }

  select {
    border: 1px solid #999;
    font-size: 1rem;
    width: 100%;
  }

  button {
    background-color: #0094ff;
    border: 1px solid #0094ff;
    font-size: 1rem;
    color: white;
    width: 100%;
  }
`;

const CountrySelector = ({ current }) => {
  const data = useStaticQuery(graphql`
    query {
      allCountriesCsv {
        edges {
          node {
            name
          }
        }
      }
    }
  `);

  const countries = data.allCountriesCsv.edges.map(n => {
    return n.node;
  });

  return (
    <StyledCountrySelector>
      <h2>Choose a Country</h2>
      <p>Get facts about taxes in your country and around the world.</p>
      <select value={current}>
        {countries.map(country => (
          <option
            key={`country-option-${kebabCase(country.name)}`}
            value={kebabCase(country.name)}
          >
            {country.name}
          </option>
        ))}
      </select>
      <button onClick={e => console.log(e.target.value)}>
        Launch Data Explorer
      </button>
    </StyledCountrySelector>
  );
};

CountrySelector.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object),
  current: PropTypes.string,
};

export default CountrySelector;
