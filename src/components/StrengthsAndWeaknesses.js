import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { range } from 'lodash';

const StrengthsAndWeaknessesContainer = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const StrengthsAndWeaknessesHeading = styled.h3`
  font-size: 1.4em;
  font-weight: 700;
`;

const StrengthsAndWeaknessesList = styled.ul`
  list-style: none;
  padding-left: 1.4rem;
  li::before {
    content: '•';
    color: ${props => (props.positive ? 'green' : 'red')};
    display: inline-block;
    font-size: 1.4rem;
    margin-left: -1.4rem;
    width: 1.4rem;
  }
`;

const StrengthsAndWeaknesses = ({ profiles }) => (
  <StrengthsAndWeaknessesContainer>
    <section>
      <StrengthsAndWeaknessesHeading>
        Strengths
      </StrengthsAndWeaknessesHeading>
      <StrengthsAndWeaknessesList positive>
        {range(3).map(n => (
          <li key={`strength-${n + 1}`}>{profiles[`strength_${n + 1}`]}</li>
        ))}
      </StrengthsAndWeaknessesList>
    </section>
    <section>
      <StrengthsAndWeaknessesHeading>Weaknesses</StrengthsAndWeaknessesHeading>
      <StrengthsAndWeaknessesList>
        {range(3).map(n => (
          <li key={`weakness-${n + 1}`}>{profiles[`weakness_${n + 1}`]}</li>
        ))}
      </StrengthsAndWeaknessesList>
    </section>
  </StrengthsAndWeaknessesContainer>
);

StrengthsAndWeaknesses.propTypes = {
  profiles: PropTypes.object,
};

export default StrengthsAndWeaknesses;