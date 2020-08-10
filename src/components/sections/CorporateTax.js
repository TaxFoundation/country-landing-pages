import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { capitalize } from 'lodash';

import { ChartTabs, ChartTab } from '../ui/ChartTabs';
import CorpTaxChart from '../charts/CorporateTax';

const CorporateTax = ({ data }) => {
  const [activeTab, setActiveTab] = useState('corp-time-series');
  const country = { ...data.countriesCsv };
  const theData = data.allCountryCorporateTaxRatesCsv.edges
    .filter(edge => !Number.isNaN(+edge.node.rate))
    .map(edge => ({
      year: +edge.node.year,
      rate: +edge.node.rate,
    }));
  const worldwide = data.allWorldwideCorporateTaxRatesCsv.edges.map(
    edge => edge.node
  );
  const tabOptions = [
    {
      name: 'Corporate Tax Time Series',
      id: 'corp-time-series',
    },
    // {
    //   name: 'Corporate Tax Map',
    //   id: 'corp-tax-map',
    // },
    // {
    //   name: 'Cost Recovery Time Series',
    //   id: 'cost-recovery-time-series',
    // },
    // {
    //   name: 'Cost Recovery Map',
    //   id: 'cost-recovery-map',
    // },
  ];
  return (
    <div>
      <ChartTabs>
        {tabOptions.map(choice => (
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
      {activeTab === 'corp-time-series' && (
        <React.Fragment>
          <CorpTaxChart
            title={`${
              country.article ? capitalize(country.article) + ' ' : ''
            }${country.name}`}
            data={theData
              .map(entry => {
                return { year: +entry.year, rate: +entry.rate };
              })
              .sort((a, b) => a.year - b.year)}
            worldwide={worldwide}
          />
          <p>
            Note: Data is unavailable for any years not graphed above. For more
            information, including original data sources, see our{' '}
            <a href='https://taxfoundation.org/publications/corporate-tax-rates-around-the-world/'>
              detailed report
            </a>
            .
          </p>
        </React.Fragment>
      )}
    </div>
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
    allCountryCorporateTaxRatesCsv(
      filter: { iso_3: { eq: $iso3 } }
      sort: { fields: year, order: ASC }
    ) {
      edges {
        node {
          year
          rate
        }
      }
    }
    allWorldwideCorporateTaxRatesCsv {
      edges {
        node {
          average
          year
          weighted {
            average
          }
        }
      }
    }
  }
`;

CorporateTax.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CorporateTax;
