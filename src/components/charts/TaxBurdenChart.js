import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';

import YAxis from '../ui/YAxis';

const Container = styled.div`
  border: 1px solid #999;
  border-top: 0;
  margin: 0;
  padding: 1rem;
`;

const TaxBurdenChart = ({ data, title }) => {
  const containerElement = useRef(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(500);
  const maxDollars =
    +data.Total_Average_Annual_Labor_Cost_per_Employee_in__ + 10000;
  const margin = { top: 30, left: 90, bottom: 40, right: 10 };
  const yScale = scaleLinear()
    .domain([0, maxDollars])
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
        <text x={width / 2} y='16' textAnchor='middle' fontSize={16}>
          {title}
        </text>
        <YAxis
          yScale={yScale}
          min={0}
          max={maxDollars}
          numTicks={10}
          height={height}
          width={width}
          margin={margin}
          label='US Dollars'
        />
        <g id='tax-burden-bar-chart'>
          <rect
            x={(width - margin.left - margin.right) / 4 + margin.left}
            y={yScale(data.Total_Average_Annual_Labor_Cost_per_Employee_in__)}
            width={(width - margin.left - margin.right) / 2}
            height={
              height -
              yScale(data.Total_Average_Annual_Labor_Cost_per_Employee_in__) -
              margin.bottom
            }
            fill='#ff0000'
          ></rect>
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

TaxBurdenChart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.shape({
    Country: PropTypes.string,
    Employee_Payroll_Taxes_in__: PropTypes.number,
    Employer_Payroll_Taxes_in__: PropTypes.number,
    Income_Tax_in__: PropTypes.number,
    Rank: PropTypes.number,
    Tax_Wedge_in____As_a_Share_of_Labor_Cost_: PropTypes.number,
    Total_Average_Annual_Labor_Cost_per_Employee_in__: PropTypes.number,
  }),
};

export default TaxBurdenChart;
