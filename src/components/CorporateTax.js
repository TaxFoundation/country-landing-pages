import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { capitalize } from 'lodash';

import Wrapper from './ui/Wrapper';
import { ChartTabs, ChartTab } from './ui/ChartTabs';
import { KeyFigures, KeyFigure } from './ui/KeyFigures';
import ReportsAndData from './ui/ReportsAndData';
import CorpTaxChart from './charts/CorporateTax';
import CostRecovery from './charts/CostRecovery';

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
  const currentCostRecovery = data.allIndexRawDataCsv.nodes.reduce(
    (acc, curr) => (curr.year > acc.year ? curr : acc)
  );
  const worldwide = data.allWorldwideCorporateTaxRatesCsv.nodes;
  const averageCapitalAllowance =
    Math.round(
      ((+currentCostRecovery.buildings_cost_recovery +
        +currentCostRecovery.machines_cost_recovery +
        +currentCostRecovery.intangibles_cost_recovery) *
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
    {
      name: 'Cost Recovery',
      id: 'cost-recovery-time-series',
    },
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
          <ReportsAndData
            report='https://taxfoundation.org/publications/corporate-tax-rates-around-the-world/'
            data='https://files.taxfoundation.org/20191210095630/Corporate-Tax-Rates-Data-1980-2019.xlsx'
          />
        </React.Fragment>
      )}
      {activeTab === 'cost-recovery-time-series' && (
        <React.Fragment>
          <CostRecovery
            title={`${
              country.article ? capitalize(country.article) + ' ' : ''
            }${country.name}`}
            data={data.allIndexRawDataCsv.nodes
              .map(entry => {
                return {
                  year: +entry.year,
                  buildings: +entry.buildings_cost_recovery,
                  machines: +entry.machines_cost_recovery,
                  intangibles: +entry.intangibles_cost_recovery,
                };
              })
              .sort((a, b) => a.year - b.year)}
          />
          <ReportsAndData
            report='https://taxfoundation.org/publications/international-tax-competitiveness-index/'
            data='https://github.com/TaxFoundation/international-tax-competitiveness-index/tree/master/final_outputs'
          />
        </React.Fragment>
      )}
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
    allIndexRawDataCsv(
      filter: { ISO_3: { eq: $iso3 } }
      sort: { fields: year, order: ASC }
    ) {
      nodes {
        year
        buildings_cost_recovery
        machines_cost_recovery
        intangibles_cost_recovery
      }
    }
  }
`;

CorporateTax.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CorporateTax;
