import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledReportsAndData = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-gap: 1rem;
  margin-top: 1rem;

  @media (min-width: 600px) {
    grid-auto-flow: column;
  }
`;

const Button = styled.a`
  background-color: #fff;
  border: 1px solid #0094ff;
  color: #0094ff;
  display: block;
  font-size: 0.8rem;
  padding: 0.5rem;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  text-align: center;
  text-decoration: none;

  &:hover {
    background-color: #0094ff;
    color: #fff;
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
