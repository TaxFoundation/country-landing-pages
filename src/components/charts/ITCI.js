import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';

const Container = styled.div`
  border: 1px solid #999;
  border-top: 0;
  margin: 0;
  padding: 1rem;
`;

const Line = styled.path`
  fill: none;
  stroke: #0094ff;
  stroke-width: 3px;
`;

const ITCI = ({ data }) => {
  const height = 600;
  const width = 800;
  const minYear = Math.min(...data.map(d => d.year));
  const maxYear = Math.max(...data.map(d => d.year));
  const margin = { top: 0, left: 50, bottom: 30, right: 0 };
  const xScale = scaleLinear()
    .domain([minYear, maxYear])
    .range([margin.left, width - margin.right]);
  const yScale = scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top]);

  return (
    <Container>
      <svg viewBox={`0 0 ${width} ${height}`}>
        <g id='itci-axis-left'></g>
        <g id='itci-axis-bottom'></g>
        <g id='itci-chart-body'>
          <Line
            d={line()(data.map(d => [xScale(+d.year), yScale(+d.score)]))}
          />
        </g>
      </svg>
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
