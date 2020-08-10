import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import SourcesOfRevenueChart from '../charts/SourcesOfRevenueChart';

const SourcesOfRevenue = ({ data }) => {
  const country = { ...data.countriesCsv };
  const theData = {
    country: data.allSourceRevenueByCountryCsv.edges[0].node,
    oecd: data.sourceRevenueByCountryCsv,
  };
  return (
    <div>
      <SourcesOfRevenueChart
        country={country.name}
        title={`How Does${country.article ? ' ' + country.article : ''} ${
          country.name
        } Raise Revenue?`}
        data={theData}
      />
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
    allSourceRevenueByCountryCsv(filter: { iso_3: { eq: $iso3 } }) {
      edges {
        node {
          Consumption_Taxes
          Corporate_Taxes
          Individual_Taxes
          Property_Taxes
          Social_Insurance_Taxes
          Other
        }
      }
    }
    sourceRevenueByCountryCsv(iso_3: { eq: "NA" }) {
      Consumption_Taxes
      Corporate_Taxes
      Individual_Taxes
      Property_Taxes
      Social_Insurance_Taxes
      Other
    }
  }
`;

SourcesOfRevenue.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SourcesOfRevenue;
