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

const vatColor = '#16385A';
const salesColor = '#235485';
const exciseColor = '#55D390';

const ConsumptionChart = ({ data, countryID, title }) => {
  const width = 800;
  const height = 500;
  const margin = { top: 30, left: 70, bottom: 90, right: 10 };
  const countries = data.map(country => country.iso3).sort();
  const max = Math.max(
    ...data.map(country => country.vat + country.sales + country.excise)
  );
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
          label={`Percent of Total Tax Revenue`}
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
              <g key={`consumption-mix-${country.iso3}`}>
                {country.iso3 === countryID && (
                  <g>
                    <rect
                      fill='rgb(217, 93, 107)'
                      x={xScale(country.iso3) - 3}
                      width={xScale.bandwidth() + 6}
                      y={
                        yScale(country.vat + country.sales + country.excise) - 3
                      }
                      height={
                        yScale(0) -
                        yScale(country.vat + country.sales + country.excise) +
                        3
                      }
                    ></rect>
                  </g>
                )}
                {country.vat > 0 && (
                  <g>
                    <title>{`VAT comprises ${country.vat}% of tax ${country.iso3} revenue`}</title>
                    <rect
                      fill={vatColor}
                      x={xScale(country.iso3)}
                      width={xScale.bandwidth()}
                      y={yScale(country.vat)}
                      height={yScale(0) - yScale(country.vat)}
                    ></rect>
                  </g>
                )}
                {country.sales > 0 && (
                  <g>
                    <title>{`Sales tax comprises ${country.sales}% of tax ${country.iso3} revenue`}</title>
                    <rect
                      fill={salesColor}
                      x={xScale(country.iso3)}
                      width={xScale.bandwidth()}
                      y={yScale(country.vat + country.sales)}
                      height={
                        yScale(country.vat) -
                        yScale(country.vat + country.sales)
                      }
                    ></rect>
                  </g>
                )}
                {country.excise > 0 && (
                  <g>
                    <title>{`Excise tax comprises ${country.excise}% of tax ${country.iso3} revenue`}</title>
                    <rect
                      fill={exciseColor}
                      x={xScale(country.iso3)}
                      width={xScale.bandwidth()}
                      y={yScale(country.vat + country.sales + country.excise)}
                      height={
                        yScale(country.vat + country.sales) -
                        yScale(country.vat + country.sales + country.excise)
                      }
                    ></rect>
                  </g>
                )}
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
        <g transform={`translate(0, ${height - margin.bottom / 3})`}>
          <svg id='consumption-mix-legend' viewBox={`0 0 800 500`}>
            {[
              {
                word: 'VAT',
                fill: vatColor,
              },
              { word: 'Sales Taxes', fill: salesColor },
              {
                word: 'Excise Taxes',
                fill: exciseColor,
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

ConsumptionChart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      iso3: PropTypes.string,
      vat: PropTypes.number,
      sales: PropTypes.number,
      excise: PropTypes.number,
    })
  ),
  countryID: PropTypes.string,
};

export default ConsumptionChart;
