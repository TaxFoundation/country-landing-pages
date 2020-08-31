import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { capitalize } from 'lodash';

import Wrapper from './ui/Wrapper';
import { ChartTabs, ChartTab } from './ui/ChartTabs';
import { KeyFigures, KeyFigure } from './ui/KeyFigures';
import CorpTaxChart from './charts/CorporateTax';

const CorporateTax = ({ data }) => {
  const [activeTab, setActiveTab] = useState('corp-time-series');
  const country = { ...data.countriesCsv };
  const theData = data.allCountryCorporateTaxRatesCsv.nodes
    .filter(node => !Number.isNaN(+node.rate))
    .map(node => ({
      year: +node.year,
      rate: +node.rate,
    }));
  const currentRate = theData.reduce((acc, curr) =>
    curr.year > acc.year ? curr : acc
  );
  const worldwide = data.allWorldwideCorporateTaxRatesCsv.nodes;
  const averageCapitalAllowance =
    Math.round(
      ((+data.indexRawDataCsv.buildings_cost_recovery +
        +data.indexRawDataCsv.machines_cost_recovery +
        +data.indexRawDataCsv.intangibles_cost_recovery) *
        1000) /
        3
    ) / 10;
  const tabOptions = [
    {
      name: 'Corporate Tax Rate',
      id: 'corp-time-series',
    },
    // {
    //   name: 'Corporate Tax Map',
    //   id: 'corp-tax-map',
    // },
    // {
    //   name: 'Cost Recovery',
    //   id: 'cost-recovery-time-series',
    // },
    // {
    //   name: 'Cost Recovery Map',
    //   id: 'cost-recovery-map',
    // },
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
            <a
              href='https://taxfoundation.org/publications/corporate-tax-rates-around-the-world/'
              target='_blank'
              rel='noopener noreferrer'
            >
              detailed report
            </a>
            .
          </p>
        </React.Fragment>
      )}
      <KeyFigures>
        <KeyFigure>
          <h3>Share of Revenue from Corporate Income Tax</h3>
          <div>{`${data.sourceRevenueByCountryCsv.Corporate_Taxes}%`}</div>
        </KeyFigure>
        <KeyFigure>
          <h3>Top Corporate Income Tax Rate</h3>
          <div>{`${Math.round(currentRate.rate * 10) / 10}%`}</div>
        </KeyFigure>
        <KeyFigure>
          <h3>Average Capital Allowance</h3>
          <div>{`${averageCapitalAllowance}%`}</div>
        </KeyFigure>
      </KeyFigures>
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
    allCountryCorporateTaxRatesCsv(
      filter: { iso_3: { eq: $iso3 } }
      sort: { fields: year, order: ASC }
    ) {
      nodes {
        year
        rate
      }
    }
    allWorldwideCorporateTaxRatesCsv {
      nodes {
        average
        year
        weighted {
          average
        }
      }
    }
    sourceRevenueByCountryCsv(iso_3: { eq: $iso3 }) {
      Corporate_Taxes
    }
    indexRawDataCsv(ISO_3: { eq: $iso3 }) {
      buildings_cost_recovery
      machines_cost_recovery
      intangibles_cost_recovery
    }
  }
`;

CorporateTax.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CorporateTax;
