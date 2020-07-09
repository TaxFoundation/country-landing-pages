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
  worldwide,
}) => {
  const [activeTab, setActiveTab] = useState('corp-time-series');
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
      <h2>{`Corporate Taxation in${
        countryArticle ? ' ' + countryArticle : ''
      } ${countryName}`}</h2>
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
      <ChartTabs>
        {tabOptions.map(choice => (
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
      {activeTab === 'corp-time-series' && (
        <CorpTaxChart
          title={`${
            countryArticle ? capitalize(countryArticle) + ' ' : ''
          }${countryName}'s Top Corporate Tax Rate`}
          data={data
            .map(entry => {
              return { year: +entry.year, rate: +entry.rate };
            })
            .sort((a, b) => a.year - b.year)}
          worldwide={worldwide}
        />
      )}
    </div>
  );
};

CorporateTax.propTypes = {
  countryName: PropTypes.string,
  countryAdjective: PropTypes.string,
  countryArticle: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  worldwide: PropTypes.arrayOf(PropTypes.object),
};

export default CorporateTax;
