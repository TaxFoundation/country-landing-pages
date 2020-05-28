import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { kebabCase } from 'lodash';

import CountryDescription from './ui/CountryDescription';
import CountrySelector from './ui/CountrySelector';
import Sections from './ui/Sections';

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;

  * {
    font-family: 'Lato', sans-serif;
    font-weight: 400;
  }

  h1,
  h2 {
    font-weight: 300;
  }
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

const Layout = ({ data }) => {
  let country = { ...data.countriesCsv, data: [] };
  const tables = [
    'allIndexRanksCsv',
    'allIndexSubranksCsv',
    'allIndexRawDataCsv',
    'allCountryCorporateNpvAllYearsCsv',
    'allCountryCorporateTaxRatesCsv',
  ];
  tables.forEach(table => mergeData(data[table].edges, country));
  return (
    <Container>
      <TopSection>
        <CountryDescription country={country.name}></CountryDescription>
        <CountrySelector
          countries={[]}
          current={kebabCase(country.name)}
        ></CountrySelector>
      </TopSection>
      <Sections>
        <p>{JSON.stringify(country, null, 2)}</p>
      </Sections>
    </Container>
  );
};

function mergeData(source, mergedData) {
  let newData = mergedData;
  for (let edge of source) {
    if (newData.data[0]) {
      const currentYear = newData.data.findIndex(
        d => d.year === edge.node.year
      );
      if (currentYear > -1) {
        newData.data[currentYear] = {
          ...newData.data[currentYear],
          ...edge.node,
        };
      } else {
        newData.data.push(edge.node);
      }
    } else {
      newData.data.push(edge.node);
    }
  }
  return newData;
}

export const query = graphql`
  query($iso3: String!) {
    countriesCsv(iso3: { eq: $iso3 }) {
      iso2
      iso3
      name
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
          gdp
          oecd
          eu
          gseven
          gtwenty
          brics
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
          final
          final_rank
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
    allIndexSubranksCsv(
      filter: { ISO_3: { eq: $iso3 } }
      sort: { fields: year, order: ASC }
    ) {
      edges {
        node {
          year
          capital_gains_and_dividends
          capital_gains_and_dividends_rank
          capital_taxes
          capital_taxes_rank
          consumption_tax_base
          consumption_tax_base_rank
          consumption_tax_complexity
          consumption_tax_complexity_rank
          consumption_tax_rate
          consumption_tax_rate_rank
          corporate_rate
          corporate_rate_rank
          cost_recovery
          cost_recovery_rank
          incentives
          incentives_rank
          income_tax
          income_tax_rank
          income_tax_complexity
          income_tax_complexity_rank
          international_regulations
          international_regulations_rank
          real_property_tax
          real_property_tax_rank
          territorial
          territorial_rank
          wealth_taxes
          wealth_taxes_rank
          withholding_taxes
          withholding_taxes_rank
        }
      }
    }
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
    allIndexRawDataCsv(
      sort: { fields: year, order: ASC }
      filter: { ISO_3: { eq: $iso3 } }
    ) {
      edges {
        node {
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

Layout.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Layout;
