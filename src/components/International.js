import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Wrapper from './ui/Wrapper';
import { ChartTabs, ChartTab } from './ui/ChartTabs';
import TaxTreatiesChart from './charts/TaxTreatiesChart';

const International = ({ data }) => {
  const [activeTab, setActiveTab] = useState('tax-treaties');
  const country = { ...data.countriesCsv };
  const itciMaxYear = Math.max(
    ...data.allIndexRawDataCsv.edges.map(edge => +edge.node.year)
  );
  const theData = data.allIndexRawDataCsv.edges
    .filter(edge => +edge.node.year === itciMaxYear)
    .map(edge => {
      return {
        iso3: edge.node.ISO_3,
        taxTreaties: +edge.node.tax_treaties,
      };
    });
  const tabOptions = [
    {
      name: `Tax Treaties`,
      id: 'tax-treaties',
    },
  ];
  return (
    <Wrapper>
      <ChartTabs>
        {tabOptions.length > 1 &&
          tabOptions.map(choice => (
            <ChartTab
              key={`rank-choice-${choice.id}`}
              active={activeTab === choice.id}
            >
              <button onClick={() => setActiveTab(choice.id)}>
                {choice.name}
              </button>
            </ChartTab>
          ))}
      </ChartTabs>
      {activeTab === 'tax-treaties' && (
        <TaxTreatiesChart
          title={`Number of Tax Treaties  in ${
            country.article ? country.article + ' ' : ''
          }${country.name} vs. the OECD`}
          data={theData}
          countryID={country.iso3}
        />
      )}
    </Wrapper>
  );
};

export const query = graphql`
  query($iso3: String!) {
    countriesCsv(iso3: { eq: $iso3 }) {
      iso2
      iso3
      name
      adjective
      article
    }
    allIndexRawDataCsv {
      edges {
        node {
          ISO_3
          year
          tax_treaties
        }
      }
    }
  }
`;

International.propTypes = {
  data: PropTypes.object.isRequired,
};

export default International;
