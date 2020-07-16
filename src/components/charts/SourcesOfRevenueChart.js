import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { scaleLinear, scaleBand } from 'd3-scale';
import { line } from 'd3-shape';

import XAxis from '../ui/XAxis';

const Container = styled.div`
  border: 1px solid #999;
  margin: 0;
  padding: 1rem;
`;

const Chunk = ({ coordinates, y, data, section }) => {
  return (
    <g key={`income-tax-section-${section.title}`}>
      <title>{`${section.title}: ${Number.parseFloat(data).toFixed(
        1
      )}%`}</title>
      <rect
        x={coordinates.x}
        y={y}
        width={coordinates.width}
        height={100}
        fill={section.fill}
      />
      <text
        textAnchor='middle'
        alignmentBaseline='middle'
        style={{ fill: '#fff', fontSize: '14px;', fontWeight: 700 }}
        x={coordinates.x + coordinates.width / 2}
        y={y + 100 / 2 + 6}
        height={100}
      >{`${Number.parseFloat(data).toFixed(1)}%`}</text>
    </g>
  );
};

Chunk.propTypes = {
  coordinates: PropTypes.number,
  y: PropTypes.number,
  data: PropTypes.number,
  section: PropTypes.object,
};

const SourcesOfRevenueChart = ({ country, data, title }) => {
  const containerElement = useRef(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(500);
  const margin = { top: 30, left: 90, bottom: 40, right: 10 };
  const yScale = scaleBand()
    .domain(['OECD Average', country])
    .range([height - margin.bottom, margin.top])
    .align(0.5);
  const xScale = scaleLinear()
    .domain([0, 100])
    .range([20 + margin.left, width - margin.right - 20]);

  const sections = [
    {
      title: 'Individual Taxes',
      fill: 'rgb(13, 91, 115)',
      id: 'Individual_Taxes',
    },
    {
      title: 'Corporate Taxes',
      fill: 'rgb(71, 136, 151)',
      id: 'Corporate_Taxes',
    },
    {
      title: 'Social Insurance Taxes',
      fill: 'rgb(203,125,167)',
      id: 'Social_Insurance_Taxes',
    },
    {
      title: 'Property Taxes',
      fill: 'rgb(201, 117, 116)',
      id: 'Property_Taxes',
    },
    {
      title: 'Consumption Taxes',
      fill: 'rgb(217, 93, 107)',
      id: 'Consumption_Taxes',
    },
    {
      title: 'Other',
      fill: 'rgb(144, 0, 58)',
      id: 'Other',
    },
  ];

  let countryRectCoords = {};
  let oecdRectCoords = {};
  let countryAcc = xScale(0);
  let oecdAcc = xScale(0);
  sections.forEach(section => {
    const countryValue = xScale(data.country[section.id]);
    countryRectCoords[section.id] = {
      x: countryAcc,
      width: countryValue - xScale(0),
    };
    countryAcc += countryValue - xScale(0);

    const oecdValue = xScale(data.oecd[section.id]);
    oecdRectCoords[section.id] = {
      x: oecdAcc,
      width: oecdValue - xScale(0),
    };
    oecdAcc += oecdValue - xScale(0);
  });

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
        <XAxis
          xScale={xScale}
          min={0}
          max={100}
          numTicks={11}
          height={height}
          width={width}
          margin={margin}
          label='Cumulative Percentage'
        />
        <g id='sources-of-revenue-bar-chart'>
          {/* Employee */}
          {sections.map(section => (
            <>
              <Chunk
                data={data.country[section.id]}
                margin={margin}
                section={section}
                width={width}
                coordinates={countryRectCoords[section.id]}
                y={yScale(country)}
              ></Chunk>
              <Chunk
                data={data.oecd[section.id]}
                margin={margin}
                section={section}
                width={width}
                coordinates={oecdRectCoords[section.id]}
                y={yScale('OECD Average')}
              ></Chunk>
            </>
          ))}
        </g>
      </svg>
    </Container>
  );
};

SourcesOfRevenueChart.propTypes = {
  country: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.shape({
    country: {
      Consumption_Taxes: PropTypes.number,
      Corporate_Taxes: PropTypes.number,
      Individual_Taxes: PropTypes.number,
      Property_Taxes: PropTypes.number,
      Social_Insurance_Taxes: PropTypes.number,
      Other: PropTypes.number,
    },
    oecd: {
      Consumption_Taxes: PropTypes.number,
      Corporate_Taxes: PropTypes.number,
      Individual_Taxes: PropTypes.number,
      Property_Taxes: PropTypes.number,
      Social_Insurance_Taxes: PropTypes.number,
      Other: PropTypes.number,
    },
  }),
};

export default SourcesOfRevenueChart;
