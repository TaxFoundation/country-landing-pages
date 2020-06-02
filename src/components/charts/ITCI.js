import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid #999;
  border-top: 0;
  margin: 0;
  padding: 1rem;
`;

const ITCI = ({ data }) => {
  return (
    <Container>
      {data.map(entry => (
        <div key={`year-${entry.year}`}>
          <p>{entry.year}</p>
          <p>{entry.score}</p>
        </div>
      ))}
    </Container>
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
