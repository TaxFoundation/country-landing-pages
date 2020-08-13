import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { scaleLinear } from 'd3-scale';
import { format } from 'd3-format';

import YAxis from '../ui/YAxis';

const Container = styled.div`
  border: 1px solid #999;
  margin: 0;
  padding: 1rem;
`;

const TaxBurdenChart = ({ data, title }) => {
  const width = 800;
  const height = 700;
  const maxDollars =
    +data.Total_Average_Annual_Labor_Cost_per_Employee_in__ + 10000;
  const margin = { top: 30, left: 90, bottom: 180, right: 10 };
  const yScale = scaleLinear()
    .domain([0, maxDollars])
    .range([height - margin.bottom, margin.top]);

  const rectCoords = [
    yScale(data.Total_Average_Annual_Labor_Cost_per_Employee_in__),
    yScale(
      data.Total_Average_Annual_Labor_Cost_per_Employee_in__ *
        (1 - data.Employer_Payroll_Taxes_in__ / 100)
    ),
    yScale(
      data.Total_Average_Annual_Labor_Cost_per_Employee_in__ *
        (1 -
          data.Employer_Payroll_Taxes_in__ / 100 -
          data.Employee_Payroll_Taxes_in__ / 100)
    ),
    yScale(
      data.Total_Average_Annual_Labor_Cost_per_Employee_in__ *
        (1 -
          data.Employer_Payroll_Taxes_in__ / 100 -
          data.Employee_Payroll_Taxes_in__ / 100 -
          data.Income_Tax_in__ / 100)
    ),
  ];

  const heights = [
    rectCoords[1] - rectCoords[0],
    rectCoords[2] - rectCoords[1],
    rectCoords[3] - rectCoords[2],
    height - margin.bottom - rectCoords[3],
  ];

  const sections = [
    {
      title: 'Employer Share of Payroll Taxes',
      y: rectCoords[0],
      height: heights[0],
      fill: 'rgb(73, 193, 279)',
      percent: data.Employer_Payroll_Taxes_in__,
      value:
        data.Total_Average_Annual_Labor_Cost_per_Employee_in__ *
        (data.Employer_Payroll_Taxes_in__ / 100),
    },
    {
      title: 'Employee Share of Payroll Taxes',
      y: rectCoords[1],
      height: heights[1],
      fill: 'rgb(178, 217, 214)',
      percent: data.Employee_Payroll_Taxes_in__,
      value:
        data.Total_Average_Annual_Labor_Cost_per_Employee_in__ *
        (data.Employee_Payroll_Taxes_in__ / 100),
    },
    {
      title: 'Income Tax',
      y: rectCoords[2],
      height: heights[2],
      fill: 'rgb(103, 148, 253)',
      percent: data.Income_Tax_in__,
      value:
        data.Total_Average_Annual_Labor_Cost_per_Employee_in__ *
        (data.Income_Tax_in__ / 100),
    },
    {
      title: 'After-Tax Income',
      y: rectCoords[3],
      height: heights[3],
      fill: 'rgb(165, 109, 235)',
      percent:
        100 -
        data.Employer_Payroll_Taxes_in__ -
        data.Employee_Payroll_Taxes_in__ -
        data.Income_Tax_in__,
      value:
        data.Total_Average_Annual_Labor_Cost_per_Employee_in__ *
        (1 -
          data.Employer_Payroll_Taxes_in__ / 100 -
          data.Employee_Payroll_Taxes_in__ / 100 -
          data.Income_Tax_in__ / 100),
    },
  ];

  return (
    <Container>
      <svg viewBox={`0 0 ${width} ${height}`} role='graphics-document'>
        <title>{title}</title>
        <text x={width / 2} y='18' textAnchor='middle' fontSize={24}>
          {title}
        </text>
        <YAxis
          yScale={yScale}
          min={0}
          max={maxDollars}
          numTicks={10}
          tickSize={14}
          labelSize={18}
          height={height}
          width={width}
          margin={margin}
          label='US Dollars'
          format={format('$,')}
        />
        <g id='tax-burden-bar-chart'>
          {/* Employee */}
          {sections.map(section => (
            <g key={`income-tax-section-${section.title}`}>
              <title>{`${section.title}: ${Number.parseFloat(
                section.percent
              ).toFixed(1)}%`}</title>
              <rect
                x={(width - margin.left - margin.right) / 4 + margin.left}
                y={section.y}
                width={(width - margin.left - margin.right) / 2}
                height={section.height}
                fill={section.fill}
              />
            </g>
          ))}
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
        <g transform={`translate(0, ${height - margin.bottom + 20})`}>
          {sections.map((section, i) => {
            const spacer = 40;

            return (
              <g key={`individual-legend-${section.title}`}>
                <rect
                  fill={section.fill}
                  x={(width - margin.left - margin.right) / 4 + margin.left}
                  width={30}
                  y={i * spacer}
                  height={30}
                ></rect>
                <text
                  fill='#333'
                  x={
                    (width - margin.left - margin.right) / 4 +
                    margin.left +
                    spacer +
                    5
                  }
                  y={i * spacer + 24}
                  fontSize={18}
                >{`${Number.parseFloat(section.percent).toFixed(1)}% ${
                  section.title
                }`}</text>
              </g>
            );
          })}
        </g>
      </svg>
    </Container>
  );
};

TaxBurdenChart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.shape({
    Country: PropTypes.string,
    Employee_Payroll_Taxes_in__: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    Employer_Payroll_Taxes_in__: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    Income_Tax_in__: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    Rank: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    Tax_Wedge_in____As_a_Share_of_Labor_Cost_: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    Total_Average_Annual_Labor_Cost_per_Employee_in__: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
};

export default TaxBurdenChart;
