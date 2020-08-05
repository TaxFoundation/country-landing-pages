import styled from 'styled-components';

const Line = styled.path`
  fill: none;
  stroke: ${props => (props.color ? props.color : '#e0592a')};
  stroke-width: 3px;
`;

export default Line;
