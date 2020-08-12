import React from 'react';
import PropTypes from 'prop-types';

const XAxis = ({
  xScale,
  label,
  height,
  band,
  tickSize = 15,
  labelSize = 18,
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
        y={tickSize + labelSize + 15}
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
        {band.map(value => (
          <g key={`x-tick-${value}`}>
            <line
              x1={xScale(value) + xScale.bandwidth() / 2}
              x2={xScale(value) + xScale.bandwidth() / 2}
              y1={0}
              y2={5}
              stroke='#333'
              strokeWidth='1'
              shapeRendering='crispEdges'
              vectorEffect='non-scaling-stroke'
            />
            <text
              textAnchor='middle'
              fontSize={tickSize}
              transform={`translate(${
                xScale(value) + xScale.bandwidth() / 2 - 3
              } ${tickSize + 8}) rotate(-45)`}
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
  tickSize: PropTypes.number,
  labelSize: PropTypes.number,
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
