import React from 'react';
import PropTypes from 'prop-types';

const YAxis = ({
  height,
  label,
  margin,
  max,
  min,
  numTicks,
  width,
  yScale,
  format = value => value,
}) => {
  return (
    <g
      role='graphics-axis'
      aria-orientation='vertical'
      aria-valuemin={min}
      aria-valuemax={max}
    >
      <text
        textAnchor='middle'
        y={13}
        x={-(height - margin.top - margin.bottom) / 2}
        fontSize='10'
        transform='rotate(-90)'
      >
        {label}
      </text>
      <g id='itci-y-axis-ticks'>
        {yScale.ticks(numTicks).map(value => (
          <g key={`y-tick-${value}`}>
            <line
              x1={margin.left}
              x2={width - margin.right}
              y1={yScale(value)}
              y2={yScale(value)}
              stroke='#ccc'
              strokeWidth='1'
              shapeRendering='crispEdges'
              vectorEffect='non-scaling-stroke'
            />
            <line
              x1={margin.left - 5}
              x2={margin.left}
              y1={yScale(value)}
              y2={yScale(value)}
              stroke='#333'
              strokeWidth='1'
              shapeRendering='crispEdges'
              vectorEffect='non-scaling-stroke'
            />
            <text
              x={margin.left - 8}
              y={yScale(value) + 3}
              textAnchor='end'
              fontSize='10'
            >
              {format(value)}
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
  );
};

YAxis.propTypes = {
  height: PropTypes.number,
  label: PropTypes.string,
  margin: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
  }),
  max: PropTypes.number,
  min: PropTypes.number,
  numTicks: PropTypes.number,
  yScale: PropTypes.func,
  width: PropTypes.number,
  format: PropTypes.func,
};

export default YAxis;
