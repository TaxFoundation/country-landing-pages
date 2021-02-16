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
import Table from './ui/Table';

const USD = number =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    number
  );
const percent = number =>
  `${new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(
    number
  )}%`;

const alcoholTypes = {
  beer: 'Beer',
  wine_sparkling: 'Sparkling Wine',
  spirits: 'Spirits',
  wine_still: 'Wine',
};

const fuelTypes = {
  diesel_total_tax_pct_price: 'Automtoive Diesel',
  household_fuel_total_tax_pct_price: 'Household Light Fuel Oil',
  unleaded_total_tax_pct_price: 'Unleaded Gasoline',
};

const tobaccoTypes = {
  cigar_excise_1k_usd: {
    name: 'Cigars - Specific Excise per 1,000 (in USD)',
    format: USD,
  },
  cigar_excise_1k_pct_rsp: {
    name: 'Cigars - Ad valorem excise as percent of retail sales price',
    format: percent,
  },
  cigarette_excise_1k_usd: {
    name: 'Cigarettes - Specific Excise per 1,000 (in USD)',
    format: USD,
  },
  cigarette_excise_1k_pct_rsp: {
    name: 'Cigarettes - Ad valorem excise as percent of retail sales price',
    format: percent,
  },
  roll_tob_excise_1kg_usd: {
    name: 'Rolled Tobaco - Specific Excise per 1,000 (in USD)',
    format: USD,
  },
  roll_tob_excise_1kg_pct_rsp: {
    name: 'Rolled Tobaco - Ad valorem excise as percent of retail sales price',
    format: percent,
  },
};

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
      name: `${
        countryId === 'USA' ? 'Sales / VAT' : 'VAT'
      } Revenues as a Percent of GDP`,
      id: 'vat-revenue',
    },
    {
      name: `Share of Tax Revenue from Consumption Tax`,
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
      {data.allReducedRatesCsv.nodes.length > 0 && (
        <Table>
          <caption>Reduced Vat Rates</caption>
          <thead>
            <tr>
              <th>Reduced Rate</th>
              <th>Reduced Base</th>
            </tr>
          </thead>
          <tbody>
            {data.allReducedRatesCsv.nodes.map(node => (
              <tr key={`${country.iso3}-${node.variable}`}>
                <td>{+node.reduced_rate}%</td>
                <td>{node.reduced_base}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {data.allAlcoholCsv.nodes.length > 0 && (
        <Table>
          <caption>Excise Tax on Alcohol</caption>
          <thead>
            <tr>
              <th>Alcohol Type</th>
              <th>Excise Tax per Liter</th>
              <th>OECD Avg. Tax per Liter</th>
            </tr>
          </thead>
          <tbody>
            {data.allAlcoholCsv.nodes
              .sort((a, b) => a.alcohol_type.localeCompare(b.alcohol_type))
              .map(node => (
                <tr key={`alcohol-tax-${country.iso3}-${node.alcohol_type}`}>
                  <td>{alcoholTypes[node.alcohol_type]}</td>
                  <td style={{ textAlign: 'right' }}>
                    {node.excise_liter_usd ? (
                      USD(+node.excise_liter_usd)
                    ) : (
                      <a
                        href='https://www.oecd-ilibrary.org/sites/152def2d-en/1/3/3/index.html?itemId=/content/publication/152def2d-en&_csp_=c74456d46ecc7b2f6fd3352bb00363ec&itemIGO=oecd&itemContentType=book#boxsection-d1e35484'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        See Notes
                      </a>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {node.oecd_avg_liter_usd ? (
                      USD(+node.oecd_avg_liter_usd)
                    ) : (
                      <a
                        href='https://www.oecd-ilibrary.org/sites/152def2d-en/1/3/3/index.html?itemId=/content/publication/152def2d-en&_csp_=c74456d46ecc7b2f6fd3352bb00363ec&itemIGO=oecd&itemContentType=book#boxsection-d1e35484'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        See Notes
                      </a>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
      {data.allTobaccoCsv.nodes.length > 0 && (
        <Table>
          <caption>Excise Tax on Tobacco</caption>
          <thead>
            <tr>
              <th>Tobacco Type</th>
              <th>Excise Tax</th>
              <th>OECD Avg. Tax</th>
            </tr>
          </thead>
          <tbody>
            {data.allTobaccoCsv.nodes
              .sort((a, b) =>
                a.tobacco_excise_type.localeCompare(b.tobacco_excise_type)
              )
              .map(node => (
                <tr
                  key={`alcohol-tax-${country.iso3}-${node.tobacco_excise_type}`}
                >
                  <td>{tobaccoTypes[node.tobacco_excise_type].name}</td>
                  <td style={{ textAlign: 'right' }}>
                    {node.tobacco_excise ? (
                      tobaccoTypes[node.tobacco_excise_type].format(
                        +node.tobacco_excise
                      )
                    ) : (
                      <a
                        href='https://www.oecd-ilibrary.org/sites/152def2d-en/1/3/3/index.html?itemId=/content/publication/152def2d-en&_csp_=c74456d46ecc7b2f6fd3352bb00363ec&itemIGO=oecd&itemContentType=book#boxsection-d1e40865'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        See Notes
                      </a>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {node.oecd_avg_excise ? (
                      tobaccoTypes[node.tobacco_excise_type].format(
                        +node.oecd_avg_excise
                      )
                    ) : (
                      <a
                        href='https://www.oecd-ilibrary.org/sites/152def2d-en/1/3/3/index.html?itemId=/content/publication/152def2d-en&_csp_=c74456d46ecc7b2f6fd3352bb00363ec&itemIGO=oecd&itemContentType=book#boxsection-d1e40865'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        See Notes
                      </a>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
      {data.allFuelCsv.nodes.length > 0 && (
        <Table>
          <caption>Excise Tax on Fuel</caption>
          <thead>
            <tr>
              <th>Fuel Type</th>
              <th>Total Tax as Percent of Price</th>
              <th>OECD Avg. Total Tax as Percent of Price</th>
            </tr>
          </thead>
          <tbody>
            {data.allFuelCsv.nodes.map(node => (
              <tr key={`fuel-${country.iso3}-${node.fuel_type}`}>
                <td>{fuelTypes[node.fuel_type]}</td>
                <td style={{ textAlign: 'right' }}>
                  {node.total_tax_pct ? (
                    percent(+node.total_tax_pct)
                  ) : (
                    <a
                      href='https://www.oecd-ilibrary.org/sites/152def2d-en/1/3/3/index.html?itemId=/content/publication/152def2d-en&_csp_=c74456d46ecc7b2f6fd3352bb00363ec&itemIGO=oecd&itemContentType=book#boxsection-d1e44320'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      See Notes
                    </a>
                  )}
                </td>
                <td style={{ textAlign: 'right' }}>
                  {node.oecd_avg_total_tax_pct ? (
                    percent(+node.oecd_avg_total_tax_pct)
                  ) : (
                    <a
                      href='https://www.oecd-ilibrary.org/sites/152def2d-en/1/3/3/index.html?itemId=/content/publication/152def2d-en&_csp_=c74456d46ecc7b2f6fd3352bb00363ec&itemIGO=oecd&itemContentType=book#boxsection-d1e44320'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      See Notes
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <ReportsAndData
        report='https://taxfoundation.org/consumption-tax-policies/'
        data='https://github.com/TaxFoundation/consumption-taxes'
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
    allTobaccoCsv(filter: { iso_3: { eq: $iso3 } }) {
      nodes {
        iso_3
        tobacco_excise
        tobacco_excise_type
        year
        oecd_avg_excise
      }
    }
    allAlcoholCsv(filter: { iso_3: { eq: $iso3 } }) {
      nodes {
        year
        oecd_avg_liter_usd
        iso_3
        excise_liter_usd
        alcohol_type
      }
    }
    allFuelCsv(filter: { iso_3: { eq: $iso3 } }) {
      nodes {
        fuel_type
        iso_3
        oecd_avg_total_tax_pct
        total_tax_pct
        year
      }
    }
    allReducedRatesCsv(filter: { iso_3: { eq: $iso3 } }) {
      nodes {
        iso_3
        reduced_base
        reduced_rate
        variable
      }
    }
  }
`;

Consumption.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Consumption;
