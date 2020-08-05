import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ChartTabs, ChartTab } from '../ui/ChartTabs';
import TaxTreatiesChart from '../charts/TaxTreatiesChart';

const International = ({
  countryID,
  countryName,
  countryArticle,
  data,
  id,
}) => {
  const [activeTab, setActiveTab] = useState('tax-treaties');
  const tabOptions = [
    {
      name: `Tax Treaties`,
      id: 'tax-treaties',
    },
  ];
  return (
    <div id={id}>
      <h2>{`International Taxes in${
        countryArticle ? ' ' + countryArticle : ''
      } ${countryName}`}</h2>
      <p>
        In an increasingly globalized economy, businesses often expand beyond
        the borders of their home countries to reach customers around the world.
        As a result, countries need to define rules determining how, or if,
        corporate income earned in foreign countries is taxed. International tax
        rules deal with the systems and regulations that countries apply to
        those business activities.
      </p>
      <p>
        Tax treaties align many tax laws between two countries and attempt to
        reduce double taxation, particularly by reducing or eliminating
        withholding taxes between the countries. Countries with a greater number
        of partners in their tax treaty network have more attractive tax regimes
        for foreign investment and are more competitive than countries with
        fewer treaties.
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
      {activeTab === 'tax-treaties' && (
        <TaxTreatiesChart
          title={`Number of Tax Treaties  in ${
            countryArticle ? countryArticle + ' ' : ''
          }${countryName} vs. the OECD`}
          data={data}
          countryID={countryID}
        />
      )}
    </div>
  );
};

International.propTypes = {
  countryName: PropTypes.string,
  countryID: PropTypes.string,
  countryArticle: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      iso3: PropTypes.string,
      taxTreaties: PropTypes.number,
    })
  ),
  id: PropTypes.string,
};

export default International;
