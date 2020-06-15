import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { capitalize } from 'lodash';

import { numberRankString } from '../../utilities';
import { ChartTabs, ChartTab } from '../ui/ChartTabs';
import CorpTaxChart from '../charts/CorporateTax';

const CorporateTax = ({
  countryName,
  countryAdjective,
  countryArticle,
  data,
}) => {
  const [activeTab, setActiveTab] = useState('corp-time-series');
  const currentYear = data.reduce((prev, curr) => {
    if (+curr.year > +prev.year) {
      return curr;
    } else {
      return prev;
    }
  });
  console.log(currentYear);
  const tabOptions = [
    {
      name: 'Corporate Tax Time Series',
      id: 'corp-time-series',
    },
    {
      name: 'Corporate Tax Map',
      id: 'corp-tax-map',
    },
    {
      name: 'Cost Recovery Time Series',
      id: 'cost-recovery-time-series',
    },
    {
      name: 'Cost Recovery Map',
      id: 'cost-recovery-map',
    },
  ];
  return (
    <div>
      <h2>Corporate Taxation in the UK</h2>
      <p>
        Share of revenue statistic in descriptive text and comment about income
        taxes needing to be designed to allow businesses to deduct relevant
        costs at the time they are incurred. Share of revenue statistic in
        descriptive text and comment about income taxes needing to be designed
        to allow businesses to deduct relevant costs at the time they are
        incurred. Share of revenue statistic in descriptive text and comment
        about income taxes needing.
      </p>
      <p>
        Descriptive text about why capital allowances matter and how they can be
        measured and compared by calculating NPVs (I think otherwise the next
        table might be hard to understand for someone not familiar with the
        concept).
      </p>
      <h3>
        The {countryAdjective} Tax System Ranks{' '}
        {numberRankString(+currentYear.itci_final_rank)} in the OECD
      </h3>
      <ChartTabs>
        {tabOptions.map(choice => (
          <ChartTab
            key={`rank-choice-${choice.id}`}
            active={setActiveTab === choice.id}
          >
            <button onClick={() => setActiveTab(choice.id)}>
              {choice.name}
            </button>
          </ChartTab>
        ))}
      </ChartTabs>
      {activeTab === 'corp-tax-time-series' && (
        <CorpTaxChart
          title={`${
            countryArticle ? capitalize(countryArticle) + ' ' : ''
          }${countryName}'s Top Corporate Tax Rate`}
          data={data
            .map(entry => {
              return { year: +entry.year, score: +entry[activeTab] };
            })
            .sort((a, b) => a.year - b.year)}
        />
      )}

      {/* TODO add top and bottom ranked categories. Will require rearranging data. */}
    </div>
  );
};

CorporateTax.propTypes = {
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
};

export default CorporateTax;
