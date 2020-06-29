import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';

import XAxis from './XAxis';
import YAxis from './YAxis';

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

const CorpTax = ({ data, worldwide, title }) => {
  const containerElement = useRef(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(500);
  const minYear = Math.min(...data.map(d => d.year));
  const maxYear = Math.max(...data.map(d => d.year));
  const minRate = Math.min(...data.map(d => d.rate));
  const maxRate = Math.max(...data.map(d => d.rate));
  const margin = { top: 30, left: 50, bottom: 30, right: 10 };
  const xScale = scaleLinear()
    .domain([minYear, maxYear])
    .range([20 + margin.left, width - margin.right - 20]);
  const yScale = scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top]);

  useEffect(() => {
    function handleResize() {
      setWidth(containerElement.current.clientWidth);
      setHeight(containerElement.current.clientWidth * (5 / 8));
    }

    if (!containerElement) {
      return false;
    }

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container ref={containerElement}>
      <svg viewBox={`0 0 ${width} ${height}`} role='graphics-document'>
        <title>{title}</title>
        <text x={width / 2} y='16' textAnchor='middle' fontSize={16}>
          {title}
        </text>
        <YAxis
          yScale={yScale}
          min={Math.min(0, minRate)}
          max={maxRate}
          numTicks={10}
          height={height}
          width={width}
          margin={margin}
          label='Score'
        />
        <XAxis
          height={height}
          label='Year'
          margin={margin}
          max={maxYear}
          min={minYear}
          numTicks={Math.min(maxYear - minYear, 10)}
          width={width}
          xScale={xScale}
        />
        <g id='corp-tax-chart-body' aria-label='line chart'>
          <Line
            role='img'
            d={line()(data.map(d => [xScale(+d.year), yScale(+d.rate)]))}
          />
          {data.map(d => (
            <g
              key={`corp-tax-data-point-${d.year}-${d.rate}`}
              role='graphics-data'
            >
              <title>{`Top Corporate Tax Rate of ${Math.round(d.rate)}% in ${
                d.year
              }`}</title>
              <circle
                fill='#0094ff'
                cx={xScale(+d.year)}
                cy={yScale(+d.rate)}
                r='4'
              />
            </g>
          ))}
        </g>
      </svg>
    </Container>
  );
};

CorpTax.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number,
      score: PropTypes.number,
    })
  ),
  worldwide: PropTypes.arrayOf(PropTypes.object),
};

export default CorpTax;
