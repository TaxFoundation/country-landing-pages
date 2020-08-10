import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import { graphql } from 'gatsby';
import { kebabCase } from 'lodash';

import CountryDescription from './ui/CountryDescription';
import CountrySelector from './ui/CountrySelector';
import ITCI from './sections/ITCI';
import SourcesOfRevenue from './sections/SourcesOfRevenue';
import CorporateTax from './sections/CorporateTax';
import TaxBurdenOnLabor from './sections/TaxBurdenOnLabor';
import Consumption from './sections/Consumption';
import PropertyTax from './sections/PropertyTax';
import International from './sections/International';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Lato', sans-serif;
    font-weight: 400;
  }

  h1,
  h2 {
    font-size: 2.4rem;
    font-weight: 300;
  }

  h2 {
    font-style: italic;
  }

  p {
    line-height: 1.4;
  }

  hr {
    background-color: #ccc;
    border: 0;
    color: #ccc;
    height: 1px;
    margin: 1.5rem 0;
  }
`;

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const TopSection = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template: repeat(2, auto) / 1fr;

  @media (min-width: 600px) {
    grid-gap: 2rem;
    grid-template: auto / 5fr 2fr;
  }
`;

const SectionsAndTOC = styled.div`
  @media (min-width: 800px) {
    align-items: start;
    display: grid;
    grid-gap: 1rem;
    grid-template: auto / auto 250px;
  }
`;

const TOC = styled.nav`
  position: sticky;
  top: 4rem;
`;

const Layout = ({ data }) => {
  let country = { ...data.countriesCsv, data: {} };
  const countryRawIndex = data.allIndexRawDataCsv.edges.find(
    edge => edge.node.ISO_3 === country.iso3
  );
  country.data['itciMain'] = data.allIndexRanksCsv.edges.map(edge => edge.node);
  // country.data['itciSubdata'] = data.allIndexSubranksCsv.edges.map(
  //   edge => edge.node
  // );
  country.data['sourcesOfRevenue'] = {
    country: data.allSourceRevenueByCountryCsv.edges[0].node,
    oecd: data.sourceRevenueByCountryCsv,
  };
  country.data['oecdSources'] = data.allSourceRevenueOecdAverageCsv;
  country.data['corporateTax'] = data.allCountryCorporateTaxRatesCsv.edges
    .filter(edge => !Number.isNaN(+edge.node.rate))
    .map(edge => ({
      year: +edge.node.year,
      rate: +edge.node.rate,
    }));
  country.data[
    'worldwideCorpTax'
  ] = data.allWorldwideCorporateTaxRatesCsv.edges.map(edge => edge.node);
  country.data['taxBurdenOnLabor'] = data.allTaxBurdenOnLaborCsv.edges[0].node;
  const itciMaxYear = Math.max(
    ...data.allIndexRawDataCsv.edges.map(edge => +edge.node.year)
  );
  country.data['consumptionData'] = data.allIndexRawDataCsv.edges
    .filter(edge => +edge.node.year === itciMaxYear)
    .map(edge => {
      return {
        iso3: edge.node.ISO_3,
        vatBreadth: +edge.node.vat_base,
        vatRate: +edge.node.vat_rate,
        vatThreshold: +edge.node.vat_threshold,
      };
    });
  country.data['propertyTaxes'] = {
    net_wealth: countryRawIndex.node.net_wealth,
    estate_or_inheritance_tax: countryRawIndex.node.estate_or_inheritance_tax,
    transfer_tax: countryRawIndex.node.transfer_tax,
    asset_tax: countryRawIndex.node.asset_tax,
    capital_duties: countryRawIndex.node.capital_duties,
    financial_transaction_tax: countryRawIndex.node.financial_transaction_tax,
    property_tax_collections: countryRawIndex.node.property_tax_collections,
    property_tax_share_of_revenue:
      data.allSourceRevenueByCountryCsv.edges[0].node.Property_Taxes,
  };
  country.data['international'] = data.allIndexRawDataCsv.edges
    .filter(edge => +edge.node.year === itciMaxYear)
    .map(edge => {
      return {
        iso3: edge.node.ISO_3,
        taxTreaties: +edge.node.tax_treaties,
      };
    });

  return (
    <>
      <GlobalStyle />
      <Container>
        <TopSection>
          <CountryDescription country={country}></CountryDescription>
          <CountrySelector
            countries={[]}
            current={kebabCase(country.name)}
          ></CountrySelector>
        </TopSection>
        <hr />
        <SectionsAndTOC>
          <div>
            <ITCI
              id='itci'
              countryName={country.name}
              countryAdjective={country.adjective}
              countryArticle={country.article}
              data={country.data.itciMain}
            />
            <hr />
            <SourcesOfRevenue
              id='sources'
              countryName={country.name}
              countryAdjective={country.adjective}
              countryArticle={country.article}
              data={country.data.sourcesOfRevenue}
            />
            <hr />
            <CorporateTax
              id='corporate'
              countryName={country.name}
              countryAdjective={country.adjective}
              countryArticle={country.article}
              data={country.data.corporateTax}
              worldwide={country.data.worldwideCorpTax}
            />
            <hr />
            <TaxBurdenOnLabor
              id='personal'
              countryName={country.name}
              countryAdjective={country.adjective}
              countryArticle={country.article}
              data={country.data.taxBurdenOnLabor}
            />
            <hr />
            <Consumption
              id='consumption'
              countryID={country.iso3}
              countryName={country.name}
              countryArticle={country.article}
              data={country.data.consumptionData}
            />
            <hr />
            <PropertyTax
              id='property'
              countryName={country.name}
              countryAdjective={country.adjective}
              countryArticle={country.article}
              data={country.data.propertyTaxes}
            />
            <hr />
            <International
              id='international'
              countryID={country.iso3}
              countryName={country.name}
              countryArticle={country.article}
              data={country.data.international}
            />
          </div>
          <TOC>
            <ul>
              <li>
                <a href='#itci'>International Tax Competitiveness Index</a>
              </li>
              <li>
                <a href='#sources'>Sources of Tax Revenue</a>
              </li>
              <li>
                <a href='#corporate'>Corporate Taxation</a>
              </li>
              <li>
                <a href='#personal'>Personal Income Taxes</a>
              </li>
              <li>
                <a href='#consumption'>Consumption Taxes</a>
              </li>
              <li>
                <a href='#property'>Property Taxes</a>
              </li>
              <li>
                <a href='#international'>International Tax Rules</a>
              </li>
            </ul>
          </TOC>
        </SectionsAndTOC>
      </Container>
    </>
  );
};

export const query = graphql`
  query($iso3: String!, $name: String) {
    countriesCsv(iso3: { eq: $iso3 }) {
      iso2
      iso3
      name
      adjective
      article
    }
    allCountryCorporateNpvAllYearsCsv(
      filter: { iso_3: { eq: $iso3 } }
      sort: { fields: year, order: ASC }
    ) {
      edges {
        node {
          year
          corp_npv_weighted_average: waverage
          corp_npv_average: average
        }
      }
    }
    allCountryCorporateTaxRatesCsv(
      filter: { iso_3: { eq: $iso3 } }
      sort: { fields: year, order: ASC }
    ) {
      edges {
        node {
          year
          # rate
          # gdp
          # oecd
          # eu
          # gseven
          # gtwenty
          # brics
        }
      }
    }
    allIndexRanksCsv(
      filter: { ISO_3: { eq: $iso3 } }
      sort: { fields: year, order: ASC }
    ) {
      edges {
        node {
          year
          itci_final: final
          itci_final_rank: final_rank
          property
          property_rank
          consumption
          consumption_rank
          corporate
          corporate_rank
          income
          income_rank
          international
          international_rank
        }
      }
    }
    # allIndexSubranksCsv(
    #   filter: { ISO_3: { eq: $iso3 } }
    #   sort: { fields: year, order: ASC }
    # ) {
    #   edges {
    #     node {
    #       year
    #       capital_gains_and_dividends
    #       capital_gains_and_dividends_rank
    #       capital_taxes
    #       capital_taxes_rank
    #       consumption_tax_base
    #       consumption_tax_base_rank
    #       consumption_tax_complexity
    #       consumption_tax_complexity_rank
    #       consumption_tax_rate
    #       consumption_tax_rate_rank
    #       corporate_rate
    #       corporate_rate_rank
    #       cost_recovery
    #       cost_recovery_rank
    #       incentives
    #       incentives_rank
    #       income_tax
    #       income_tax_rank
    #       income_tax_complexity
    #       income_tax_complexity_rank
    #       international_regulations
    #       international_regulations_rank
    #       real_property_tax
    #       real_property_tax_rank
    #       territorial
    #       territorial_rank
    #       wealth_taxes
    #       wealth_taxes_rank
    #       withholding_taxes
    #       withholding_taxes_rank
    #     }
    #   }
    # }
    allSourceRevenueByCountryCsv(filter: { iso_3: { eq: $iso3 } }) {
      edges {
        node {
          Consumption_Taxes
          Corporate_Taxes
          Individual_Taxes
          Property_Taxes
          Social_Insurance_Taxes
          Other
        }
      }
    }
    sourceRevenueByCountryCsv(iso_3: { eq: "NA" }) {
      Consumption_Taxes
      Corporate_Taxes
      Individual_Taxes
      Property_Taxes
      Social_Insurance_Taxes
      Other
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
    allTaxBurdenOnLaborCsv(filter: { Country: { eq: $name } }) {
      edges {
        node {
          Country
          Employee_Payroll_Taxes_in__
          Employer_Payroll_Taxes_in__
          Income_Tax_in__
          Rank
          Tax_Wedge_in____As_a_Share_of_Labor_Cost_
          Total_Average_Annual_Labor_Cost_per_Employee_in__
        }
      }
    }
  }
`;

Layout.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Layout;
