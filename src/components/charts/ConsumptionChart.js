import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';
import { format } from 'd3-format';

import YAxis from '../ui/YAxis';

const Container = styled.div`
  border: 1px solid #999;
  border-top: 0;
  margin: 0;
  padding: 1rem;
`;

const ConsumptionChart = ({ data, title }) => {
  const containerElement = useRef(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(500);
  const margin = { top: 30, left: 90, bottom: 40, right: 10 };
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
        <text
          x={width / 2}
          y='16'
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
          label='Percent'
          format={format('%')}
        />
        <g id='consumption-bar-chart'></g>
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
  data: PropTypes.arrayOf(PropTypes.object),
};

export default ConsumptionChart;
