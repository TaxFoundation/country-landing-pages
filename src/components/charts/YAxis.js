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
}) => {
  return (
    <g
      role='graphics-axis'
      aria-orientation='vertical'
      aria-datatype='count'
      aria-valuemin={min}
      aria-valuemax={max}
    >
      <text
        textAnchor='middle'
        y={13}
        x={-(height - margin.top - margin.bottom) / 2}
        fontSzie='10'
        transform='rotate(-90)'
      >
        {label}
      </text>
      <g id='itci-y-axis-ticks'>
        {yScale.ticks(numTicks).map(value => (
          <g key={`y-tick-${value}`}>
            <rect
              x={margin.left}
              width={width - margin.right}
              y={yScale(value)}
              height={1}
              fill='#ccc'
              shapeRendering='crispEdges'
            ></rect>
            <rect
              x={margin.left - 5}
              width={5}
              y={yScale(value)}
              height={1}
              fill='#333'
              shapeRendering='crispEdges'
            ></rect>
            <text
              x={margin.left - 8}
              y={yScale(value) + 3}
              textAnchor='end'
              fontSize='10'
            >
              {value}
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
};

export default YAxis;
