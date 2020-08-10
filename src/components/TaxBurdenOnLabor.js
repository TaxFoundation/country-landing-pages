import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { ChartTabs, ChartTab } from './ui/ChartTabs';
import TaxBurdenChart from './charts/TaxBurdenChart';

const TaxBurdenOnLabor = ({ data }) => {
  const [activeTab, setActiveTab] = useState('tax-burden-on-labor');
  const country = { ...data.countriesCsv };
  const theData = data.allTaxBurdenOnLaborCsv.edges[0].node;
  const tabOptions = [
    {
      name: 'Tax Burden on Labor',
      id: 'tax-burden-on-labor',
    },
    // {
    //   name: 'Income Tax Map',
    //   id: 'income-tax-map',
    // },
  ];
  return (
    <div>
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
          title={`How Does${country.article ? ' ' + country.article : ''} ${
            country.name
          }'s Tax Burden on Individuals Compare?`}
          data={theData}
        />
      )}
    </div>
  );
};

export const query = graphql`
  query($iso3: String!, $name: String) {
    countriesCsv(iso3: { eq: $iso3 }) {
      iso2
      iso3
      name
      adjective
      article
    }
    allTaxBurdenOnLaborCsv(filter: { Country: { eq: $name } }) {
      edges {
        node {
          Country
          Employee_Payroll_Taxes_in__
          Employer_Payroll_Taxes_in__
          Income_Tax_in__
          Rank
          Tax_Wedge_in____As_a_Share_of_Labor_Cost_
          Total_Average_Annual_Labor_Cost_per_Employee_in__
        }
      }
    }
  }
`;

TaxBurdenOnLabor.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TaxBurdenOnLabor;
