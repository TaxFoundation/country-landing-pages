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
  id,
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
    <div id={id}>
      <h2>{`Corporate Taxation in${
        countryArticle ? ' ' + countryArticle : ''
      } ${countryName}`}</h2>
      <p>
        The corporate income tax is a tax on the profits of corporations. All
        OECD countries levy a tax on corporate profits, but the rates and bases
        vary widely from country to country. Corporate income taxes are the most
        harmful tax for economic growth, but countries can mitigate those harms
        with lower corporate tax rates and generous capital allowances.
      </p>
      <p>
        Capital allowances directly impact business incentives for new
        investments. In most countries, businesses are generally not allowed to
        immediately deduct the cost of capital investments. Instead, they are
        required to deduct these costs over several years, increasing the tax
        burden on new investments. This can be measured by calculating the
        percent of the present value cost that a business can deduct over the
        life of an asset. Countries with more generous capital allowances have
        tax systems that are more supportive to business investment, which
        underpins economic growth.
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
  id: PropTypes.id,
};

export default CorporateTax;
