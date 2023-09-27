import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledReportsAndData = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 3rem;

  @media (min-width: 600px) {
    grid-auto-flow: column;
  }
`;

const Button = styled.a`
  background-color: #FFC800;
  border: none;
  color: #162127;
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.5rem;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    background-color: #CCA000;
    color: #162127;
    text-decoration: none;
  }
`;

const ReportsAndData = ({ report, data }) => (
  <StyledReportsAndData>
    {report && (
      <Button href={report} target='_blank' rel='noopener noreferrer'>
        See Full Report
      </Button>
    )}
    {data && (
      <Button href={data} target='_blank' rel='noopener noreferrer'>
        Get Data
      </Button>
    )}
  </StyledReportsAndData>
);

ReportsAndData.propTypes = {
  report: PropTypes.string,
  data: PropTypes.string,
};

export default ReportsAndData;
