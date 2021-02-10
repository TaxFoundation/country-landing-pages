import styled from 'styled-components';

const Table = styled.table`
  background-color: #fff;
  border: 1px solid #333;
  border-collapse: collapse;
  font-size: 0.8rem;
  margin: 2rem auto;
  width: 100%;

  caption {
    font-size: 1.2rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
  }

  thead tr {
    border-bottom: 1px solid #333;
  }

  th {
    font-weight: 700;
    text-align: center;
    padding: 0.8rem;
  }

  tbody tr:nth-of-type(even) {
    background-color: #eee;
  }

  td {
    font-family: 'Roboto Mono', monospace;
    font-variant-numeric: tabular-nums;
    padding: 0.8rem;
  }
`;

export default Table;
