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

const ITCI = ({ data, title }) => {
  const height = 500;
  const width = 800;
  const minYear = Math.min(...data.map(d => d.year));
  const maxYear = Math.max(...data.map(d => d.year));
  const margin = { top: 30, left: 50, bottom: 30, right: 10 };
  const xScale = scaleLinear()
    .domain([minYear, maxYear])
    .range([20 + margin.left, width - margin.right - 20]);
  const yScale = scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top]);

  return (
    <Container>
      <svg viewBox={`0 0 ${width} ${height}`} role='graphics-document'>
        <title>{title}</title>
        <text x={width / 2} y='16' textAnchor='middle' fontSize={16}>
          {title}
        </text>
        <g
          id='itci-axis-left'
          role='graphics-axis'
          aria-orientation='vertical'
          aria-datatype='count'
          aria-valuemin='0'
          aria-valuemax='100'
        >
          <text
            textAnchor='middle'
            y={13}
            x={-(height - margin.top - margin.bottom) / 2}
            fontSzie='10'
            transform='rotate(-90)'
          >
            Score
          </text>
          <g id='itci-y-axis-ticks'>
            {yScale.ticks(10).map(value => (
              <g key={`y-tick-${value}`}>
                <rect
                  x={margin.left}
                  width={width - margin.right}
                  y={yScale(value)}
                  height={1}
                  fill='#ccc'
                  shapeRendering='crispEdges'
                ></rect>
                <rect
                  x={margin.left - 5}
                  width={5}
                  y={yScale(value)}
                  height={1}
                  fill='#333'
                  shapeRendering='crispEdges'
                ></rect>
                <text
                  x={margin.left - 8}
                  y={yScale(value) + 3}
                  textAnchor='end'
                  fontSize='10'
                >
                  {value}
                </text>
              </g>
            ))}
          </g>
          <rect
            x={margin.left}
            width={1}
            y={margin.top}
            height={height - margin.bottom - margin.top}
            fill='#333'
            shapeRendering='crispEdges'
          ></rect>
        </g>
        <g
          id='itci-axis-bottom'
          role='graphics-axis'
          aria-orientation='horizontal'
          aria-datatype='datetime'
          aria-valuemin={minYear}
          aria-valuemax={maxYear}
        >
          <text
            x={margin.left + (width - margin.left - margin.right) / 2}
            y={height}
            textAnchor='middle'
          >
            Year
          </text>
          <rect
            x={margin.left}
            width={width - margin.right}
            y={height - margin.bottom}
            height={1}
            fill='#333'
            shapeRendering='crispEdges'
          ></rect>
          <g id='itci-x-axis-ticks'>
            {xScale.ticks(maxYear - minYear).map(value => (
              <g key={`x-tick-${value}`}>
                <rect
                  x={xScale(value)}
                  width={1}
                  y={height - margin.bottom}
                  height={5}
                  fill='#333'
                  shapeRendering='crispEdges'
                ></rect>
                <text
                  x={xScale(value)}
                  y={height - margin.bottom + 15}
                  textAnchor='middle'
                  fontSize='10'
                >
                  {value}
                </text>
              </g>
            ))}
          </g>
        </g>
        <g id='itci-chart-body' aria-label='line chart'>
          <Line
            role='img'
            aria-roledecription='line showing change in score'
            d={line()(data.map(d => [xScale(+d.year), yScale(+d.score)]))}
          />
          {data.map(d => (
            <g
              key={`itci-data-point-${d.year}-${d.score}`}
              role='graphics-data'
            >
              <title>{`Score of ${Math.round(d.score)} in ${d.year}`}</title>
              <circle
                fill='#0094ff'
                cx={xScale(+d.year)}
                cy={yScale(+d.score)}
                r='3'
              />
            </g>
          ))}
        </g>
      </svg>
    </Container>
  );
};

ITCI.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number,
      score: PropTypes.number,
    })
  ),
};

export default ITCI;
