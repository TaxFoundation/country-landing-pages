import styled from 'styled-components';

const Line = styled.path`
  fill: none;
  stroke: ${props => (props.color ? props.color : '#235485')};
  stroke-width: 3px;
`;

export default Line;
