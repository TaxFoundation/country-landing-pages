import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ChartTabs, ChartTab } from '../ui/ChartTabs';
import TaxBurdenChart from '../charts/TaxBurdenChart';

const TaxBurdenOnLabor = ({ countryName, countryArticle, data }) => {
  const [activeTab, setActiveTab] = useState('tax-burden-on-labor');
  const tabOptions = [
    {
      name: 'Tax Burden on Labor',
      id: 'tax-burden-on-labor',
    },
    {
      name: 'Income Tax Map',
      id: 'income-tax-map',
    },
  ];
  return (
    <div>
      <h2>{`Personal Income Taxes in${
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
      {activeTab === 'tax-burden-on-labor' && (
        <TaxBurdenChart
          title={`How Does${
            countryArticle ? ' ' + countryArticle : ''
          } ${countryName}'s Tax Burden on Individuals Compare?`}
          data={data}
        />
      )}
    </div>
  );
};

TaxBurdenOnLabor.propTypes = {
  countryName: PropTypes.string,
  countryArticle: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
};

export default TaxBurdenOnLabor;
