import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ChartTabs, ChartTab } from '../ui/ChartTabs';
import ITCIChart from '../charts/ITCI';

const ITCI = ({ countryName, data }) => {
  const [activeRank, setActiveRank] = useState('itci_final');
  const currentYear = data.reduce((prev, curr) => curr.year > prev.year);
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
    <div>
      <h2> International Tax Competitiveness Index </h2>{' '}
      <p>
        The Tax Foundation’ s{' '}
        <a
          href='https://taxfoundation.org/publications/international-tax-competitiveness-index/'
          target='_blank'
          rel='noopener noreferrer'
        >
          International Tax Competitiveness Index(ITCI){' '}
        </a>{' '}
        measures the degree to which the 36 OECD countries’ tax systems promote
        competitiveness through low tax burdens on business investment and
        neutrality through a well - structured tax code.The ITCI considers more
        than 40 variables across five categories: Corporate Taxes, Individual
        Taxes, Consumption Taxes, Property Taxes, and International Tax
        Rules.The ITCI attempts to display not only which countries provide the
        best tax environment for investment but also the best tax environment to
        start and grow a business.{' '}
      </p>
      <h3>
        The {countryName} Tax System Ranks {currentYear.itci_final_rank} in the
        OECD
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
        data={data
          .map(entry => {
            return { year: +entry.year, score: +entry[activeRank] };
          })
          .sort((a, b) => a.year - b.year)}
      />
    </div>
  );
};

ITCI.propTypes = {
  countryName: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.string,
      itci_final: PropTypes.string,
      itci_final_rank: PropTypes.string,
      property: PropTypes.string,
      property_rank: PropTypes.string,
      consumption: PropTypes.string,
      consumption_rank: PropTypes.string,
      corporate: PropTypes.string,
      corporate_rank: PropTypes.string,
      income: PropTypes.string,
      income_rank: PropTypes.string,
      international: PropTypes.string,
      international_rank: PropTypes.string,
    })
  ),
};

export default ITCI;
