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

const CostRecovery = ({ data, title }) => {
  const width = 800;
  const height = 500;
  const minYear = Math.min(...data.map(d => +d.year));
  const maxYear = Math.max(...data.map(d => +d.year));
  const minRate = 0;
  const maxRate = 1.05;
  const margin = { top: 30, left: 70, bottom: 90, right: 10 };
  const xScale = scaleLinear()
    .domain([minYear, maxYear])
    .range([20 + margin.left, width - margin.right - 20]);
  const yScale = scaleLinear()
    .domain([0, maxRate])
    .range([height - margin.bottom, margin.top]);

  const colors = {
    buildings: 'rgb(75, 104, 171)',
    machines: 'rgb(47, 129, 212)',
    intangibles: 'rgb(92, 158, 170)',
  };
  console.log(data);
  return (
    <Container>
      <svg viewBox={`0 0 ${width} ${height}`} role='graphics-document'>
        <title>{title}</title>
        <text x={width / 2} y='16' textAnchor='middle' fontSize={20}>
          {`${title}'s Capital Cost Recovery Allowances`}
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
          format={value => `${value * 100}%`}
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
        <g id='cost-recovery-chart-body' aria-label='line chart'>
          {['buildings', 'machines', 'intangibles'].map(item => {
            return (
              <>
                <Line
                  role='img'
                  d={line()(data.map(d => [xScale(+d.year), yScale(+d[item])]))}
                  color={colors[item]}
                />
                {data.map(d => (
                  <g
                    key={`cost-recovery-data-point-${d.year}-${d[item]}`}
                    role='graphics-data'
                  >
                    <title>{`${
                      item.charAt(0).toUpperCase() + item.slice(1, item.length)
                    } Cost Recovery Allowance of ${
                      Math.round(d[item] * 1000) / 10
                    }% in ${d.year}`}</title>
                    <circle
                      fill={colors[item]}
                      cx={xScale(+d.year)}
                      cy={yScale(+d[item])}
                      r='4'
                    />
                  </g>
                ))}
              </>
            );
          })}
        </g>
        <g transform={`translate(0, ${height - margin.bottom / 2})`}>
          <svg id='corporate-legend' viewBox={`0 0 800 500`}>
            {[
              {
                word: 'Buildings',
                fill: colors.buildings,
              },
              { word: 'Machines', fill: colors.machines },
              {
                word: 'Intangibles',
                fill: colors.intangibles,
              },
            ].map((section, i) => {
              const spacer = 800 / 3;
              return (
                <React.Fragment key={`corporate-legend-${section.word}`}>
                  <rect
                    x={margin.left + i * spacer}
                    width={25}
                    height={25}
                    fill={section.fill}
                  ></rect>
                  <text
                    key={`${section.title}-word-${section.word}`}
                    x={margin.left + 35 + i * spacer}
                    fill={section.fill}
                    y={19}
                    fontSize={16}
                  >
                    {section.word}
                  </text>
                </React.Fragment>
              );
            })}
          </svg>
        </g>
      </svg>
    </Container>
  );
};

CostRecovery.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number,
      buildings: PropTypes.number,
      machines: PropTypes.number,
      intangibles: PropTypes.number,
    })
  ),
  worldwide: PropTypes.arrayOf(PropTypes.object),
};

export default CostRecovery;
