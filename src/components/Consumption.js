import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Wrapper from './ui/Wrapper';
import { ChartTabs, ChartTab } from './ui/ChartTabs';
import VATRatesChart from './charts/VATRatesChart';
import VATBaseChart from './charts/VATBaseChart';

const Consumption = ({ data }) => {
  const [activeTab, setActiveTab] = useState('vat-rates');
  let country = { ...data.countriesCsv, data: {} };
  const itciMaxYear = Math.max(
    ...data.allIndexRawDataCsv.edges.map(edge => +edge.node.year)
  );
  const theData = data.allIndexRawDataCsv.edges
    .filter(edge => +edge.node.year === itciMaxYear)
    .map(edge => {
      return {
        iso3: edge.node.ISO_3,
        vatBreadth: +edge.node.vat_base,
        vatRate: +edge.node.vat_rate,
        vatThreshold: +edge.node.vat_threshold,
      };
    });
  const tabOptionsFunc = countryId => [
    {
      name: `${countryId === 'USA' ? 'Sales / VAT' : 'VAT'} Rates`,
      id: 'vat-rates',
    },
    {
      name: `${countryId === 'USA' ? 'Sales / VAT' : 'VAT'} Base`,
      id: 'vat-base',
    },
    // {
    //   name: `${country.iso3 === 'USA' ? 'Sales / VAT' : 'VAT'} Complexity Map`,
    //   id: 'vat-complexity-map',
    // },
  ];
  const tabOptions = tabOptionsFunc(country.iso3);
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
      {activeTab === 'vat-rates' && (
        <VATRatesChart
          title={`${
            country.iso3 === 'USA' ? 'Sales Tax Rate in ' : 'VAT Rates in '
          } ${country.article ? country.article + ' ' : ''}${
            country.name
          } vs. ${country.iso3 === 'USA' ? 'VAT Rates in ' : ''}the OECD`}
          data={theData}
          countryID={country.iso3}
        />
      )}
      {activeTab === 'vat-base' && (
        <VATBaseChart
          title={`${
            country.iso3 === 'USA' ? 'Sales Tax Base in ' : 'VAT Base in '
          } ${country.article ? country.article + ' ' : ''}${
            country.name
          } vs. the OECD`}
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
          asset_tax
          buildings_cost_recovery
          capital_duties
          capital_gains_exemption
          capital_gains_rate
          cfc_rules
          consumption_time
          corporate_rate
          corporate_time
          country_limitations
          dividends_exemption
          dividends_rate
          dividends_withholding_tax
          estate_or_inheritance_tax
          financial_transaction_tax
          index_capital_gains
          intangibles_cost_recovery
          interest_withholding_tax
          inventory
          labor_payments
          labor_time
          loss_carryback
          loss_carryforward
          machines_cost_recovery
          net_wealth
          other_payments
          patent_box
          profit_payments
          property_tax
          property_tax_collections
          r_and_d_credit
          royalties_withholding_tax
          tax_treaties
          tax_wedge
          thin_capitalization_rules
          threshold_top_income_rate
          top_income_rate
          transfer_tax
          vat_base
          vat_rate
          vat_threshold
        }
      }
    }
  }
`;

Consumption.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Consumption;
