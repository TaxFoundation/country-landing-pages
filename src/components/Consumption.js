import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Wrapper from './ui/Wrapper';
import { ChartTabs, ChartTab } from './ui/ChartTabs';
import { KeyFigures, KeyFigure } from './ui/KeyFigures';
import ReportsAndData from './ui/ReportsAndData';
import VATRatesChart from './charts/VATRatesChart';
import VATBaseChart from './charts/VATBaseChart';
import VATRevenuesChart from './charts/VATRevenuesChart';
import ConsumptionChart from './charts/ConsumptionChart';

const Consumption = ({ data }) => {
  const [activeTab, setActiveTab] = useState('vat-rates');
  let country = { ...data.countriesCsv, data: {} };
  const itciMaxYear = Math.max(
    ...data.allIndexRawDataCsv.nodes.map(node => +node.year)
  );
  const revMaxYear = Math.max(
    ...data.allConsumptionRevenueCsv.nodes.map(node => +node.year)
  );
  const mixMaxYear = data.allConsumptionDataCsv.nodes.reduce((acc, curr) => {
    if (
      +curr.year > acc &&
      !isNaN(+curr.vat_pct_total_5111) &&
      !isNaN(+curr.sales_pct_total_5112) &&
      !isNaN(+curr.excise_pct_total_5121)
    ) {
      return +curr.year;
    }
    return acc;
  }, 0);

  const ratesAndBases = data.allIndexRawDataCsv.nodes
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

  const revenues = data.allConsumptionRevenueCsv.nodes
    .filter(node => +node.year === revMaxYear)
    .map(node => {
      return {
        iso3: node.iso_3,
        vatRevenue: +node._5000_consumption_pct_gdp,
      };
    });

  const mix = data.allConsumptionDataCsv.nodes
    .filter(node => +node.year === mixMaxYear)
    .map(node => {
      return {
        iso3: node.iso_3,
        vat: +node.vat_pct_total_5111,
        sales: +node.sales_pct_total_5112,
        excise: +node.excise_pct_total_5121,
      };
    });

  const thisCountry = ratesAndBases.find(d => d.iso3 === country.iso3);
  const tabOptionsFunc = countryId => [
    {
      name: `${countryId === 'USA' ? 'Sales / VAT' : 'VAT'} Rates`,
      id: 'vat-rates',
    },
    {
      name: `${countryId === 'USA' ? 'Sales / VAT' : 'VAT'} Base`,
      id: 'vat-base',
    },
    {
      name: `${countryId === 'USA' ? 'Sales / VAT' : 'VAT'} Revenues`,
      id: 'vat-revenue',
    },
    {
      name: `Share of Revenue from Consumption Tax`,
      id: 'consumption-mix',
    },
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
          data={ratesAndBases}
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
          data={ratesAndBases}
          countryID={country.iso3}
        />
      )}
      {activeTab === 'vat-revenue' && (
        <VATRevenuesChart
          title={`${
            country.iso3 === 'USA' ? 'Sales Tax Revenue in ' : 'VAT Revenue in '
          } ${country.article ? country.article + ' ' : ''}${
            country.name
          } vs. the OECD`}
          data={revenues}
          countryID={country.iso3}
        />
      )}
      {activeTab === 'consumption-mix' && (
        <ConsumptionChart
          title={`Mix of Consumption Taxes as Share of Total Tax in ${
            country.article ? country.article + ' ' : ''
          }${country.name} vs. the OECD`}
          data={mix}
          countryID={country.iso3}
        />
      )}
      <KeyFigures>
        <KeyFigure>
          <h3>Share of Revenue from Consumption Taxes</h3>
          <div>{`${data.sourceRevenueByCountryCsv.Consumption_Taxes}%`}</div>
        </KeyFigure>
        <KeyFigure>
          <h3>
            {country.iso3 === 'USA'
              ? 'Average Sales Tax Rate'
              : 'Standard VAT Rate'}
          </h3>
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
    allConsumptionRevenueCsv {
      nodes {
        iso_3
        year
        _5000_consumption_pct_gdp
      }
    }
    allConsumptionDataCsv {
      nodes {
        iso_3
        year
        vat_pct_total_5111
        sales_pct_total_5112
        excise_pct_total_5121
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
