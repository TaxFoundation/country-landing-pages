import React from 'react';
import PropTypes from 'prop-types';

const XAxis = ({
  xScale,
  label,
  numTicks,
  min,
  max,
  height,
  width,
  margin,
}) => {
  return (
    <g
      role='graphics-axis'
      aria-orientation='horizontal'
      aria-datatype='datetime'
      aria-valuemin={min}
      aria-valuemax={max}
    >
      <text
        x={margin.left + (width - margin.left - margin.right) / 2}
        y={height}
        textAnchor='middle'
      >
        {label}
      </text>
      <rect
        x={margin.left}
        width={width - margin.right}
        y={height - margin.bottom}
        height={1}
        fill='#333'
        shapeRendering='crispEdges'
      ></rect>
      <g id='itci-x-axis-ticks'>
        {xScale.ticks(numTicks).map(value => (
          <g key={`x-tick-${value}`}>
            <rect
              x={xScale(value)}
              width={1}
              y={height - margin.bottom}
              height={5}
              fill='#333'
              shapeRendering='crispEdges'
            ></rect>
            <text
              x={xScale(value)}
              y={height - margin.bottom + 15}
              textAnchor='middle'
              fontSize='10'
            >
              {value}
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
};

export default XAxis;
