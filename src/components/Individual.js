import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Wrapper from './ui/Wrapper';
import { ChartTabs, ChartTab } from './ui/ChartTabs';
import { KeyFigures, KeyFigure } from './ui/KeyFigures';
import IndividualChart from './charts/IndividualChart';

const TaxBurdenOnLabor = ({ data }) => {
  const [activeTab, setActiveTab] = useState('tax-burden-on-labor');
  const country = { ...data.countriesCsv };
  const theData = data.taxBurdenOnLaborCsv;
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
    <Wrapper>
      <ChartTabs>
        {tabOptions.length > 1 &&
          tabOptions.map(choice => (
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
        <IndividualChart
          title={`How Does${country.article ? ' ' + country.article : ''} ${
            country.name
          }'s Tax Burden on Individuals Compare?`}
          data={theData}
        />
      )}
      <p>
        For more information, please see the Tax Foundation&apos;s{' '}
        <a
          href='https://taxfoundation.org/publications/comparison-tax-burden-labor-oecd/'
          target='_blank'
          rel='noopener noreferrer'
        >
          A Comparison of the Tax Burden on Labor in the OECD
        </a>{' '}
        report.
      </p>
      <KeyFigures>
        <KeyFigure>
          <h3>Share of Revenue from Individual Taxes</h3>
          <div>{`${data.sourceRevenueByCountryCsv.Individual_Taxes}%`}</div>
        </KeyFigure>
        <KeyFigure>
          <h3>Share of Revenue from Social Insurance Taxes</h3>
          <div>{`${data.sourceRevenueByCountryCsv.Social_Insurance_Taxes}%`}</div>
        </KeyFigure>
        <KeyFigure>
          <h3>Capital Gains Tax Rate</h3>
          <div>{`${data.indexRawDataCsv.capital_gains_rate * 100}%`}</div>
        </KeyFigure>
      </KeyFigures>
    </Wrapper>
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
    taxBurdenOnLaborCsv(Country: { eq: $name }) {
      Employee_Payroll_Taxes_in__
      Employer_Payroll_Taxes_in__
      Income_Tax_in__
      Rank
      Tax_Wedge_in____As_a_Share_of_Labor_Cost_
      Total_Average_Annual_Labor_Cost_per_Employee_in__
    }
    sourceRevenueByCountryCsv(iso_3: { eq: $iso3 }) {
      Individual_Taxes
      Social_Insurance_Taxes
    }
    indexRawDataCsv(ISO_3: { eq: $iso3 }) {
      capital_gains_rate
    }
  }
`;

TaxBurdenOnLabor.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TaxBurdenOnLabor;
