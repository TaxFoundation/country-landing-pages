import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';

import Line from '../ui/Line';
import XAxis from '../ui/XAxis';
import YAxis from '../ui/YAxis';

const Container = styled.div`
  border: 1px solid #999;
  margin: 0;
  padding: 1rem;
`;

const CorpTax = ({ data, worldwide, title }) => {
  const width = 800;
  const height = 500;
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
  const margin = { top: 30, left: 70, bottom: 90, right: 10 };
  const xScale = scaleLinear()
    .domain([minYear, maxYear])
    .range([20 + margin.left, width - margin.right - 20]);
  const yScale = scaleLinear()
    .domain([0, maxRate])
    .range([height - margin.bottom, margin.top]);

  const countryColor = '#162127';
  const worldwideColor = '#235485';
  const worldwideWeightedColor = '#55D390';

  return (
    <Container>
      <svg viewBox={`0 0 ${width} ${height}`} role='graphics-document'>
        <title>{title}</title>
        <text x={width / 2} y='16' textAnchor='middle' fontSize={20}>
          {`${title}'s Top Corporate Tax Rate`}
        </text>
        <YAxis
          yScale={yScale}
          min={Math.min(0, minRate)}
          max={maxRate}
          numTicks={10}
          height={height}
          width={width}
          margin={margin}
          label='Rate'
          format={value => `${value}%`}
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
        <g transform={`translate(0, ${height - margin.bottom / 2})`}>
          <svg id='corporate-legend' viewBox={`0 0 800 500`}>
            {[
              {
                words: ['Worldwide Weighted', 'Average'],
                fill: worldwideWeightedColor,
              },
              { words: ['Worldwide Average'], fill: worldwideColor },
              {
                words: [`${title}`, `Top Marginal`, `Corporate Tax Rate`],
                fill: countryColor,
              },
            ].map((section, i) => {
              const spacer = 800 / 3;
              return (
                <React.Fragment
                  key={`corporate-legend-${section.words.join('-')}`}
                >
                  <rect
                    x={margin.left + i * spacer}
                    width={25}
                    height={25}
                    fill={section.fill}
                  ></rect>
                  {section.words.map((word, j) => (
                    <text
                      key={`${section.title}-word-${word}`}
                      x={margin.left + 35 + i * spacer}
                      fill={section.fill}
                      y={13 + j * 16}
                      fontSize={16}
                    >
                      {word}
                    </text>
                  ))}
                </React.Fragment>
              );
            })}
          </svg>
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
