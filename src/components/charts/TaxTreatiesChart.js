import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { scaleLinear, scaleBand } from 'd3-scale';
import { format } from 'd3-format';

import XAxisBanded from '../ui/XAxisBanded';
import YAxis from '../ui/YAxis';

const Container = styled.div`
  border: 1px solid #999;
  border-top: 0;
  margin: 0;
  padding: 1rem;
`;

const TaxTreatiesChart = ({ data, countryID, title }) => {
  const containerElement = useRef(null);
  const width = 800;
  const height = 500;
  const margin = { top: 30, left: 70, bottom: 40, right: 10 };
  const countries = data.map(country => country.iso3).sort();
  const maxRate = Math.max(...data.map(country => country.taxTreaties));
  const yScale = scaleLinear()
    .domain([0, maxRate + 5])
    .range([height - margin.bottom, margin.top]);
  const xScale = scaleBand()
    .domain(countries)
    .range([margin.left, width - margin.right])
    .padding(0.2);

  return (
    <Container ref={containerElement}>
      <svg viewBox={`0 0 ${width} ${height}`} role='graphics-document'>
        <title>{title}</title>
        <text
          x={width / 2}
          y='18'
          textAnchor='middle'
          fontSize={16 * Math.max(width / 800, 0.7)}
        >
          {title}
        </text>
        <YAxis
          yScale={yScale}
          min={0}
          max={maxRate + 5}
          numTicks={10}
          height={height}
          width={width}
          margin={margin}
          label={`Tax Treaties`}
          format={value => value}
        />
        <XAxisBanded
          xScale={xScale}
          band={countries}
          height={height}
          width={width}
          margin={margin}
          label='Countries'
        />
        <g id='tax-treaties-bar-chart'>
          {data.map(country => {
            return (
              <g key={`tax-treaties-${country.iso3}`}>
                <title>{`${country.taxTreaties} Tax Treaties`}</title>
                <rect
                  fill={
                    country.iso3 === countryID
                      ? 'rgb(165, 109, 235)'
                      : 'rgb(103, 148, 252)'
                  }
                  x={xScale(country.iso3)}
                  width={xScale.bandwidth()}
                  y={yScale(country.taxTreaties)}
                  height={yScale(0) - yScale(country.taxTreaties)}
                ></rect>
              </g>
            );
          })}
        </g>
        <line
          x1={margin.left}
          x2={width - margin.right}
          y1={height - margin.bottom}
          y2={height - margin.bottom}
          stroke='#333'
          strokeWidth='1'
          shapeRendering='crispEdges'
          vectorEffect='non-scaling-stroke'
        />
      </svg>
    </Container>
  );
};

TaxTreatiesChart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      iso3: PropTypes.string,
      vatBreadth: PropTypes.number,
      vatRate: PropTypes.number,
      vatThreshold: PropTypes.number,
    })
  ),
  countryID: PropTypes.string,
};

export default TaxTreatiesChart;