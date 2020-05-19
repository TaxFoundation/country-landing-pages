import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { kebabCase } from 'lodash';

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
    <div>
      <h2>Choose a Country</h2>
      <p>Get facts about taxes in your country and around the world.</p>
      <select value={current} onChange={e => console.log(e.target.value)}>
        {countries.map(country => (
          <option
            key={`country-option-${kebabCase(country.name)}`}
            value={kebabCase(country.name)}
          >
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

CountrySelector.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object),
  current: PropTypes.string,
};

export default CountrySelector;
