import React from 'react';
import PropTypes from 'prop-types';

const ITCI = ({ data }) => {
  return (
    <div>
      {data.map(entry => (
        <div>
          <p>{entry.year}</p>
          <p>{entry.score}</p>
        </div>
      ))}
    </div>
  );
};

ITCI.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number,
      score: PropTypes.number,
    })
  ),
};

export default ITCI;
