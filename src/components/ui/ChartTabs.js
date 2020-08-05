import styled from 'styled-components';

const ChartTabs = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ChartTab = styled.li`
  border-top: ${props =>
    props.active ? '2px solid #e0592a' : '2px solid transparent'};
  border-left: ${props =>
    props.active ? '1px solid #999' : '1px solid transparent'};
  border-right: ${props =>
    props.active ? '1px solid #999' : '1px solid transparent'};
  border-bottom: ${props =>
    props.active ? '1px solid transparent' : '1px solid #999'};
  flex: 1;
  margin: 0 -1px -1px 0;

  &:last-child {
    margin-right: 0;
  }

  button {
    background-color: transparent;
    border: none;
    color: ${props => (props.active ? '#333' : '#999')};
    cursor: pointer;
    padding: 0.5rem;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
`;

export { ChartTabs, ChartTab };
