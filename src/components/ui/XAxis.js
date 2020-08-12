import React from 'react';
import PropTypes from 'prop-types';

const XAxis = ({
  xScale,
  label,
  numTicks,
  tickSize = 16,
  labelSize = 18,
  min,
  max,
  height,
  width,
  margin,
  format = value => value,
}) => {
  return (
    <g
      role='graphics-axis'
      aria-orientation='horizontal'
      aria-valuemin={min}
      aria-valuemax={max}
      transform={`translate(0, ${height - margin.bottom})`}
    >
      <text
        x={margin.left + (width - margin.left - margin.right) / 2}
        y={tickSize + labelSize + 5}
        fontSize={labelSize}
        textAnchor='middle'
      >
        {label}
      </text>
      <line
        x1={margin.left}
        x2={width - margin.right}
        y1={0}
        y2={0}
        stroke='#333'
        strokeWidth='1'
        shapeRendering='crispEdges'
        vectorEffect='non-scaling-stroke'
      />
      <g id='itci-x-axis-ticks'>
        {xScale.ticks(numTicks).map(value => (
          <g key={`x-tick-${value}`}>
            <line
              x1={xScale(value)}
              x2={xScale(value)}
              y1={0}
              y2={5}
              stroke='#333'
              strokeWidth='1'
              shapeRendering='crispEdges'
              vectorEffect='non-scaling-stroke'
            />
            <text
              x={xScale(value)}
              y={tickSize + 3}
              textAnchor='middle'
              fontSize={tickSize}
            >
              {format(value)}
            </text>
          </g>
        ))}
      </g>
    </g>
  );
};

XAxis.propTypes = {
  xScale: PropTypes.func,
  label: PropTypes.string,
  numTicks: PropTypes.number,
  tickSize: PropTypes.number,
  labelSize: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  margin: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
  }),
  format: PropTypes.func,
};

export default XAxis;
