import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { scaleLinear, scaleBand } from 'd3-scale';

import XAxisBanded from '../ui/XAxisBanded';
import YAxis from '../ui/YAxis';

const Container = styled.div`
  border: 1px solid #999;
  margin: 0;
  padding: 1rem;
`;

const VATRevenuesChart = ({ data, countryID, title }) => {
  const width = 800;
  const height = 500;
  const margin = { top: 30, left: 70, bottom: 60, right: 10 };
  const countries = data.map(country => country.iso3).sort();
  const max = Math.max(...data.map(country => country.vatRevenue));
  const yScale = scaleLinear()
    .domain([0, Math.min(100, max + 5)])
    .range([height - margin.bottom, margin.top]);
  const xScale = scaleBand()
    .domain(countries)
    .range([margin.left, width - margin.right])
    .padding(0.2);

  return (
    <Container>
      <svg viewBox={`0 0 ${width} ${height}`} role='graphics-document'>
        <title>{title}</title>
        <text x={width / 2} y='18' textAnchor='middle' fontSize={20}>
          {title}
        </text>
        <YAxis
          yScale={yScale}
          min={0}
          max={Math.min(100, max + 5)}
          numTicks={10}
          height={height}
          width={width}
          margin={margin}
          label={`VAT${countryID === 'USA' ? ' or Sales Tax' : ''} Revenues as % of GDP`}
          format={value => `${value}%`}
        />
        <XAxisBanded
          xScale={xScale}
          band={countries}
          height={height}
          width={width}
          margin={margin}
          label='Countries'
        />
        <g id='vat-rate-bar-chart'>
          {data.map(country => {
            return (
              <g key={`vat-base-${country.iso3}`}>
                <title>{`${
                  country.iso3 === 'USA' ? 'Average Sales Tax' : 'VAT'
                } Revenues of ${country.vatRevenue}%`}</title>
                <rect
                  fill={
                    country.iso3 === countryID
                      ? 'rgb(14, 119, 94)'
                      : 'rgb(57, 194, 146)'
                  }
                  x={xScale(country.iso3)}
                  width={xScale.bandwidth()}
                  y={yScale(country.vatRevenue)}
                  height={yScale(0) - yScale(country.vatRevenue)}
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

VATRevenuesChart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      iso3: PropTypes.string,
      vatRevenue: PropTypes.number,
    })
  ),
  countryID: PropTypes.string,
};

export default VATRevenuesChart;
