import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';

import { numberRankString } from '../../utilities';
import { ChartTabs, ChartTab } from '../ui/ChartTabs';
import ITCIChart from '../charts/ITCI';

const ITCI = ({ countryName, countryAdjective, countryArticle, data, id }) => {
  const [activeRank, setActiveRank] = useState('itci_final');
  const currentYear = data.reduce((prev, curr) => {
    if (+curr.year > +prev.year) {
      return curr;
    } else {
      return prev;
    }
  });
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
    <div id={id}>
      <h2>International Tax Competitiveness Index</h2>
      <p>
        The Tax Foundation’ s{' '}
        <a
          href='https://taxfoundation.org/publications/international-tax-competitiveness-index/'
          target='_blank'
          rel='noopener noreferrer'
        >
          International Tax Competitiveness Index (ITCI){' '}
        </a>{' '}
        measures the degree to which the 36 OECD countries’ tax systems promote
        competitiveness through low tax burdens on business investment and
        neutrality through a well-structured tax code. The <em>ITCI</em>{' '}
        considers more than 40 variables across five categories: Corporate
        Taxes, Individual Taxes, Consumption Taxes, Property Taxes, and
        International Tax Rules.
      </p>
      <p>
        The <em>ITCI</em> attempts to display not only which countries provide
        the best tax environment for investment but also the best tax
        environment for workers and businesses.
      </p>
      <h3>
        The {countryAdjective} Tax System Ranks{' '}
        {numberRankString(+currentYear.itci_final_rank)} in the OECD
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
        title={`${
          countryArticle ? capitalize(countryArticle) + ' ' : ''
        }${countryName}'s ${
          rankChoices.find(c => c.id === activeRank).name
        } (out of 100)`}
        data={data
          .map(entry => {
            return { year: +entry.year, score: +entry[activeRank] };
          })
          .sort((a, b) => a.year - b.year)}
      />
      {/* TODO add top and bottom ranked categories. Will require rearranging data. */}
    </div>
  );
};

ITCI.propTypes = {
  countryName: PropTypes.string,
  countryAdjective: PropTypes.string,
  countryArticle: PropTypes.string,
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
  id: PropTypes.id,
};

export default ITCI;
