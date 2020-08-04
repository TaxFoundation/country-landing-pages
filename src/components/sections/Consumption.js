import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';

import { ChartTabs, ChartTab } from '../ui/ChartTabs';
import ConsumptionChart from '../charts/ConsumptionChart';

const Consumption = ({ countryID, countryName, countryArticle, data, id }) => {
  const [activeTab, setActiveTab] = useState('corp-time-series');
  const tabOptionsFunc = countryID => [
    {
      name: `${countryID === 'USA' ? 'Sales / VAT' : 'VAT'} Base`,
      id: 'vat-base',
    },
    {
      name: `${countryID === 'USA' ? 'Sales / VAT' : 'VAT'} Rates Map`,
      id: 'vat-tax-map',
    },
    {
      name: `${countryID === 'USA' ? 'Sales / VAT' : 'VAT'} Complexity Map`,
      id: 'vat-complexity-map',
    },
  ];
  const tabOptions = tabOptionsFunc(countryID);
  return (
    <div id={id}>
      <h2>{`Consumption Taxes in${
        countryArticle ? ' ' + countryArticle : ''
      } ${countryName}`}</h2>
      <p>
        Consumption taxes are charged on goods and services and can take various
        forms. In the OECD and most of the world, the value-added tax (VAT) is
        the most common consumption tax. Most consumption taxes either do not
        tax intermediate business inputs or provide a credit for taxes already
        paid on inputs, which avoids the problem of tax pyramiding, whereby the
        same final good or service is taxed multiple times in the production
        process. The exclusion of business inputs makes a consumption tax one of
        the most economically efficient means of raising tax revenue.
      </p>
      <p>
        However, many countries fail to define their tax base correctly. To
        minimize distortions, all final consumption should be taxed at the same
        standard rate. However, countries often exempt too many goods and
        services from taxation or tax them at reduced rates, which requires them
        to levy higher standard rates to raise sufficient revenue. Some
        countries also fail to properly exempt business inputs. For example,
        states in the United States often levy sales taxes on machinery and
        equipment.
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
        <ConsumptionChart
          title={`${
            countryID === 'USA' ? 'Sales Tax Base in ' : 'VAT Tax Base in '
          } ${countryArticle ? countryArticle + ' ' : ''}${countryName}`}
          data={data}
        />
      )}
    </div>
  );
};

Consumption.propTypes = {
  countryName: PropTypes.string,
  countryID: PropTypes.string,
  countryArticle: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      iso3: PropTypes.string,
      vatBreadth: PropTypes.number,
      vatRate: PropTypes.number,
      vatThreshold: PropTypes.number,
    })
  ),
  id: PropTypes.string,
};

export default Consumption;
