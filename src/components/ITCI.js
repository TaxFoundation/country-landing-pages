import React, { useState } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';

import Wrapper from './ui/Wrapper';
import { numberRankString } from '../utilities';
import { ChartTabs, ChartTab } from './ui/ChartTabs';
import ITCIChart from './charts/ITCI';

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
      name: 'International Tax Score',
      id: 'international',
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
      <p>
        For more information, please see the Tax Foundation&apos;s{' '}
        <a
          href='https://taxfoundation.org/publications/international-tax-competitiveness-index/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <em>International Tax Competitivenes Index</em>
        </a>
        .
      </p>
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

ITCI.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ITCI;
