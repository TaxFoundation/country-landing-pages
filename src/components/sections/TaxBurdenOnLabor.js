import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ChartTabs, ChartTab } from '../ui/ChartTabs';
import TaxBurdenChart from '../charts/TaxBurdenChart';

const TaxBurdenOnLabor = ({ countryName, countryArticle, data, id }) => {
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
    <div id={id}>
      <h2>{`Individual Taxation in${
        countryArticle ? ' ' + countryArticle : ''
      } ${countryName}`}</h2>
      <p>
        Individual taxes are one of the most prevalent means of raising revenue
        to fund government across the OECD. Individual income taxes are levied
        on an individual’s or household’s income to fund general government
        operations. These taxes are typically progressive, meaning that the rate
        at which an individual’s income is taxed increases as the individual
        earns more income.
      </p>
      <p>
        In addition, countries have payroll taxes. These typically flat-rate
        taxes are levied on wage income in addition to a country’s general
        individual income tax. However, revenue from these taxes is typically
        allocated specifically toward social insurance programs such as
        unemployment insurance, government pension programs, and health
        insurance.
      </p>
      <p>
        High marginal income tax rates impact decisions to work and reduce the
        efficiency with which governments can raise revenue from their
        individual tax systems.
      </p>
      <p>
        Capital gains and dividend income—if not included in the individual
        income tax—are typically taxed at a flat rate.
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
  data: PropTypes.object,
  id: PropTypes.string,
};

export default TaxBurdenOnLabor;
