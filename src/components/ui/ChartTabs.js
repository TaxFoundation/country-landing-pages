import styled from 'styled-components';

const ChartTabs = styled.ul`
  display: grid;
  grid-gap: 5px;
  grid-auto-flow: row;
  grid-template-columns: repeat(2, 1fr);
  list-style: none;
  margin: 0;
  padding: 0;

  @media screen and (min-width: 500px) {
    display: flex;
    grid-gap: 0;
    flex-direction: row;
  }
`;

const ChartTab = styled.li`
  @media screen and (max-width: 499px) {
    background-color: ${props => (props.active ? '#e0592a' : '#fff')};
    border: 1px solid ${props => (props.active ? '#e0592a' : '#ccc')};
    border-radius: 4px;
    color: ${props => (props.active ? '#fff' : '#333')};
  }

  @media screen and (min-width: 500px) {
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
