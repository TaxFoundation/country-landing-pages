import React from 'react';
import PropTypes from 'prop-types';

const XAxis = ({
  xScale,
  label,
  height,
  band,
  width,
  margin,
  format = value => value,
}) => {
  return (
    <g
      role='graphics-axis'
      aria-orientation='horizontal'
      transform={`translate(0, ${height - margin.bottom})`}
    >
      <text
        x={margin.left + (width - margin.left - margin.right) / 2}
        y={+35}
        fontSize='16'
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
        {band.map(value => (
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
              textAnchor='middle'
              fontSize='10'
              transform={`translate(${xScale(value) + 2} 16) rotate(-45)`}
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
  band: PropTypes.arrayOf(PropTypes.string),
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
