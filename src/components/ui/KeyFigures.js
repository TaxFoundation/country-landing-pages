import styled from 'styled-components';

export const KeyFigures = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-gap: 1rem;

  @media (min-width: 600px) {
    grid-auto-flow: column;
  }

  & > div > div {
    border: 1px solid #333;
    font-size: 2.4rem;
    font-weight: 300;
    padding: 2rem;
    text-align: center;
  }
`;

export const KeyFigure = styled.div`
  align-content: space-between;
  align-items: end;
  display: grid;
`;
