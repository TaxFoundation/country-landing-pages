import React from 'react';
import PropTypes from 'prop-types';

import SourcesOfRevenueChart from '../charts/SourcesOfRevenueChart';

const SourcesOfRevenue = ({ countryName, countryArticle, data }) => {
  return (
    <div>
      <h2>{`Sources of Revenue in${
        countryArticle ? ' ' + countryArticle : ''
      } ${countryName}`}</h2>
      <p>
        I'm baby unicorn pork belly VHS vape street art bicycle rights YOLO
        flannel venmo 90's lomo gastropub. Man bun squid succulents semiotics.
        Air plant authentic hell of gastropub next level pabst lo-fi banh mi
        kale chips beard listicle keytar tofu echo park vice. Pabst waistcoat
        butcher actually palo santo stumptown sartorial wayfarers. Tattooed
        taiyaki portland migas. Ugh beard craft beer poutine PBR&B fam chambray
        portland hell of readymade chartreuse organic kitsch cornhole.
      </p>

      <SourcesOfRevenueChart
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
};

export default SourcesOfRevenue;
