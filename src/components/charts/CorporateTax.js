import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';

import Line from '../ui/Line';
import XAxis from '../ui/XAxis';
import YAxis from '../ui/YAxis';

const Container = styled.div`
  border: 1px solid #999;
  border-top: 0;
  margin: 0;
  padding: 1rem;
`;

const CorpTax = ({ data, worldwide, title }) => {
  const containerElement = useRef(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(500);
  const minYear = Math.min(
    ...data.map(d => +d.year),
    ...worldwide.map(d => +d.year)
  );
  const maxYear = Math.max(
    ...data.map(d => +d.year),
    ...worldwide.map(d => +d.year)
  );
  const minRate = Math.min(
    ...data.map(d => +d.rate),
    ...worldwide.map(d => +d.average),
    ...worldwide.map(d => +d.weighted.average)
  );
  const maxRate = Math.min(
    100,
    Math.max(
      ...data.map(d => +d.rate),
      ...worldwide.map(d => +d.average),
      ...worldwide.map(d => +d.weighted.average)
    ) + 5
  );
  const margin = { top: 30, left: 50, bottom: 40, right: 10 };
  const xScale = scaleLinear()
    .domain([minYear, maxYear])
    .range([20 + margin.left, width - margin.right - 20]);
  const yScale = scaleLinear()
    .domain([0, maxRate])
    .range([height - margin.bottom, margin.top]);

  const countryColor = 'rgb(92, 158, 170)';
  const worldwideColor = 'rgb(47, 129, 212)';
  const worldwideWeightedColor = 'rgb(75, 104, 171)';

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
        <g id='corp-tax-chart-worldwide' aria-label='line chart'>
          <Line
            role='img'
            d={line()(
              worldwide.map(d => [xScale(+d.year), yScale(+d.average)])
            )}
            color={worldwideColor}
          />
          <Line
            role='img'
            d={line()(
              worldwide.map(d => [xScale(+d.year), yScale(+d.weighted.average)])
            )}
            color={worldwideWeightedColor}
          />
          {worldwide.map(d => (
            <React.Fragment
              key={`corp-tax-data-worldwide-average-${d.year}-${d.average}`}
            >
              <g role='graphics-data'>
                <title>{`Average Worldwide Corporate Tax Rate of ${Math.round(
                  d.average
                )}% in ${d.year}`}</title>
                <circle
                  fill={worldwideColor}
                  cx={xScale(+d.year)}
                  cy={yScale(+d.average)}
                  r='4'
                />
              </g>
              <g role='graphics-data'>
                <title>{`Weighted Average Worldwide Corporate Tax Rate of ${Math.round(
                  d.weighted.average
                )}% in ${d.year}`}</title>
                <circle
                  fill={worldwideWeightedColor}
                  cx={xScale(+d.year)}
                  cy={yScale(+d.weighted.average)}
                  r='4'
                />
              </g>
            </React.Fragment>
          ))}
        </g>
        <g id='corp-tax-chart-body' aria-label='line chart'>
          <Line
            role='img'
            d={line()(data.map(d => [xScale(+d.year), yScale(+d.rate)]))}
            color={countryColor}
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
                fill={countryColor}
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
