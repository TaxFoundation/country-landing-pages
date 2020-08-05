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

const ConsumptionChart = ({ data, countryID, title }) => {
  const containerElement = useRef(null);
  const width = 800;
  const height = 500;
  const margin = { top: 30, left: 70, bottom: 40, right: 10 };
  const countries = data.map(country => country.iso3).sort();
  const yScale = scaleLinear()
    .domain([0, 1])
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
          max={100}
          numTicks={10}
          height={height}
          width={width}
          margin={margin}
          label='Tax Collections / Potential Collections with Broadest Base'
          format={format('.0%')}
        />
        <XAxisBanded
          xScale={xScale}
          band={countries}
          height={height}
          width={width}
          margin={margin}
          label='Countries'
        />
        <g id='consumption-bar-chart'>
          {data.map(country => {
            return (
              <g key={`vat-base-${country.iso3}`}>
                <title>{`${format('.0%')(
                  country.vatBreadth
                )} of All Consumption is Taxed at the Rate of ${
                  country.vatRate
                }%`}</title>
                <rect
                  fill={
                    country.iso3 === countryID
                      ? 'rgb(73, 193, 255)'
                      : 'rgb(103, 148, 253)'
                  }
                  x={xScale(country.iso3)}
                  width={xScale.bandwidth()}
                  y={yScale(country.vatBreadth)}
                  height={yScale(0) - yScale(country.vatBreadth)}
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

ConsumptionChart.propTypes = {
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

export default ConsumptionChart;
