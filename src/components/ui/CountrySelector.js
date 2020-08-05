import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { kebabCase } from 'lodash';

const StyledCountrySelector = styled.div`
  border: 3px solid #e0592a;
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

  .button {
    align-content: center;
    background-color: #e0592a;
    border: 1px solid #e0592a;
    font-size: 1rem;
    color: white;
    display: grid;
    justify-content: center;
    text-decoration: none;
    transition: background-color 0.2s ease-in-out, border 0.2s ease-in-out;
    width: 100%;

    &:hover {
      background-color: #f0795a;
      border: 1px solid #f0795a;
    }
  }
`;

const CountrySelector = ({ current }) => {
  const [selectedCountry, setSelectedCountry] = useState(current);
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
      <select
        value={selectedCountry}
        onChange={e => setSelectedCountry(e.target.value)}
      >
        {countries.map(country => (
          <option
            key={`country-option-${kebabCase(country.name)}`}
            value={kebabCase(country.name)}
          >
            {country.name}
          </option>
        ))}
      </select>
      <a
        className='button'
        href={`https://taxfoundation.org/countries/${selectedCountry}`}
      >
        Launch Data Explorer
      </a>
    </StyledCountrySelector>
  );
};

CountrySelector.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object),
  current: PropTypes.string,
};

export default CountrySelector;
