import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Wrapper from './ui/Wrapper';
import { KeyFigures, KeyFigure } from './ui/KeyFigures';
import ReportsAndData from './ui/ReportsAndData';
import IndividualChart from './charts/IndividualChart';

const TaxBurdenOnLabor = ({ data }) => {
  const country = { ...data.countriesCsv };
  const theData = data.taxBurdenOnLaborCsv;

  return (
    <Wrapper>
      <IndividualChart
        title={`How Does${country.article ? ' ' + country.article : ''} ${
          country.name
        }'s Tax Burden on Individuals Compare?`}
        data={theData}
      />

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
          <div>{`${
            Math.round(
              data.allIndexRawDataCsv.nodes[0].capital_gains_rate * 10000
            ) / 100
          }%`}</div>
        </KeyFigure>
      </KeyFigures>
      <ReportsAndData
        report='https://taxfoundation.org/publications/comparison-tax-burden-labor-oecd/'
        data='https://github.com/TaxFoundation/tax-burden-on-labor'
      />
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
      Employer_Payroll_Taxes_in__
      Employee_Payroll_Taxes_in__
      Income_Tax_in__
      Rank
      Tax_Wedge_in____As_a_Share_of_Labor_Cost_
      Total_Average_Annual_Labor_Cost_per_Employee_in__
    }
    sourceRevenueByCountryCsv(iso_3: { eq: $iso3 }) {
      Individual_Taxes
      Social_Insurance_Taxes
    }
    allIndexRawDataCsv(
      filter: { ISO_3: { eq: $iso3 } }
      sort: { year: DESC }
      limit: 1
    ) {
      nodes {
        capital_gains_rate
      }
    }
  }
`;

TaxBurdenOnLabor.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TaxBurdenOnLabor;
