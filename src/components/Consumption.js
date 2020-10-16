import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Wrapper from './ui/Wrapper';
import { ChartTabs, ChartTab } from './ui/ChartTabs';
import { KeyFigures, KeyFigure } from './ui/KeyFigures';
import ReportsAndData from './ui/ReportsAndData';
import VATRatesChart from './charts/VATRatesChart';
import VATBaseChart from './charts/VATBaseChart';

const Consumption = ({ data }) => {
  const [activeTab, setActiveTab] = useState('vat-rates');
  let country = { ...data.countriesCsv, data: {} };
  const itciMaxYear = Math.max(
    ...data.allIndexRawDataCsv.nodes.map(node => +node.year)
  );
  const theData = data.allIndexRawDataCsv.nodes
    .filter(node => +node.year === itciMaxYear)
    .map(node => {
      return {
        iso3: node.ISO_3,
        year: +node.year,
        vatBreadth: +node.vat_base,
        vatRate: +node.vat_rate,
        vatThreshold: +node.vat_threshold,
        consumptionTime: +node.consumption_time,
      };
    });
  const thisCountry = theData.find(d => d.iso3 === country.iso3);
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
      <KeyFigures>
        <KeyFigure>
          <h3>Share of Revenue from Consumption Taxes</h3>
          <div>{`${data.sourceRevenueByCountryCsv.Consumption_Taxes}%`}</div>
        </KeyFigure>
        <KeyFigure>
          <h3>Average VAT Rate</h3>
          <div>{`${thisCountry.vatRate}%`}</div>
        </KeyFigure>
        <KeyFigure>
          <h3>Average Business Compliance Time in Hours</h3>
          <div>{`${thisCountry.consumptionTime}`}</div>
        </KeyFigure>
      </KeyFigures>
      <ReportsAndData
        report='https://taxfoundation.org/publications/international-tax-competitiveness-index/'
        data='https://github.com/TaxFoundation/international-tax-competitiveness-index/tree/master/final_outputs'
      />
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
      nodes {
        ISO_3
        year
        consumption_time
        vat_base
        vat_rate
        vat_threshold
      }
    }
    sourceRevenueByCountryCsv(iso_3: { eq: $iso3 }) {
      Consumption_Taxes
    }
  }
`;

Consumption.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Consumption;
