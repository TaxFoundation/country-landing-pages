import styled from 'styled-components';

const Line = styled.path`
  fill: none;
  stroke: ${props => (props.color ? props.color : '#0094ff')};
  stroke-width: 3px;
`;

export default Line;
