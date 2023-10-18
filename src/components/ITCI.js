import React, { useState } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';

import Wrapper from './ui/Wrapper';
import { numberRankString } from '../utilities';
import { ChartTabs, ChartTab } from './ui/ChartTabs';
import ReportsAndData from './ui/ReportsAndData';
import ITCIChart from './charts/ITCI';
import StrengthsAndWeaknesses from './StrengthsAndWeaknesses';

const ITCI = ({ data }) => {
  const country = { ...data.countriesCsv };
  const theData = data.allIndexRanksCsv.edges.map(edge => edge.node);
  const [activeRank, setActiveRank] = useState('itci_final');
  const currentYear = Math.max(
    ...data.allIndexRawDataCsv.edges.map(edge => +edge.node.year)
  );
  const rankChoices = [
    {
      name: 'Overall Score',
      id: 'itci_final',
    },
    {
      name: 'Corporate Tax Score',
      id: 'corporate',
    },
    {
      name: 'Individual Tax Score',
      id: 'income',
    },
    {
      name: 'Consumption Taxes',
      id: 'consumption',
    },
    {
      name: 'Property Tax Score',
      id: 'property',
    },
    {
      name: 'Cross Border Tax Score',
      id: 'cross_border',
    },
  ];
  return (
    <Wrapper>
      <h3 style={{ margin: '0 0 1rem' }}>
        The {country.adjective} Tax System Ranks{' '}
        {numberRankString(
          theData.find(d => +d.year === currentYear)['itci_final_rank']
        )}{' '}
        in the OECD
      </h3>
      <ChartTabs>
        {rankChoices.map(choice => (
          <ChartTab
            key={`rank-choice-${choice.id}`}
            active={activeRank === choice.id}
          >
            <button onClick={() => setActiveRank(choice.id)}>
              {choice.name}
            </button>
          </ChartTab>
        ))}
      </ChartTabs>
      <ITCIChart
        title={`${country.article ? capitalize(country.article) + ' ' : ''}${
          country.name
        }'s ${rankChoices.find(c => c.id === activeRank).name} (out of 100)`}
        data={theData
          .map(entry => {
            return { year: +entry.year, score: +entry[activeRank] };
          })
          .sort((a, b) => a.year - b.year)}
      />
      <StrengthsAndWeaknesses profiles={ data.countryProfilesCsv } />
      <ReportsAndData
        report='https://taxfoundation.org/publications/international-tax-competitiveness-index/'
        data='https://github.com/TaxFoundation/international-tax-competitiveness-index/tree/master/final_outputs'
      />
      {/* TODO add top and bottom ranked categories. Will require rearranging data. */}
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
    countryProfilesCsv(ISO_3: { eq: $iso3 }) {
      ranking
      strength_1
      strength_2
      strength_3
      weakness_1
      weakness_2
      weakness_3
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
          cross_border
          cross_border_rank
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
          corporate_rate
          country_limitations
          dividends_exemption
          dividends_rate
          dividends_withholding_tax
          estate_or_inheritance_tax
          financial_transaction_tax
          intangibles_cost_recovery
          interest_withholding_tax
          inventory
          loss_carryback
          loss_carryforward
          machines_cost_recovery
          net_wealth
          patent_box
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

ITCI.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ITCI;
