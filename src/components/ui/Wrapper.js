import React from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';

import usePym from '../../usePym';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Lato', sans-serif;
    font-weight: 400;
  }

  h1,
  h2 {
    font-size: 2.4rem;
    font-weight: 300;
  }

  h2 {
    font-style: italic;
  }

  p {
    line-height: 1.4;
  }

  hr {
    background-color: #ccc;
    border: 0;
    color: #ccc;
    height: 1px;
    margin: 1.5rem 0;
  }
`;

const Wrapper = ({ children }) => {
  usePym();

  return (
    <>
      <GlobalStyle />
      {children}
    </>
  );
};

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Wrapper;
