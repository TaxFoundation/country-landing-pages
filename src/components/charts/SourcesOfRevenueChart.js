import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { scaleLinear, scaleBand } from 'd3-scale';

import XAxis from '../ui/XAxis';

const Container = styled.div`
  border: 1px solid #999;
  margin: 0;
  padding: 1rem;
`;

const Chunk = ({ coordinates, y, width, height, data, section }) => {
  const [textHeight, setTextHeight] = useState(y + height / 2 + 10);
  const [textColor, setTextColor] = useState('#fff');
  const rectRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    function adjustLabel(rect, text) {
      const rectWidth = rect.current.getBBox().width;
      const textWidth = text.current.getBBox().width;

      if (textWidth > rectWidth) {
        setTextHeight(y - Math.min(20, (width / 800) * 20));
        setTextColor(section.fill);
      } else if (textHeight !== height || textColor !== '#fff') {
        setTextHeight(y + height / 2 + 6);
        setTextColor('#fff');
      }
    }

    if (!rectRef || !textRef) {
      return false;
    }

    adjustLabel(rectRef, textRef);
  }, [rectRef, textRef, width]);

  return (
    <svg>
      <title>{`${section.title}: ${Number.parseFloat(data).toFixed(
        1
      )}%`}</title>
      <rect
        x={coordinates.x}
        y={y}
        width={coordinates.width}
        height={height}
        fill={section.fill}
        ref={rectRef}
        shapeRendering='crispEdges'
        vectorEffect='non-scaling-stroke'
      />
      <text
        textAnchor='middle'
        alignmentBaseline='middle'
        fill={textColor}
        fontSize={14 * Math.max(width / 800, 0.7)}
        style={{ fontWeight: 700 }}
        x={coordinates.x + coordinates.width / 2}
        y={textHeight}
        height={height}
        ref={textRef}
      >{`${Number.parseFloat(data).toFixed(1)}%`}</text>
      {textColor !== '#fff' && (
        <line
          x1={coordinates.x + coordinates.width / 2}
          x2={coordinates.x + coordinates.width / 2}
          y1={y - Math.min(15, (width / 800) * 15)}
          y2={y}
          stroke={section.fill}
          strokeWidth={2}
          shapeRendering='crispEdges'
          vectorEffect='non-scaling-stroke'
        />
      )}
    </svg>
  );
};

Chunk.propTypes = {
  coordinates: PropTypes.object,
  y: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.string,
  section: PropTypes.object,
  width: PropTypes.number,
};

const SourcesOfRevenueChart = ({ country, data, title }) => {
  const containerElement = useRef(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(500);
  const margin = { top: 30, left: 50, bottom: 100, right: 20 };
  const yScale = scaleBand()
    .domain(['OECD Average', country])
    .range([height - margin.bottom, margin.top])
    .align(0.5)
    .paddingOuter(0.35)
    .paddingInner(0.35);
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
        <text
          x={width / 2}
          y='20'
          textAnchor='middle'
          fontSize={20 * Math.max(width / 800, 0.7)}
        >
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
          format={value => `${value}%`}
        />
        <g>
          <text
            transform={`translate(35, ${
              yScale(country) + yScale.bandwidth() / 2
            }) rotate(-90)`}
            textAnchor='middle'
            fontSize={18 * Math.max(width / 800, 0.3)}
          >
            {country}
          </text>
          <text
            transform={`translate(35, ${
              yScale('OECD Average') + yScale.bandwidth() / 2
            }) rotate(-90)`}
            textAnchor='middle'
            fontSize={18 * Math.max(width / 800, 0.3)}
          >
            OECD Average
          </text>
        </g>
        <g id='sources-of-revenue-bar-chart'>
          {sections.map(section => (
            <React.Fragment key={`income-tax-section-${section.title}`}>
              <Chunk
                data={data.country[section.id]}
                margin={margin}
                section={section}
                width={width}
                coordinates={countryRectCoords[section.id]}
                y={yScale(country)}
                height={yScale.bandwidth()}
              ></Chunk>
              <Chunk
                data={data.oecd[section.id]}
                margin={margin}
                section={section}
                width={width}
                coordinates={oecdRectCoords[section.id]}
                y={yScale('OECD Average')}
                height={yScale.bandwidth()}
              ></Chunk>
            </React.Fragment>
          ))}
        </g>
        <g
          id='sources-of-reveneue-legend'
          transform={`translate(0, ${height - margin.bottom / 2})`}
        >
          {width > 600 &&
            sections.map((section, i) => {
              const spacer = 155;
              return (
                <React.Fragment key={`sources-legend-${section.title}`}>
                  <rect
                    x={margin.left + i * spacer}
                    width={25}
                    height={25}
                    fill={section.fill}
                  ></rect>
                  {section.title.split(' ').map((word, j) => (
                    <text
                      key={`${section.title}-word-${word}`}
                      x={margin.left + 35 + i * spacer}
                      fill={section.fill}
                      y={10 + j * 14}
                      fontSize={14}
                    >
                      {word}
                    </text>
                  ))}
                </React.Fragment>
              );
            })}
        </g>
      </svg>
    </Container>
  );
};

SourcesOfRevenueChart.propTypes = {
  country: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.shape({
    country: PropTypes.shape({
      Consumption_Taxes: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      Corporate_Taxes: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      Individual_Taxes: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      Property_Taxes: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      Social_Insurance_Taxes: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      Other: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    oecd: PropTypes.shape({
      Consumption_Taxes: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      Corporate_Taxes: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      Individual_Taxes: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      Property_Taxes: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      Social_Insurance_Taxes: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      Other: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  }),
};

export default SourcesOfRevenueChart;
