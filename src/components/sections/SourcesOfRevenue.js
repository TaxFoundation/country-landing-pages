import React from 'react';
import PropTypes from 'prop-types';

import SourcesOfRevenueChart from '../charts/SourcesOfRevenueChart';

const SourcesOfRevenue = ({ countryName, countryArticle, data, id }) => {
  return (
    <div id={id}>
      <h2>{`Sources of Revenue in${
        countryArticle ? ' ' + countryArticle : ''
      } ${countryName}`}</h2>
      <p>
        Countries raise tax revenue through a mix of individual income taxes,
        corporate income taxes, social insurance taxes, taxes on goods and
        services, and property taxes. The mix of tax policies can influence how
        distortionary or neutral a tax system is. Taxes on income can create
        more economic harm than taxes on consumption and property. However, the
        extent to which an individual country relies on any of these taxes can
        differ substantially.
      </p>

      <SourcesOfRevenueChart
        country={countryName}
        title={`How Does${
          countryArticle ? ' ' + countryArticle : ''
        } ${countryName} Raise Revenue?`}
        data={data}
      />
    </div>
  );
};

SourcesOfRevenue.propTypes = {
  countryName: PropTypes.string,
  countryArticle: PropTypes.string,
  data: PropTypes.object,
  id: PropTypes.string,
};

export default SourcesOfRevenue;
